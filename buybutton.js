(function() {
  'use strict';

  // Environment & Locale Setup
  const localeMatch = window.location.href.match(/\/\/(en|sk|de|fr|pl)\.meer\./);
  const locale = localeMatch ? localeMatch[1] : 'cz';
  const dayOfWeek = new Date().getDay();

  // DOM Cache helper
  const getEl = id => document.getElementById(id);
  const dom = {
    deliveryTrashold: getEl("delivery-treshold"),
    deliveryTime: getEl("delivery-speed"),
    deliveryDate: getEl("delivery-date"),
    navDeliveryTrashold: getEl("nav-delivery-treshold"),
    navDeliveryTime: getEl("nav-delivery-speed"),
    userMenu: getEl("user-menu"),
    cartToggle: getEl("cart-toggle"),
    alzaButton: getEl("alza-button"),
    userLinks: {
      orders: getEl('user-orders'),
      login: getEl('user-login'),
      createAccount: getEl('user-create-account'),
      forgotPassword: getEl('user-forgot-password'),
      addresses: getEl('user-addresses')
    },
    products: {
      setComplete: getEl('buy-button-set-complete'),
      setI: getEl('buy-button-set-I'),
      setII: getEl('buy-button-set-II'),
      stepI: getEl('buy-button-step-I'),
      stepII: getEl('buy-button-step-II'),
      stepIII: getEl('buy-button-step-III'),
      stepIV: getEl('buy-button-step-IV'),
      giftCard: getEl('buy-button-gift-card')
    }
  };

  // Helpers
  const updateDelivery = (nav, footer, text) => {
    if (nav) nav.textContent = text;
    if (footer) footer.textContent = text;
  };

  const getCzDeliveryMsg = () => {
    const messages = ['pozítří u Vás', 'pozítří u Vás', 'pozítří u Vás', 'v pondělí u Vás', 'v úterý u Vás', 'v úterý u Vás', 'v úterý u Vás'];
    return messages[dayOfWeek];
  };

  const updateUserLinks = url => {
    const links = {
      orders: '/account',
      login: '/account/login',
      createAccount: '/account/register',
      forgotPassword: '/account/login#recover',
      addresses: '/account/addresses'
    };
    Object.entries(links).forEach(([key, path]) => {
      if (dom.userLinks[key]) dom.userLinks[key].href = `${url}${path}`;
    });
  };

  // In-memory fallback storage
  let memoryStorage = {};

  const safeSetStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage unavailable, using memory:', e.name);
      memoryStorage[key] = value;
    }
  };

  const safeGetStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return memoryStorage[key] || null;
    }
  };

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

  // Cleanup starých localStorage záznamů
  const cleanupOldCheckouts = () => {
    try {
      Object.keys(localStorage)
        .filter(k => k.includes('checkoutId'))
        .forEach(k => localStorage.removeItem(k));
    } catch (e) {
      console.warn('Could not clean localStorage');
    }
  };

  // Main functions
  const setupTracking = buttonText => {
    let observer;
    let observerTimeout;

    observer = new MutationObserver(mutations => {
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
                try {
                  zaraz.track("add_to_cart", {
                    product_id: wrapper.getAttribute('data-product-id'),
                    product_name: wrapper.getAttribute('data-product-name'),
                    price: parseFloat(wrapper.getAttribute('data-price')),
                    quantity: 1
                  });
                } catch (e) {
                  console.warn('Zaraz tracking error:', e);
                }
              }
            }, { once: true });
          });
          if (buttons.length) {
            observer.disconnect();
            clearTimeout(observerTimeout);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    observerTimeout = setTimeout(() => {
      observer.disconnect();
    }, 30000);

    window.addEventListener('beforeunload', () => {
      observer.disconnect();
      clearTimeout(observerTimeout);
    }, { once: true });
  };

  const setupDirectCheckout = () => {
    const checkoutBaseURL = `https://${config.domain}/cart/`;
    
    Object.entries(config.productIds).forEach(([key, productId]) => {
      const el = dom.products[key];
      if (!el) return;

      const button = document.createElement('button');
      button.textContent = config.buttonText;
      button.className = 'shopify-fallback-btn';
      button.style.cssText = `
        padding: 10px 20px;
        background: #000;
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 14px;
        border-radius: 4px;
        width: 100%;
        font-weight: 600;
      `;

      button.addEventListener('click', (e) => {
        e.preventDefault();
        try {
          if (typeof zaraz !== 'undefined') {
            zaraz.track("add_to_cart", {
              product_id: productId,
              product_name: key,
              price: 0,
              quantity: 1
            });
          }
        } catch (e) {
          console.warn('Zaraz fallback tracking error:', e);
        }
        window.location.href = `${checkoutBaseURL}${productId}:1`;
      });

      el.textContent = '';
      el.appendChild(button);
      console.log(`Fallback checkout button created for: ${key}`);
    });
  };

  let shopifyInitialized = false;

  const loadShopifySDK = () => {
    return new Promise((resolve, reject) => {
      const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

      // Already loaded
      if (window.ShopifyBuy?.UI) {
        resolve();
        return;
      }

      // Already loading
      if (document.querySelector(`script[src="${scriptURL}"]`)) {
        resolve();
        return;
      }

      let timeout;
      const retryWithCDN = () => {
        console.warn('Primary CDN failed, trying backup CDN');
        const backupURL = 'https://cdn.jsdelivr.net/npm/shopify-buy@latest/dist/shopify-buy.umd.js';
        const backupScript = document.createElement('script');
        backupScript.async = true;
        backupScript.crossOrigin = 'anonymous';
        backupScript.src = backupURL;
        backupScript.onload = () => {
          clearTimeout(timeout);
          if (window.ShopifyBuy?.UI) {
            resolve();
          } else {
            reject(new Error('Backup SDK loaded but ShopifyBuy.UI not available'));
          }
        };
        backupScript.onerror = () => {
          clearTimeout(timeout);
          reject(new Error('All CDN attempts failed'));
        };
        document.head.appendChild(backupScript);
      };

      timeout = setTimeout(() => {
        retryWithCDN();
      }, 5000);

      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = scriptURL;

      script.onload = () => {
        clearTimeout(timeout);
        if (window.ShopifyBuy?.UI) {
          resolve();
        } else {
          reject(new Error('SDK loaded but ShopifyBuy.UI not available'));
        }
      };

      script.onerror = () => {
        clearTimeout(timeout);
        retryWithCDN();
      };

      document.head.appendChild(script);
    });
  };

  const initializeShopify = async () => {
    if (shopifyInitialized) return;
    shopifyInitialized = true;

    if (!Object.values(dom.products).some(el => el)) {
      console.warn('No product elements found');
      return;
    }

    cleanupOldCheckouts();

    try {
      await loadShopifySDK();
    } catch (error) {
      console.error('Shopify SDK error:', error.message);
      // Don't return - try to initialize anyway
    }

    // Check if SDK actually loaded
    if (!window.ShopifyBuy?.UI) {
      console.error('ShopifyBuy.UI not available - falling back to direct links');
      setupDirectCheckout();
      return;
    }

    try {
      const client = ShopifyBuy.buildClient({
        domain: config.domain,
        storefrontAccessToken: config.accessToken,
        language: config.language,
      });

      const checkoutKey = `${client.config.storefrontAccessToken}.${client.config.domain}.checkoutId`;

      client.checkout.create({ buyerIdentity: { countryCode: config.countryCode } })
        .then(checkout => {
          safeSetStorage(checkoutKey, checkout.id);

          ShopifyBuy.UI.onReady(client)
            .then(ui => {
              const deliverySpeed = typeof config.delivery.speed === 'function' 
                ? config.delivery.speed() 
                : config.delivery.speed;

              const options = {
                product: {
                  iframe: false,
                  contents: { img: false, button: false, buttonWithQuantity: true, title: false, price: false },
                  text: { button: config.buttonText, outOfStock: config.cart.outOfStock, unavailable: config.cart.unavailable }
                },
                cart: { iframe: false, text: config.cart, contents: { note: true }, popup: false },
                toggle: { iframe: false, sticky: false, templates: { icon: '' } }
              };

              Object.entries(config.productIds).forEach(([key, id]) => {
                const el = dom.products[key];
                if (!el) return;
                try {
                  ui.createComponent('product', {
                    id: [id],
                    node: el,
                    toggles: dom.cartToggle ? [{ node: dom.cartToggle }] : [],
                    moneyFormat: config.moneyFormat,
                    options
                  });
                } catch (e) {
                  console.error(`Failed to create ${key}:`, e);
                }
              });

              setupTracking(config.buttonText);
            })
            .catch(e => {
              console.error('Shopify UI error:', e);
              setupDirectCheckout();
            });
        })
        .catch(e => {
          console.error('Checkout creation error:', e);
          setupDirectCheckout();
        });
    } catch (e) {
      console.error('Shopify init error:', e);
      setupDirectCheckout();
    }
  };

  // Initialization
  const deliverySpeed = typeof config.delivery.speed === 'function' 
    ? config.delivery.speed() 
    : config.delivery.speed;

  if (dom.deliveryDate) dom.deliveryDate.textContent = deliverySpeed;
  updateDelivery(dom.navDeliveryTrashold, dom.deliveryTrashold, config.delivery.threshold);
  updateDelivery(dom.navDeliveryTime, dom.deliveryTime, deliverySpeed);

  if (config.hideUserMenu && dom.userMenu) {
    dom.userMenu.style.display = 'none';
  }
  if (config.hideAlzaButton && dom.alzaButton) {
    dom.alzaButton.style.display = 'none';
  }
  if (config.userBaseUrl) {
    updateUserLinks(config.userBaseUrl);
  }

  initializeShopify();

})();