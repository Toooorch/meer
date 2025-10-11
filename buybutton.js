// Environment & Locale Setup
typeof process === 'undefined' && (globalThis.process = { env: { NODE_ENV: 'production' } });
const isDev = process.env.NODE_ENV !== 'production';
const localeMatch = window.location.href.match(/\/\/(en|sk|de|fr|pl)\.meer\./);
const locale = localeMatch ? localeMatch[1] : 'cz';
const dayOfWeek = new Date().getDay();

// DOM Cache
const $ = id => document.getElementById(id);
const dom = {
  deliveryTrashold: $("delivery-treshold"),
  deliveryTime: $("delivery-speed"),
  deliveryDate: $("delivery-date"),
  navDeliveryTrashold: $("nav-delivery-treshold"),
  navDeliveryTime: $("nav-delivery-speed"),
  userMenu: $("user-menu"),
  cartToggle: $("cart-toggle"),
  alzaButton: $("alza-button"),
  userLinks: {
    orders: $('user-orders'),
    login: $('user-login'),
    createAccount: $('user-create-account'),
    forgotPassword: $('user-forgot-password'),
    addresses: $('user-addresses')
  },
  products: {
    setComplete: $('buy-button-set-complete'),
    setI: $('buy-button-set-I'),
    setII: $('buy-button-set-II'),
    stepI: $('buy-button-step-I'),
    stepII: $('buy-button-step-II'),
    stepIII: $('buy-button-step-III'),
    stepIV: $('buy-button-step-IV'),
    giftCard: $('buy-button-gift-card')
  }
};

// Helpers
const updateDelivery = (nav, footer, text) => (nav && (nav.textContent = text), footer && (footer.textContent = text));
const getCzDeliveryMsg = () => ['pozítří u Vás', 'pozítří u Vás', 'pozítří u Vás', 'v pondělí u Vás', 'v úterý u Vás', 'v úterý u Vás', 'v úterý u Vás'][dayOfWeek];
const updateUserLinks = url => Object.entries({
  orders: '/account',
  login: '/account/login',
  createAccount: '/account/register',
  forgotPassword: '/account/login#recover',
  addresses: '/account/addresses'
}).forEach(([key, path]) => dom.userLinks[key] && (dom.userLinks[key].href = `${url}${path}`));

// Configuration objects
const localeConfigs = {
  en: {
    domain: 'meer-care.myshopify.com',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
    language: 'en',
    countryCode: 'US',
    moneyFormat: '$%7B%7Bamount%7D%7D',
    buttonText: 'Add to Basket',
    delivery: { speed: "Fast Delivery", threshold: "Free Delivery from $50" },
    hideUserMenu: true,
    productIds: {
      setComplete: 8623720366405, setI: 7542825058534, setII: 8021842854118,
      stepI: 7601486758118, stepII: 7609802686694, stepIII: 7931357692134,
      stepIV: 7931360051430, giftCard: 8578704736581
    },
    cart: {
      title: "Cart", total: "Subtotal", empty: "Your cart is empty.",
      button: "Proceed to Checkout", noteDescription: "Order Note",
      notice: "Shipping and discount codes are added at checkout.",
      outOfStock: "Sold Out", unavailable: "Sold Out"
    }
  },
  sk: {
    domain: 'meer.sk',
    accessToken: '618933109ccee1040151ba599180cfef',
    language: 'sk',
    countryCode: 'SK',
    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
    buttonText: 'Pridať do košíka',
    delivery: { speed: "Doručenie za 1-3 dni", threshold: "Doprava teraz ZADARMO" },
    userBaseUrl: 'https://www.meer.beauty',
    productIds: {
      setComplete: 8592696639827, setI: 8592695624019, setII: 8592696541523,
      stepI: 8592695886163, stepII: 8592696115539, stepIII: 8592696279379,
      stepIV: 8592696475987, giftCard: 8592808051027
    },
    cart: {
      title: "Košík", total: "Celková čiastka", empty: "Momentálne nemáte v košíku vložený žiadny tovar.",
      button: "Pokračovať k pokladni", noteDescription: "Poznámka k objednávke",
      notice: "Doprava a zľavové kódy sa pridávajú pri pokladni.",
      outOfStock: "Vypredané", unavailable: "Vypredané"
    }
  },
  de: {
    domain: 'meercarede.cz',
    accessToken: '618933109ccee1040151ba599180cfef',
    language: 'de',
    countryCode: 'DE',
    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
    buttonText: 'In den Warenkorb',
    delivery: { speed: "Lieferung in 2-3 Tagen", threshold: "Jetzt kostenloser Versand" },
    userBaseUrl: 'https://www.meer.beauty',
    hideAlzaButton: true,
    productIds: {
      setComplete: 9792222462291, setI: 9792209256787, setII: 9792221315411,
      stepI: 9792209650003, stepII: 9792209977683, stepIII: 9792218235219,
      stepIV: 9792220135763, giftCard: 8578704736581
    },
    cart: {
      title: "Warenkorb", total: "Zwischensumme", empty: "Ihr Warenkorb ist leer.",
      button: "Zur Kasse gehen", noteDescription: "Bestellnotiz",
      notice: "Versand und Rabattcodes werden an der Kasse hinzugefügt.",
      outOfStock: "Ausverkauft", unavailable: "Ausverkauft"
    }
  },
  fr: {
    domain: 'meercarefr.cz',
    accessToken: '618933109ccee1040151ba599180cfef',
    language: 'fr',
    countryCode: 'FR',
    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
    buttonText: 'Ajouter au panier',
    delivery: { speed: "Livraison en 2-5 jours", threshold: "Frais de port offerts à partir de €60" },
    userBaseUrl: 'https://www.meer.beauty',
    productIds: {
      setComplete: 10180475715923, setI: 10180474405203, setII: 10180482498899,
      stepI: 10180486824275, stepII: 10180486005075, stepIII: 10180484628819,
      stepIV: 10180484301139, giftCard: 8578704736581
    },
    cart: {
      title: "Panier", total: "Sous-total", empty: "Votre panier est vide.",
      button: "Procéder au paiement", noteDescription: "Note de commande",
      notice: "Les frais de livraison et les codes de réduction sont ajoutés lors du paiement.",
      outOfStock: "Épuisé", unavailable: "Épuisé"
    }
  },
  pl: {
    domain: 'meercarepl.cz',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
    language: 'pl',
    countryCode: 'PL',
    moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
    buttonText: 'Włożyć do koszyka',
    delivery: { speed: "Dostawa 1-3 dni", threshold: "Teraz z DARMOWĄ WYSYŁKĄ" },
    userBaseUrl: 'https://meercarepl.cz',
    productIds: {
      setComplete: 15337577349445, setI: 15337570500933, setII: 15337576497477,
      stepI: 15337572991301, stepII: 15337573220677, stepIII: 15337574072645,
      stepIV: 15337575874885, giftCard: 8578704736581
    },
    cart: {
      title: "Koszyk", total: "Suma", empty: "Obecnie nie masz żadnych produktów w koszyku.",
      button: "Przejdź do finalizacji zakupu", noteDescription: "Uwaga do zamówienia",
      notice: "Koszty wysyłki i kody rabatowe są dodawane przy kasie.",
      outOfStock: "Sprzedany", unavailable: "Sprzedany"
    }
  },
  cz: {
    domain: 'meer.cz',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
    language: 'cs',
    countryCode: 'CZ',
    moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
    buttonText: 'Přidat do košíku',
    delivery: { speed: getCzDeliveryMsg, threshold: "Doprava nyní ZDARMA" },
    productIds: {
      setComplete: 8623720366405, setI: 7542825058534, setII: 8021842854118,
      stepI: 7601486758118, stepII: 7609802686694, stepIII: 7931357692134,
      stepIV: 7931360051430, giftCard: 8578704736581
    },
    cart: {
      title: "Košík", total: "Mezisoučet", empty: "Váš košík je prázdný.",
      button: "Pokračovat k pokladně", noteDescription: "Poznámka k objednávce",
      notice: "Slevové kódy se přidávají u pokladny.",
      outOfStock: "Vyprodáno", unavailable: "Vyprodáno"
    }
  }
};

// Get current config (with fallback)
const config = localeConfigs[locale] || localeConfigs.cz;
const getLanguage = () => config.language;
const getCountry = () => config.countryCode;
const getDomain = () => config.domain;
const getAccessToken = () => config.accessToken;
const getButtonText = () => config.buttonText;
const getCart = () => config.cart;
const getMoneyFormat = () => config.moneyFormat;
const getProductIds = () => config.productIds;

// Cleanup starých localStorage záznamů
const cleanupOldCheckouts = () => {
  try {
    Object.keys(localStorage).filter(k => k.includes('checkoutId')).forEach(k => localStorage.removeItem(k));
    isDev && console.log('Cleaned up old checkout IDs');
  } catch (e) {
    isDev && console.warn('Could not clean localStorage:', e);
  }
};

// Main functions
const setupTracking = buttonText => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(({ type, addedNodes }) => {
      if (type !== 'childList') return;
      addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        const buttons = node.querySelectorAll?.('.shopify-buy__btn:not([data-zaraz-tracked])') || [];
        buttons.forEach(btn => {
          if (!btn.textContent.includes(buttonText)) return;
          btn.setAttribute('data-zaraz-tracked', 'true');
          btn.addEventListener('click', function() {
            const wrapper = this.closest('.shopify-button');
            if (wrapper && typeof zaraz !== 'undefined') {
              zaraz.track("add_to_cart", {
                product_id: wrapper.getAttribute('data-product-id'),
                product_name: wrapper.getAttribute('data-product-name'),
                price: parseFloat(wrapper.getAttribute('data-price')),
                quantity: 1
              });
            }
          }, { once: true });
        });
        buttons.length && observer.disconnect();
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 30000);
  window.addEventListener('beforeunload', () => observer.disconnect(), { once: true });
};

const initializeShopify = () => {
  if (!config) return isDev && console.error('Shopify config missing for locale:', locale);
  if (!Object.values(dom.products).some(el => el)) return isDev && console.log('No product elements found');
  !dom.cartToggle && isDev && console.warn('Cart toggle not found');

  cleanupOldCheckouts();

  const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  
  if (window.ShopifyBuy?.UI) return ShopifyBuyInit();
  if (document.querySelector(`script[src="${scriptURL}"]`)) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = scriptURL;
  script.onload = ShopifyBuyInit;
  script.onerror = () => isDev && console.error('Failed to load Shopify SDK');
  document.head.appendChild(script);
  setTimeout(() => !window.ShopifyBuy && isDev && console.error('Shopify SDK timeout'), 10000);

  function ShopifyBuyInit() {
    try {
      const client = ShopifyBuy.buildClient({
        domain: getDomain(),
        storefrontAccessToken: getAccessToken(),
        language: getLanguage(),
      });

      const checkoutKey = `${client.config.storefrontAccessToken}.${client.config.domain}.checkoutId`;
      isDev && console.log('Creating checkout:', { locale, domain: client.config.domain });

      client.checkout.create({ buyerIdentity: { countryCode: getCountry() } })
        .then(checkout => {
          try {
            localStorage.setItem(checkoutKey, checkout.id);
            isDev && console.log('Checkout created:', checkout.id);
          } catch (e) {
            isDev && console.warn('localStorage error:', e);
          }

          ShopifyBuy.UI.onReady(client).then(ui => {
            const options = {
              product: {
                iframe: false,
                contents: { img: false, button: false, buttonWithQuantity: true, title: false, price: false },
                text: { button: getButtonText(), outOfStock: getCart().outOfStock, unavailable: getCart().unavailable }
              },
              cart: { iframe: false, text: getCart(), contents: { note: true }, popup: false },
              toggle: { iframe: false, sticky: false, templates: { icon: '' } }
            };

            Object.entries(getProductIds()).forEach(([key, id]) => {
              const el = dom.products[key];
              if (!el) return isDev && console.warn(`Element ${key} not found`);
              try {
                ui.createComponent('product', {
                  id: [id],
                  node: el,
                  toggles: dom.cartToggle ? [{ node: dom.cartToggle }] : [],
                  moneyFormat: getMoneyFormat(),
                  options
                });
                isDev && console.log(`Component created: ${key}`);
              } catch (e) {
                isDev && console.error(`Failed to create ${key}:`, e);
              }
            });

            setupTracking(getButtonText());
          }).catch(e => isDev && console.error('Shopify UI error:', e));
        }).catch(e => isDev && console.error('Checkout creation error:', e));
    } catch (e) {
      isDev && console.error('Shopify init error:', e);
    }
  }
};

// Initialization
isDev && console.log('Current locale:', locale);

const deliverySpeed = typeof config.delivery.speed === 'function' ? config.delivery.speed() : config.delivery.speed;
dom.deliveryDate && (dom.deliveryDate.textContent = deliverySpeed);
updateDelivery(dom.navDeliveryTrashold, dom.deliveryTrashold, config.delivery.threshold);
updateDelivery(dom.navDeliveryTime, dom.deliveryTime, deliverySpeed);

config.hideUserMenu && dom.userMenu && (dom.userMenu.style.display = 'none');
config.hideAlzaButton && dom.alzaButton && (dom.alzaButton.style.display = 'none');
config.userBaseUrl && updateUserLinks(config.userBaseUrl);

initializeShopify();