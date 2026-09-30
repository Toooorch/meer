(() => {
  'use strict';

  // Ochrana proti dvojímu načtení skriptu
  if (window.__meerBuyButtonLoaded) return;
  window.__meerBuyButtonLoaded = true;

  // ---------------------------------------------------------------------------
  // Debug / logging
  // ---------------------------------------------------------------------------
  const DEBUG = /[?&]meerdebug=1/.test(window.location.search);
  const log = (...args) => { if (DEBUG) console.log('[meer]', ...args); };
  const warn = (...args) => { if (DEBUG) console.warn('[meer]', ...args); };
  const error = (...args) => console.error('[meer]', ...args);

  // ---------------------------------------------------------------------------
  // Bezpečné storage helpery (private mode / zakázané cookies nesmí shodit skript)
  // ---------------------------------------------------------------------------
  const safeStorage = (getStore) => ({
    get(key) { try { return getStore().getItem(key); } catch (e) { return null; } },
    set(key, value) { try { getStore().setItem(key, value); return true; } catch (e) { return false; } },
    remove(key) { try { getStore().removeItem(key); } catch (e) { /* noop */ } },
    keys() {
      try {
        const store = getStore();
        const out = [];
        for (let i = 0; i < store.length; i++) out.push(store.key(i));
        return out;
      } catch (e) { return []; }
    }
  });
  const local = safeStorage(() => window.localStorage);
  const session = safeStorage(() => window.sessionStorage);

  // ---------------------------------------------------------------------------
  // Locale detekce – web běží výhradně na *.meer.care, locale = subdoména
  // ---------------------------------------------------------------------------
  const hostname = window.location.hostname.toLowerCase();

  const getLocale = () => {
    if (hostname.includes('en.meer.care')) return 'en';
    if (hostname.includes('sk.meer.care')) return 'sk';
    if (hostname.includes('de.meer.care')) return 'de';
    if (hostname.includes('fr.meer.care')) return 'fr';
    if (hostname.includes('pl.meer.care')) return 'pl';
    return 'cz'; // default (meer.care / www.meer.care)
  };

  const locale = getLocale();

  // ---------------------------------------------------------------------------
  // Konfigurace jednotlivých trhů
  //   domain          – Shopify doména pro Storefront API
  //   accountDomain   – doména pro odkazy na zákaznický účet (musí být stejný shop!)
  //   productIds      – null = produkt na daném trhu neexistuje, komponenta se přeskočí
  // ---------------------------------------------------------------------------
  const localeConfigs = {
    en: {
      domain: 'meer-care.myshopify.com',
      accountDomain: 'meer-care.myshopify.com',
      accessToken: 'd0790ee9d09c16714d92224efa9f5882',
      language: 'en',
      countryCode: 'US',
      moneyFormat: '$%7B%7Bamount%7D%7D',
      buttonText: 'Add to Basket',
      hideUserMenu: true,
      ui: {
        threshold: 'Free Delivery from $50',
        delivery: 'Fast Delivery'
      },
      productIds: {
        setComplete: 8623720366405,
        setI: 7542825058534,
        setII: 8021842854118,
        stepI: 7601486758118,
        stepII: 7609802686694,
        stepIII: 7931357692134,
        stepIV: 7931360051430,
        giftCard: 8578704736581
      },
      cart: {
        title: 'Cart',
        total: 'Subtotal',
        empty: 'Your cart is empty.',
        button: 'Proceed to Checkout',
        noteDescription: 'Order Note',
        notice: 'Shipping and discount codes are added at checkout.',
        outOfStock: 'Sold Out',
        unavailable: 'Sold Out'
      }
    },

    sk: {
      domain: 'meer.sk',
      accountDomain: 'meer.sk',
      accessToken: 'd0790ee9d09c16714d92224efa9f5882',
      language: 'sk',
      countryCode: 'SK',
      moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
      buttonText: 'Pridať do košíka',
      ui: {
        // alternativa: "Doprava teraz zadarmo"
        threshold: 'Doprava zadarmo od 30 €',
        delivery: 'Doručenie za 1-3 dni'
      },
      productIds: {
        setComplete: 8623720366405,
        setI: 7542825058534,
        setII: 8021842854118,
        stepI: 7601486758118,
        stepII: 7609802686694,
        stepIII: 7931357692134,
        stepIV: 7931360051430,
        giftCard: 8578704736581
      },
      cart: {
        title: 'Košík',
        total: 'Celková čiastka',
        empty: 'Momentálne nemáte v košíku vložený žiadny tovar.',
        button: 'Pokračovať k pokladni',
        noteDescription: 'Poznámka k objednávke',
        notice: 'Doprava a zľavové kódy sa pridávajú pri pokladni.',
        outOfStock: 'Vypredané',
        unavailable: 'Vypredané'
      }
    },

    de: {
      domain: 'meercarede.cz',
      accountDomain: 'meercarede.cz',
      accessToken: 'd0790ee9d09c16714d92224efa9f5882',
      language: 'de',
      countryCode: 'DE',
      moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
      buttonText: 'In den Warenkorb',
      hideAlzaButton: true,
      ui: {
        // alternativa: "Jetzt kostenloser Versand"
        threshold: 'Kostenloser Versand ab 30 €',
        delivery: 'Lieferung in 2-3 Tagen'
      },
      productIds: {
        setComplete: 15873300857157,
        setI: 15873302233413,
        setII: 15873303085381,
        stepI: 15873776484677,
        stepII: 15873777336645,
        stepIII: 15873777729861,
        stepIV: 15873778123077,
        giftCard: null // na DE shopu zatím neexistuje – doplnit ID, jakmile bude
      },
      cart: {
        title: 'Warenkorb',
        total: 'Zwischensumme',
        empty: 'Ihr Warenkorb ist leer.',
        button: 'Zur Kasse gehen',
        noteDescription: 'Bestellnotiz',
        notice: 'Versand und Rabattcodes werden an der Kasse hinzugefügt.',
        outOfStock: 'Ausverkauft',
        unavailable: 'Ausverkauft'
      }
    },

    fr: {
      domain: 'meercarefr.cz',
      accountDomain: 'meercarefr.cz',
      accessToken: 'd0790ee9d09c16714d92224efa9f5882',
      language: 'fr',
      countryCode: 'FR',
      moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
      buttonText: 'Ajouter au panier',
      ui: {
        threshold: 'Frais de port offerts à partir de €60',
        delivery: 'Livraison en 2-5 jours'
      },
      productIds: {
        setComplete: 10180475715923,
        setI: 10180474405203,
        setII: 10180482498899,
        stepI: 10180486824275,
        stepII: 10180486005075,
        stepIII: 10180484628819,
        stepIV: 10180484301139,
        giftCard: null // na FR shopu zatím neexistuje – doplnit ID, jakmile bude
      },
      cart: {
        title: 'Panier',
        total: 'Sous-total',
        empty: 'Votre panier est vide.',
        button: 'Procéder au paiement',
        noteDescription: 'Note de commande',
        notice: 'Les frais de livraison et les codes de réduction sont ajoutés lors du paiement.',
        outOfStock: 'Épuisé',
        unavailable: 'Épuisé'
      }
    },

    pl: {
      domain: 'meercarepl.cz',
      accountDomain: 'meercarepl.cz',
      accessToken: 'd0790ee9d09c16714d92224efa9f5882',
      language: 'pl',
      countryCode: 'PL',
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
      buttonText: 'Włożyć do koszyka',
      ui: {
        threshold: 'Teraz z DARMOWĄ WYSYŁKĄ',
        delivery: 'Dostawa 1-3 dni'
      },
      productIds: {
        setComplete: 15337577349445,
        setI: 15337570500933,
        setII: 15337576497477,
        stepI: 15337572991301,
        stepII: 15337573220677,
        stepIII: 15337574072645,
        stepIV: 15337575874885,
        giftCard: null // na PL shopu zatím neexistuje – doplnit ID, jakmile bude
      },
      cart: {
        title: 'Koszyk',
        total: 'Suma',
        empty: 'Obecnie nie masz żadnych produktów w koszyku.',
        button: 'Przejdź do finalizacji zakupu',
        noteDescription: 'Uwaga do zamówienia',
        notice: 'Koszty wysyłki i kody rabatowe są dodawane przy kasie.',
        outOfStock: 'Sprzedany',
        unavailable: 'Sprzedany'
      }
    },

    cz: {
      domain: 'meer.cz',
      accountDomain: 'meer.cz',
      accessToken: 'd0790ee9d09c16714d92224efa9f5882',
      language: 'cs',
      countryCode: 'CZ',
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      buttonText: 'Přidat do košíku',
      ui: {
        // alternativa: "Doprava nyní zdarma"
        threshold: 'Doprava zdarma od 1500Kč',
        // CZ má doručení závislé na dni v týdnu
        delivery: () => {
          const dayMessages = {
            1: 'pozítří u Vás',     // Po
            2: 'pozítří u Vás',     // Út
            3: 'pozítří u Vás',     // St
            4: 'v pondělí u Vás',   // Čt
            5: 'v úterý u Vás',     // Pá
            6: 'v úterý u Vás',     // So
            0: 'v úterý u Vás'      // Ne
          };
          return dayMessages[new Date().getDay()] || 'pozítří u Vás';
        }
      },
      productIds: {
        setComplete: 8623720366405,
        setI: 7542825058534,
        setII: 8021842854118,
        stepI: 7601486758118,
        stepII: 7609802686694,
        stepIII: 7931357692134,
        stepIV: 7931360051430,
        giftCard: 8578704736581
      },
      cart: {
        title: 'Košík',
        total: 'Mezisoučet',
        empty: 'Váš košík je prázdný.',
        button: 'Pokračovat k pokladně',
        noteDescription: 'Poznámka k objednávce',
        notice: 'Slevové kódy se přidávají u pokladny.',
        outOfStock: 'Vyprodáno',
        unavailable: 'Vyprodáno'
      }
    }
  };

  const config = localeConfigs[locale] || localeConfigs.cz;

  // ---------------------------------------------------------------------------
  // Performance helpery
  // ---------------------------------------------------------------------------
  // Spustí práci, až když má prohlížeč volno (nezdržuje vykreslení stránky)
  const whenIdle = (fn, timeout = 2000) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(fn, { timeout });
    } else {
      setTimeout(fn, 1);
    }
  };

  // <link rel="preconnect"> – TCP/TLS handshake proběhne dřív, než začne download
  const preconnect = (origin) => {
    if (document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  };

  // ---------------------------------------------------------------------------
  // DOM helpery (vše s null-checkem)
  // ---------------------------------------------------------------------------
  const setText = (...args) => {
    const text = args.pop();
    args.forEach((el) => { if (el) el.textContent = text; });
  };

  const setHref = (el, href) => { if (el) el.href = href; };

  const hide = (el) => { if (el) el.style.display = 'none'; };

  // ---------------------------------------------------------------------------
  // Reviews counter (s horním limitem a úklidem timerů)
  // ---------------------------------------------------------------------------
  const MAX_SESSION_INCREMENTS = 30;

  const animateReviewsCounter = () => {
    const reviewsElement = document.getElementById('reviews-rating-number');
    if (!reviewsElement) return;

    const initialCount = parseInt(String(reviewsElement.textContent).trim(), 10) || 0;
    if (initialCount === 0) return;

    const sessionCountKey = `meer_reviews_added_${locale}`;
    let addedInSession = parseInt(session.get(sessionCountKey), 10) || 0;
    if (addedInSession > MAX_SESSION_INCREMENTS) addedInSession = MAX_SESSION_INCREMENTS;

    let currentCount = initialCount + addedInSession;
    reviewsElement.textContent = String(currentCount);

    // Limit dosažen – žádné další timery
    if (addedInSession >= MAX_SESSION_INCREMENTS) return;

    const timers = new Set();
    let intervalId = null;

    const stop = () => {
      timers.forEach(clearTimeout);
      timers.clear();
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
    };

    const later = (fn, delay) => {
      const id = setTimeout(() => { timers.delete(id); fn(); }, delay);
      timers.add(id);
      return id;
    };

    const incrementReview = () => {
      if (addedInSession >= MAX_SESSION_INCREMENTS) { stop(); return; }

      currentCount += 1;
      addedInSession += 1;
      session.set(sessionCountKey, String(addedInSession));
      reviewsElement.textContent = String(currentCount);

      reviewsElement.style.opacity = '0.6';
      later(() => { reviewsElement.style.opacity = '1'; }, 200);

      if (addedInSession >= MAX_SESSION_INCREMENTS) stop();
    };

    // Cyklus: +1 po 8 s, +1 po dalších 20 s; opakuje se každých 60 s
    const startCycle = () => {
      later(() => {
        incrementReview();
        later(incrementReview, 20000);
      }, 8000);
    };

    startCycle();
    intervalId = setInterval(startCycle, 60000);

    window.addEventListener('pagehide', stop, { once: true });
  };

  // Debug utilita: v konzoli zavolej resetReviewsCounter()
  window.resetReviewsCounter = () => {
    Object.keys(localeConfigs).forEach((loc) => {
      session.remove(`meer_reviews_added_${loc}`);
      session.remove(`meer_reviews_increments_${loc}`);
    });
    console.log('[meer] All reviews counters reset');
    location.reload();
  };

  // ---------------------------------------------------------------------------
  // Úklid localStorage – maže POUZE checkouty z jiných domén/tokenů.
  // Aktuální checkout zůstává, aby se košík neztratil mezi stránkami.
  // ---------------------------------------------------------------------------
  const cleanupForeignCheckouts = (currentKey) => {
    const removed = local.keys().filter((key) => {
      if (!key || key === currentKey || !key.includes('checkoutId')) return false;
      return key.includes('.myshopify.com')
        || key.includes('meer.cz')
        || key.includes('meer.sk')
        || key.includes('meercare');
    });

    removed.forEach((key) => local.remove(key));
    if (removed.length) log('Removed checkout IDs from other stores:', removed.length);
  };

  // ---------------------------------------------------------------------------
  // Tracking add_to_cart (Zaraz)
  // Jeden delegovaný listener na document – žádný MutationObserver, žádná
  // režie při změnách DOM, funguje i pro tlačítka vykreslená kdykoli později.
  // ---------------------------------------------------------------------------
  let trackingInitialized = false;

  const setupTracking = (buttonText) => {
    if (trackingInitialized) return;
    trackingInitialized = true;

    document.addEventListener('click', (event) => {
      const button = event.target.closest && event.target.closest('.shopify-buy__btn');
      if (!button) return;
      if (buttonText && !button.textContent.includes(buttonText)) return;

      const shopifyWrapper = button.closest('.shopify-button');
      if (!shopifyWrapper) return;

      const rawPrice = parseFloat(shopifyWrapper.getAttribute('data-price'));
      const eventData = {
        product_id: shopifyWrapper.getAttribute('data-product-id'),
        product_name: shopifyWrapper.getAttribute('data-product-name'),
        price: Number.isFinite(rawPrice) ? rawPrice : undefined,
        quantity: 1
      };

      if (typeof zaraz !== 'undefined') zaraz.track('add_to_cart', eventData);
    }, { passive: true });
  };

  // ---------------------------------------------------------------------------
  // Shopify Buy Button
  // ---------------------------------------------------------------------------
  const SHOPIFY_SDK_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

  const getProductElements = () => ({
    setComplete: document.getElementById('buy-button-set-complete'),
    setI: document.getElementById('buy-button-set-I'),
    setII: document.getElementById('buy-button-set-II'),
    stepI: document.getElementById('buy-button-step-I'),
    stepII: document.getElementById('buy-button-step-II'),
    stepIII: document.getElementById('buy-button-step-III'),
    stepIV: document.getElementById('buy-button-step-IV'),
    giftCard: document.getElementById('buy-button-gift-card')
  });

  const initializeShopify = () => {
    const productElements = getProductElements();
    const cartToggle = document.getElementById('cart-toggle');

    // Na stránce nejsou žádné buy buttony – nemá smysl cokoli inicializovat
    if (!Object.values(productElements).some(Boolean)) {
      log('No product elements found – skipping Shopify initialization');
      return;
    }

    if (!cartToggle) warn('Cart toggle element not found – cart may not open from the header');

    const shopifyBuyInit = () => {
      try {
        const client = ShopifyBuy.buildClient({
          domain: config.domain,
          storefrontAccessToken: config.accessToken,
          language: config.language
        });

        const checkoutKey = `${config.accessToken}.${config.domain}.checkoutId`;

        // Smaž jen checkouty z ostatních trhů, ten aktuální ponech
        cleanupForeignCheckouts(checkoutKey);

        log('Shopify init', { locale, domain: config.domain, language: config.language, country: config.countryCode });

        const createCheckout = () => client.checkout.create({
          buyerIdentity: { countryCode: config.countryCode }
        });

        // Znovupoužij existující košík, pokud je platný a nedokončený
        const existingId = local.get(checkoutKey);
        const checkoutPromise = existingId
          ? client.checkout.fetch(existingId)
              .then((checkout) => {
                if (checkout && !checkout.completedAt) {
                  log('Reusing existing checkout');
                  return checkout;
                }
                log('Existing checkout completed/invalid – creating new one');
                return createCheckout();
              })
              .catch(() => createCheckout())
          : createCheckout();

        // Checkout i UI se načítají paralelně – ušetří jeden síťový round-trip
        Promise.all([checkoutPromise, ShopifyBuy.UI.onReady(client)])
          .then(([checkout, ui]) => {
            local.set(checkoutKey, checkout.id);

              const options = {
                product: {
                  iframe: false,
                  contents: {
                    img: false,
                    button: false,
                    buttonWithQuantity: true,
                    title: false,
                    price: false
                  },
                  text: {
                    button: config.buttonText,
                    outOfStock: config.cart.outOfStock,
                    unavailable: config.cart.unavailable
                  }
                },
                cart: {
                  iframe: false,
                  text: config.cart,
                  contents: { note: true },
                  popup: false
                },
                toggle: {
                  iframe: false,
                  sticky: false,
                  templates: { icon: '' }
                }
              };

              Object.entries(config.productIds).forEach(([key, productId]) => {
                const element = productElements[key];
                if (!element) return;            // element na stránce není – tiše přeskoč
                if (!productId) {                // produkt na tomto trhu neexistuje
                  warn(`Product "${key}" is not available for locale "${locale}" – skipping`);
                  return;
                }

                try {
                  ui.createComponent('product', {
                    id: [productId],
                    node: element,
                    toggles: cartToggle ? [{ node: cartToggle }] : [],
                    moneyFormat: config.moneyFormat,
                    options
                  });
                  log(`Component created: ${key}`);
                } catch (err) {
                  error(`Failed to create Shopify component for ${key}:`, err);
                }
              });

              whenIdle(() => setupTracking(config.buttonText));
          })
          .catch((err) => error('Shopify checkout/UI initialization failed:', err));
      } catch (err) {
        error('Shopify initialization failed:', err);
      }
    };

    // Připoj se k CDN i shop doméně dřív, než se SDK začne stahovat
    preconnect('https://sdks.shopifycdn.com');
    preconnect(`https://${config.domain}`);

    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      shopifyBuyInit();
      return;
    }

    const existingScript = document.querySelector(`script[src="${SHOPIFY_SDK_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', shopifyBuyInit, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = SHOPIFY_SDK_URL;
    script.onload = shopifyBuyInit;
    script.onerror = () => error('Failed to load Shopify SDK');
    document.head.appendChild(script);

    setTimeout(() => {
      if (!window.ShopifyBuy) error('Shopify SDK failed to load within 10s');
    }, 10000);
  };

  // ---------------------------------------------------------------------------
  // Init
  // ---------------------------------------------------------------------------
  const init = () => {
    // Delivery / threshold texty
    const deliveryThreshold = document.getElementById('delivery-treshold');
    const deliveryTime = document.getElementById('delivery-speed');
    const deliveryDate = document.getElementById('delivery-date');
    const navDeliveryThreshold = document.getElementById('nav-delivery-treshold');
    const navDeliveryTime = document.getElementById('nav-delivery-speed');

    const deliveryText = typeof config.ui.delivery === 'function'
      ? config.ui.delivery()
      : config.ui.delivery;

    setText(deliveryDate, deliveryText);
    setText(navDeliveryThreshold, deliveryThreshold, config.ui.threshold);
    setText(navDeliveryTime, deliveryTime, deliveryText);

    // Skrývání prvků podle trhu
    if (config.hideUserMenu) hide(document.getElementById('user-menu'));
    if (config.hideAlzaButton) hide(document.getElementById('alza-button'));

    // Odkazy na zákaznický účet – vždy na doménu daného shopu
    const accountBase = `https://${config.accountDomain}`;
    setHref(document.getElementById('user-orders'), `${accountBase}/account`);
    setHref(document.getElementById('user-login'), `${accountBase}/account/login`);
    setHref(document.getElementById('user-create-account'), `${accountBase}/account/register`);
    setHref(document.getElementById('user-forgot-password'), `${accountBase}/account/login#recover`);
    setHref(document.getElementById('user-addresses'), `${accountBase}/account/addresses`);

    // Buy buttony jsou priorita – startují hned
    initializeShopify();

    // Kosmetika až když má prohlížeč volno
    whenIdle(animateReviewsCounter);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
