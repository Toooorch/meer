// Dočasný test harness – simuluje prohlížeč a Shopify SDK, spustí buybutton.js
// a ověří, že se chová správně. Po testu smazat.
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const code = fs.readFileSync('buybutton.js', 'utf8');

const makeElement = (id) => ({
  id,
  textContent: '',
  href: '',
  style: {},
  attrs: {},
  setAttribute(k, v) { this.attrs[k] = v; },
  getAttribute(k) { return this.attrs[k] ?? null; },
  hasAttribute(k) { return k in this.attrs; },
  addEventListener() {},
  closest() { return null; }
});

const makeStorage = (initial = {}) => {
  const data = { ...initial };
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    removeItem: (k) => { delete data[k]; },
    key: (i) => Object.keys(data)[i] ?? null,
    get length() { return Object.keys(data).length; },
    _data: data
  };
};

async function runScenario({ name, hostname, elementIds, localStorageInit = {}, existingCheckoutValid = true, sdkPreloaded = true, expect }) {
  const elements = {};
  elementIds.forEach((id) => { elements[id] = makeElement(id); });

  const calls = { createComponent: [], checkoutCreate: 0, checkoutFetch: 0, headAppended: [], errors: [] };
  const localStorage = makeStorage(localStorageInit);

  const ShopifyBuy = {
    buildClient: (cfg) => ({
      config: { domain: cfg.domain, storefrontAccessToken: cfg.storefrontAccessToken },
      checkout: {
        create: async () => { calls.checkoutCreate++; return { id: 'gid://new-checkout', completedAt: null }; },
        fetch: async (id) => {
          calls.checkoutFetch++;
          if (!existingCheckoutValid) throw new Error('not found');
          return { id, completedAt: null };
        }
      }
    }),
    UI: {
      onReady: async () => ({
        createComponent: (type, opts) => calls.createComponent.push({ type, id: opts.id[0], node: opts.node.id })
      })
    }
  };

  const document = {
    readyState: 'complete',
    body: makeElement('body'),
    head: { appendChild: (el) => calls.headAppended.push(el) },
    getElementById: (id) => elements[id] ?? null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: (tag) => ({ tag, addEventListener() {} }),
    addEventListener() {}
  };

  const sandbox = {
    console: { log() {}, warn() {}, error: (...a) => calls.errors.push(a.join(' ')) },
    setTimeout, clearTimeout, setInterval, clearInterval,
    document,
    localStorage,
    sessionStorage: makeStorage(),
    Promise,
    Number, String, Object, parseInt, parseFloat, Set, Date, RegExp
  };
  sandbox.window = sandbox;
  sandbox.location = { hostname, search: '' };
  sandbox.addEventListener = () => {};
  if (sdkPreloaded) sandbox.ShopifyBuy = ShopifyBuy;
  vm.createContext(sandbox);

  vm.runInContext(code, sandbox, { filename: 'buybutton.js' });

  const sdkScript = calls.headAppended.find((el) => el.tag === 'script');
  const preconnects = calls.headAppended.filter((el) => el.tag === 'link');
  assert.strictEqual(preconnects.length, 2, `${name}: 2× preconnect`);

  if (sdkPreloaded) {
    assert(!sdkScript, `${name}: SDK už je načtené – nesmí se injektovat znovu`);
  } else {
    // Simulace lazy-load: SDK skript vložen do head, po "stažení" se objeví globál a spustí onload
    assert(sdkScript, `${name}: SDK script musí být injektován`);
    assert.strictEqual(sdkScript.async, true);
    assert.strictEqual(sdkScript.src, 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js');
    sandbox.ShopifyBuy = ShopifyBuy;
    sdkScript.onload();
  }

  // Nech doběhnout promise chain
  await new Promise((r) => setTimeout(r, 20));

  expect({ elements, calls, localStorage });
  console.log(`✔ ${name}`);
}

(async () => {
  // 1) DE: texty, odkazy, skrytí alza, giftCard=null se přeskočí, nový checkout
  await runScenario({
    name: 'DE – plná stránka, bez existujícího košíku, lazy-load SDK',
    hostname: 'de.meer.care',
    sdkPreloaded: false,
    elementIds: ['buy-button-set-I', 'buy-button-gift-card', 'cart-toggle', 'delivery-treshold',
                 'nav-delivery-speed', 'user-orders', 'user-login', 'alza-button', 'reviews-rating-number'],
    expect: ({ elements, calls, localStorage }) => {
      assert.strictEqual(elements['delivery-treshold'].textContent, 'Kostenloser Versand ab 30 €');
      assert.strictEqual(elements['nav-delivery-speed'].textContent, 'Lieferung in 2-3 Tagen');
      assert.strictEqual(elements['user-orders'].href, 'https://meercarede.cz/account');
      assert.strictEqual(elements['user-login'].href, 'https://meercarede.cz/account/login');
      assert.strictEqual(elements['alza-button'].style.display, 'none');
      assert.strictEqual(calls.createComponent.length, 1, 'giftCard (null) musí být přeskočena');
      assert.strictEqual(calls.createComponent[0].id, 15873302233413);
      assert.strictEqual(calls.createComponent[0].node, 'buy-button-set-I');
      assert.strictEqual(calls.checkoutCreate, 1);
      assert.strictEqual(calls.checkoutFetch, 0);
      assert.strictEqual(localStorage.getItem('d0790ee9d09c16714d92224efa9f5882.meercarede.cz.checkoutId'), 'gid://new-checkout');
      assert.deepStrictEqual(calls.errors, []);
    }
  });

  // 2) CZ: existující košík se znovu použije, cizí checkouty se smažou, chybějící user elementy nepadají
  await runScenario({
    name: 'CZ – existující košík zachován, cizí smazány, chybějící elementy OK',
    hostname: 'www.meer.care',
    elementIds: ['buy-button-set-complete', 'buy-button-step-III', 'buy-button-gift-card', 'delivery-date'],
    localStorageInit: {
      'd0790ee9d09c16714d92224efa9f5882.meer.cz.checkoutId': 'gid://existing-cz',
      'd0790ee9d09c16714d92224efa9f5882.meercarede.cz.checkoutId': 'gid://foreign-de',
      'unrelated-key': 'keep-me'
    },
    expect: ({ elements, calls, localStorage }) => {
      assert.strictEqual(calls.checkoutFetch, 1);
      assert.strictEqual(calls.checkoutCreate, 0, 'existující košík se nesmí přepsat');
      assert.strictEqual(localStorage.getItem('d0790ee9d09c16714d92224efa9f5882.meer.cz.checkoutId'), 'gid://existing-cz');
      assert.strictEqual(localStorage.getItem('d0790ee9d09c16714d92224efa9f5882.meercarede.cz.checkoutId'), null, 'cizí checkout smazán');
      assert.strictEqual(localStorage.getItem('unrelated-key'), 'keep-me');
      assert.strictEqual(calls.createComponent.length, 3);
      assert.deepStrictEqual(calls.createComponent.map((c) => c.id).sort(), [7931357692134, 8578704736581, 8623720366405].sort());
      assert.ok(elements['delivery-date'].textContent.endsWith('u Vás'));
      assert.deepStrictEqual(calls.errors, []);
    }
  });

  // 3) SK: neplatný uložený checkout → vytvoří se nový
  await runScenario({
    name: 'SK – neplatný uložený košík → nový checkout',
    hostname: 'sk.meer.care',
    elementIds: ['buy-button-step-I', 'user-menu'],
    localStorageInit: { 'd0790ee9d09c16714d92224efa9f5882.meer.sk.checkoutId': 'gid://stale' },
    existingCheckoutValid: false,
    expect: ({ elements, calls, localStorage }) => {
      assert.strictEqual(calls.checkoutFetch, 1);
      assert.strictEqual(calls.checkoutCreate, 1);
      assert.strictEqual(localStorage.getItem('d0790ee9d09c16714d92224efa9f5882.meer.sk.checkoutId'), 'gid://new-checkout');
      assert.strictEqual(elements['user-menu'].style.display, undefined, 'SK user menu se neskrývá');
      assert.deepStrictEqual(calls.errors, []);
    }
  });

  // 4) EN: user menu skryté
  await runScenario({
    name: 'EN – user menu skryté',
    hostname: 'en.meer.care',
    elementIds: ['buy-button-set-II', 'user-menu', 'delivery-treshold'],
    expect: ({ elements, calls }) => {
      assert.strictEqual(elements['user-menu'].style.display, 'none');
      assert.strictEqual(elements['delivery-treshold'].textContent, 'Free Delivery from $50');
      assert.strictEqual(calls.createComponent[0].id, 8021842854118);
      assert.deepStrictEqual(calls.errors, []);
    }
  });

  console.log('\nALL TESTS PASSED');
})().catch((e) => { console.error('TEST FAILED:', e); process.exit(1); });