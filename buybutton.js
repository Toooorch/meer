(function() {
  'use strict';

  // ===== KONFIGURACE =====
  const localeMatch = window.location.href.match(/\/\/(en|sk|de|fr|pl)\.meer\./);
  const locale = localeMatch ? localeMatch[1] : 'cz';
  const dayOfWeek = new Date().getDay();

  // ===== LOCALE KONFIGS (minimalizovaná data) =====
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
      delivery: { 
        speed: () => {
          const msgs = ['pozítří u Vás', 'pozítří u Vás', 'pozítří u Vás', 'v pondělí u Vás', 'v úterý u Vás', 'v úterý u Vás', 'v úterý u Vás'];
          return msgs[dayOfWeek];
        },
        threshold: "Doprava nyní ZDARMA"
      },
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

  const config = localeConfigs[locale] || localeConfigs.cz;
  const checkoutBaseURL = `https://${config.domain}/cart/`;

  // ===== HELPER FUNKCE =====
  const getCacheKey = key => `sb_${locale}_${key}`;
  
  const safeStorage = {
    set: (key, value) => {
      try {
        sessionStorage.setItem(getCacheKey(key), value);
      } catch (e) {
        // Silent fail
      }
    },
    get: (key) => {
      try {
        return sessionStorage.getItem(getCacheKey(key));
      } catch (e) {
        return null;
      }
    }
  };

  const getEl = id => document.getElementById(id);

  // ===== IHNED VYTVOŘ FALLBACK BUTTONY (paralelně s SDK) =====
  const createFallbackButton = (productId, buttonText) => {
    const btn = document.createElement('button');
    btn.textContent = buttonText;
    btn.className = 'shopify-fallback-btn';
    btn.style.cssText = `
      padding: 10px 20px;
      background: #000;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 14px;
      border-radius: 4px;
      width: 100%;
      font-weight: 600;
      transition: background 0.2s;
    `;
    btn.onmouseover = () => btn.style.background = '#222';
    btn.onmouseout = () => btn.style.background = '#000';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `${checkoutBaseURL}${productId}:1`;
    });
    return btn;
  };

  const setupFallbackButtons = () => {
    Object.entries(config.productIds).forEach(([key, productId]) => {
      const el = getEl(`buy-button-${key}`);
      if (el && !el.querySelector('button')) {
        el.appendChild(createFallbackButton(productId, config.buttonText));
      }
    });
  };

  // ===== PRIORITA 1: Ihned nastav fallback buttony (< 1ms) =====
  setupFallbackButtons();
  console.log('[Shopify] Fallback buttons created');

  // ===== PRIORITA 2: Načti a cachuj SDK paralelně =====
  let sdkPromise = null;
  const getSDK = () => {
    if (window.ShopifyBuy?.UI) {
      return Promise.resolve();
    }
    
    if (!sdkPromise) {
      sdkPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

        const loadTimeout = setTimeout(() => {
          // Timeout - fallback buttony se už nastavily
          resolve();
        }, 3000);

        script.onload = () => {
          clearTimeout(loadTimeout);
          resolve();
        };

        script.onerror = () => {
          clearTimeout(loadTimeout);
          resolve();
        };

        document.head.appendChild(script);
      });
    }
    
    return sdkPromise;
  };

  // Spusť SDK load hned na pozadí
  console.log('[Shopify] SDK loading started');
  getSDK();

  // ===== PRIORITA 3: Inicializuj Shopify když je SDK ready =====
  let shopifyReady = false;

  const initShopify = async () => {
    if (shopifyReady) return;
    shopifyReady = true;

    if (!window.ShopifyBuy?.UI) {
      // SDK nenačten - fallback buttony už fungují
      console.warn('[Shopify] SDK not available, fallback buttons active');
      return;
    }

    console.log('[Shopify] SDK loaded, initializing...');

    try {
      const client = ShopifyBuy.buildClient({
        domain: config.domain,
        storefrontAccessToken: config.accessToken,
        language: config.language,
      });

      const checkout = await client.checkout.create({
        buyerIdentity: { countryCode: config.countryCode }
      });

      safeStorage.set('checkoutId', checkout.id);
      console.log('[Shopify] Checkout created:', checkout.id);

      ShopifyBuy.UI.onReady(client).then(ui => {
        const deliverySpeed = typeof config.delivery.speed === 'function' 
          ? config.delivery.speed() 
          : config.delivery.speed;

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

        // Vytvoř komponenty pro každý produkt
        let successCount = 0;
        Object.entries(config.productIds).forEach(([key, productId]) => {
          const el = getEl(`buy-button-${key}`);
          if (el) {
            try {
              // Vymaž fallback button
              const fallback = el.querySelector('.shopify-fallback-btn');
              if (fallback) fallback.remove();

              ui.createComponent('product', {
                id: [productId],
                node: el,
                moneyFormat: config.moneyFormat,
                options
              });
              successCount++;
            } catch (e) {
              // Chyba - fallback button zůstane
              console.debug(`[Shopify] Failed to create component for ${key}`);
            }
          }
        });
        console.log(`[Shopify] ${successCount} components created successfully`);
      }).catch((err) => {
        // UI error - fallback buttony už fungují
        console.warn('[Shopify] UI initialization failed, fallback buttons active', err);
      });
    } catch (e) {
      // Checkout error - fallback buttony už fungují
      console.warn('[Shopify] Initialization error, fallback buttons active', e);
    }
  };

  // Spusť Shopify když je SDK ready
  if (window.ShopifyBuy?.UI) {
    initShopify();
  } else {
    // Poslouchej na SDK
    const checkSDK = setInterval(() => {
      if (window.ShopifyBuy?.UI) {
        clearInterval(checkSDK);
        console.log('[Shopify] SDK ready, initializing');
        initShopify();
      }
    }, 100);

    // Max 10 sekund
    setTimeout(() => {
      clearInterval(checkSDK);
      if (!window.ShopifyBuy?.UI) {
        console.warn('[Shopify] SDK timeout after 10s, fallback buttons active');
      }
    }, 10000);
  }

  // ===== UI SETUP =====
  const deliverySpeed = typeof config.delivery.speed === 'function' 
    ? config.delivery.speed() 
    : config.delivery.speed;

  const deliveryDate = getEl("delivery-date");
  if (deliveryDate) deliveryDate.textContent = deliverySpeed;

  [
    { nav: getEl("nav-delivery-treshold"), footer: getEl("delivery-treshold"), text: config.delivery.threshold },
    { nav: getEl("nav-delivery-time"), footer: getEl("delivery-speed"), text: deliverySpeed }
  ].forEach(({ nav, footer, text }) => {
    if (nav) nav.textContent = text;
    if (footer) footer.textContent = text;
  });

  if (config.hideUserMenu && getEl("user-menu")) {
    getEl("user-menu").style.display = 'none';
  }

  if (config.hideAlzaButton && getEl("alza-button")) {
    getEl("alza-button").style.display = 'none';
  }

  if (config.userBaseUrl) {
    const links = {
      'user-orders': '/account',
      'user-login': '/account/login',
      'user-create-account': '/account/register',
      'user-forgot-password': '/account/login#recover',
      'user-addresses': '/account/addresses'
    };
    Object.entries(links).forEach(([id, path]) => {
      const el = getEl(id);
      if (el) el.href = `${config.userBaseUrl}${path}`;
    });
  }

})();