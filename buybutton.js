const href = window.location.href;
const getLocale = () => {
  if (href.includes('en.meer.care')) return 'en';
  if (href.includes('sk.meer.care')) return 'sk';
  if (href.includes('de.meer.care')) return 'de';
  if (href.includes('fr.meer.care')) return 'fr';
  if (href.includes('pl.meer.care')) return 'pl';
  return 'cz'; // default
};

const locale = getLocale();

// - Date/time constants
const dayOfWeek = new Date().getDay();

// DOM elements
const deliveryTrashold = document.getElementById("delivery-treshold");
const deliveryTime = document.getElementById("delivery-speed");
const deliveryDate = document.getElementById("delivery-date");
const navDeliveryTrashold = document.getElementById("nav-delivery-treshold");
const navDeliveryTime = document.getElementById("nav-delivery-speed");
const userMenu = document.getElementById("user-menu");

// Utility function for updating multiple elements
const updateElements = (elements, text) => {
  elements.forEach(element => {
    if (element) element.textContent = text;
  });
};

// Helper function to update both nav and footer elements
const updateDeliveryElements = (navElement, footerElement, text) => {
  if (navElement) navElement.textContent = text;
  if (footerElement) footerElement.textContent = text;
};

const productElements = {
  setComplete: document.getElementById('buy-button-set-complete'),
  setI: document.getElementById('buy-button-set-I'),
  setII: document.getElementById('buy-button-set-II'),
  stepI: document.getElementById('buy-button-step-I'),
  stepII: document.getElementById('buy-button-step-II'),
  stepIII: document.getElementById('buy-button-step-III'),
  stepIV: document.getElementById('buy-button-step-IV'),
  giftCard: document.getElementById('buy-button-gift-card')
};

const cartToggle = document.getElementById("cart-toggle");

const userOrders = document.getElementById('user-orders');
const userLogin = document.getElementById('user-login');
const userCreateAccount = document.getElementById('user-create-account');
const userForgotPassword = document.getElementById('user-forgot-password');
const userAddresses = document.getElementById('user-addresses');

const alzaButton = document.getElementById('alza-button');
const freeShippingTags = document.querySelectorAll('.free-shipping-tag');

// Message constants
// Delivery Time
const deliveryMessageEN = "Fast Delivery";
const deliveryMessageSK = "Doručenie za 1-3 dni";
const deliveryMessageDE = "Lieferung in 2-3 Tagen";
const deliveryMessagePL = "Dostawa 1-3 dni";
const deliveryMessageFR = "Livraison en 2-5 jours";

// Free Delivery
//const deliveryMessageCZ = "Doprava zdarma od 1500Kč";
//const deliveryMessageCZ = "Rychlé odeslání";
const deliveryMessageCZ = "Doprava nyní ZDARMA";
//const deliveryMessageCZ = "Doprava DNES ZDARMA";
//const trasholdMessagePL = "Darmowa wysyłka od 200zł";
const trasholdMessagePL = "Teraz z DARMOWĄ WYSYŁKĄ";
const trasholdMessageEN = "Free Delivery from $50";
const trasholdMessageSK = "Doprava teraz ZADARMO";
//const trasholdMessageSK = "Doprava dnes ZADARMO";
//const trasholdMessageSK = "Doprava zadarmo od €30";
const trasholdMessageFR = "Frais de port offerts à partir de €60";
//const trasholdMessageDE = "Kostenloser Versand ab €60";
const trasholdMessageDE = "Jetzt kostenloser Versand";

// Configuration objects
const localeConfigs = {
  en: {
    domain: 'meer-care.myshopify.com',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
    language: 'en',
    countryCode: 'US',
    moneyFormat: '$%7B%7Bamount%7D%7D',
    buttonText: 'Add to Basket',
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
      title: "Cart",
      total: "Subtotal",
      empty: "Your cart is empty.",
      button: "Proceed to Checkout",
      noteDescription: "Order Note",
      notice: "Shipping and discount codes are added at checkout.",
      outOfStock: "Sold Out",
      unavailable: "Sold Out"
    }
  },
  sk: {
    domain: 'meer.sk',
    accessToken: '618933109ccee1040151ba599180cfef',
    language: 'sk',
    countryCode: 'SK',
    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
    buttonText: 'Pridať do košíka',
    productIds: {
      setComplete: 8592696639827,
      setI: 8592695624019,
      setII: 8592696541523,
      stepI: 8592695886163,
      stepII: 8592696115539,
      stepIII: 8592696279379,
      stepIV: 8592696475987,
      giftCard: 8592808051027
    },
    cart: {
      title: "Košík",
      total: "Celková čiastka",
      empty: "Momentálne nemáte v košíku vložený žiadny tovar.",
      button: "Pokračovať k pokladni",
      noteDescription: "Poznámka k objednávke",
      notice: "Doprava a zľavové kódy sa pridávajú pri pokladni.",
      outOfStock: "Vypredané",
      unavailable: "Vypredané"
    }
  },
  de: {
    domain: 'meercarede.cz',
    accessToken: '618933109ccee1040151ba599180cfef',
    language: 'de',
    countryCode: 'DE',
    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
    buttonText: 'In den Warenkorb',
    productIds: {
      setComplete: 9792222462291,
      setI: 9792209256787,
      setII: 9792221315411,
      stepI: 9792209650003,
      stepII: 9792209977683,
      stepIII: 9792218235219,
      stepIV: 9792220135763,
      giftCard: 8578704736581
    },
    cart: {
      title: "Warenkorb",
      total: "Zwischensumme",
      empty: "Ihr Warenkorb ist leer.",
      button: "Zur Kasse gehen",
      noteDescription: "Bestellnotiz",
      notice: "Versand und Rabattcodes werden an der Kasse hinzugefügt.",
      outOfStock: "Ausverkauft",
      unavailable: "Ausverkauft"
    }
  },
  fr: {
    domain: 'meercarefr.cz',
    accessToken: '618933109ccee1040151ba599180cfef',
    language: 'fr',
    countryCode: 'FR',
    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
    buttonText: 'Ajouter au panier',
    productIds: {
      setComplete: 10180475715923,
      setI: 10180474405203,
      setII: 10180482498899,
      stepI: 10180486824275,
      stepII: 10180486005075,
      stepIII: 10180484628819,
      stepIV: 10180484301139,
      giftCard: 8578704736581
    },
    cart: {
      title: "Panier",
      total: "Sous-total",
      empty: "Votre panier est vide.",
      button: "Procéder au paiement",
      noteDescription: "Note de commande",
      notice: "Les frais de livraison et les codes de réduction sont ajoutés lors du paiement.",
      outOfStock: "Épuisé",
      unavailable: "Épuisé"
    }
  },
  pl: {
    domain: 'meercarepl.cz',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
    language: 'pl',
    countryCode: 'PL',
    moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
    buttonText: 'Włożyć do koszyka',
    productIds: {
      setComplete: 15337577349445,
      setI: 15337570500933,
      setII: 15337576497477,
      stepI: 15337572991301,
      stepII: 15337573220677,
      stepIII: 15337574072645,
      stepIV: 15337575874885,
      giftCard: 8578704736581
    },
    cart: {
      title: "Koszyk",
      total: "Suma",
      empty: "Obecnie nie masz żadnych produktów w koszyku.",
      button: "Przejdź do finalizacji zakupu",
      noteDescription: "Uwaga do zamówienia",
      notice: "Koszty wysyłki i kody rabatowe są dodawane przy kasie.",
      outOfStock: "Sprzedany",
      unavailable: "Sprzedany"
    }
  },
  cz: {
    domain: 'meer.cz',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
    language: 'cs',
    countryCode: 'CZ',
    moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
    buttonText: 'Přidat do košíku',
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
      title: "Košík",
      total: "Mezisoučet",
      empty: "Váš košík je prázdný.",
      button: "Pokračovat k pokladně",
      noteDescription: "Poznámka k objednávce",
      notice: "Slevové kódy se přidávají u pokladny.",
      outOfStock: "Vyprodáno",
      unavailable: "Vyprodáno"
    }
  }
};

// 6. POTOM - Utility functions
const getLanguage = () => {
  const config = localeConfigs[locale];
  return config ? config.language : 'cs';
};

const getCountry = () => {
  const config = localeConfigs[locale];
  return config ? config.countryCode : 'CZ';
};

const getDomain = () => {
  const config = localeConfigs[locale];
  return config ? config.domain : 'meer-care.myshopify.com';
};

const getAccessToken = () => {
  const config = localeConfigs[locale];
  return config ? config.accessToken : 'd0790ee9d09c16714d92224efa9f5882';
};

const getButtonText = () => {
  const config = localeConfigs[locale];
  return config ? config.buttonText : 'Přidat do košíku';
};

const getCart = () => {
  const config = localeConfigs[locale];
  return config ? config.cart : {
    title: "Košík",
    total: "Mezisoučet",
    empty: "Váš košík je prázdný.",
    button: "Pokračovat k pokladně",
    noteDescription: "Poznámka k objednávce",
    notice: "Slevové kódy se přidávají u pokladny.",
    outOfStock: "Vyprodáno",
    unavailable: "Vyprodáno"
  };
};

const getMoneyFormat = () => {
  const config = localeConfigs[locale];
  return config ? config.moneyFormat : '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D';
};

const getProductIds = () => {
  const config = localeConfigs[locale];
  return config ? config.productIds : {
    setComplete: 8623720366405,
    setI: 7542825058534,
    setII: 8021842854118,
    stepI: 7601486758118,
    stepII: 7609802686694,
    stepIII: 7931357692134,
    stepIV: 7931360051430,
    giftCard: 8578704736581
  };
};

// Funkce pro vyčištění starých localStorage záznamů
const cleanupOldCheckouts = () => {
  try {
    // Najdi všechny klíče obsahující checkoutId
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('checkoutId')) {
        keysToRemove.push(key);
      }
    }
    
    // Odstraň staré klíče
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log('Cleaned up old checkout IDs from localStorage');
  } catch (error) {
    console.warn('Could not clean localStorage:', error);
  }
};

const loadHeurekaWidget = () => {
  console.log('loadHeurekaWidget called');
  
  // Najdi a odstraň starý Heureka script
  const existingScripts = document.querySelectorAll('script[src*="heureka"], script[src*="im9.cz"]');
  if (existingScripts.length > 0) {
    console.log('Found', existingScripts.length, 'existing Heureka scripts, removing them...');
    existingScripts.forEach(script => {
      script.remove();
      console.log('Removed old Heureka script:', script.src);
    });
  }
  
  // Vyčisti i starý widget element, pokud existuje
  const oldWidget = document.getElementById('hw-87kwowifjjowiklsadh666');
  if (oldWidget) {
    oldWidget.remove();
    console.log('Removed old Heureka widget element');
  }
  
  console.log('Loading new Heureka widget...');
  
  // Inicializace fronty před načtením scriptu
  window._hwq = window._hwq || [];
  console.log('_hwq initialized:', window._hwq);
  
  // Responzivní pozice podle velikosti obrazovky
  const isMobile = window.innerWidth <= 768;
  const topPosition = isMobile ? '80' : '152';
  console.log('Device:', isMobile ? 'mobile' : 'desktop', 'topPosition:', topPosition);
  
  // Přidání příkazů do fronty
  _hwq.push(['setKey', 'DE44F0D5D122B2322E7114114A9957A9']);
  _hwq.push(['setTopPos', topPosition]);
  _hwq.push(['showWidget']); // Bez parametru - zobrazí na všech zařízeních
  console.log('Commands pushed to _hwq:', _hwq);
  
  // Načtení scriptu - zkusíme nejdřív jsDelivr, pak fallback na Heureka CDN
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.jsdelivr.net/gh/Toooorch/meer@d16912119b4b5b26b9d03fdfb583105baa6a7060/heureka-widget.min.js';
  
  script.onload = () => {
    console.log('Heureka widget loaded successfully from jsDelivr');
  };
  
  script.onerror = () => {
    console.warn('Heureka widget from jsDelivr failed, trying original CDN');
    // Fallback na původní Heureka CDN
    const fallbackScript = document.createElement('script');
    fallbackScript.async = true;
    fallbackScript.src = 'https://cz.im9.cz/direct/i/gjs.php?n=wdgt&sak=DE44F0D5D122B2322E7114114A9957A9';
    
    fallbackScript.onload = () => {
      console.log('Heureka widget loaded successfully from original CDN');
    };
    
    fallbackScript.onerror = () => {
      console.error('Heureka widget failed to load from both CDNs');
    };
    
    document.head.appendChild(fallbackScript);
  };
  
  document.head.appendChild(script);
  console.log('New Heureka script added to head');
};

// 7. POTOM - Main functions
const setupTracking = (buttonText) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const buttons = node.querySelectorAll ? 
              node.querySelectorAll('.shopify-buy__btn:not([data-zaraz-tracked])') : 
              [];
            
            buttons.forEach(button => {
              if (button.textContent.includes(buttonText)) {
                button.setAttribute('data-zaraz-tracked', 'true');
                
                button.addEventListener('click', function() {
                  const shopifyWrapper = this.closest('.shopify-button');
                  
                  if (shopifyWrapper) {
                    const eventData = {
                      product_id: shopifyWrapper.getAttribute('data-product-id'),
                      product_name: shopifyWrapper.getAttribute('data-product-name'),
                      price: parseFloat(shopifyWrapper.getAttribute('data-price')),
                      quantity: 1
                    };
                    
                    if (typeof zaraz !== 'undefined') {
                      zaraz.track("add_to_cart", eventData);
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Cleanup po 30 sekundách
  setTimeout(() => observer.disconnect(), 30000);
};

const initializeShopify = () => {
  const currentConfig = localeConfigs[locale];
  if (!currentConfig) {
    console.error('Shopify config is missing for locale:', locale);
    return;
  }

  // Kontrola existence alespoň jednoho produktového elementu
  const hasAnyProductElement = Object.values(productElements).some(element => element !== null);
  if (!hasAnyProductElement) {
    console.log('No product elements found - skipping Shopify initialization');
    return;
  }

  // Kontrola základních elementů
  if (!cartToggle) {
    console.warn('Cart toggle element not found - buy buttons may not work properly');
  }

  // Vyčištění starých localStorage záznamů
  cleanupOldCheckouts();

  const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  
  if (window.ShopifyBuy?.UI) {
    ShopifyBuyInit();
    return;
  }
  
  if (!document.querySelector(`script[src="${scriptURL}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    script.onload = ShopifyBuyInit;
    script.onerror = () => console.error('Failed to load Shopify SDK');
    document.head.appendChild(script);
    
    // Timeout pro loading Shopify SDK
    setTimeout(() => {
      if (!window.ShopifyBuy) {
        console.error('Shopify SDK failed to load within 10 seconds timeout');
      }
    }, 10000);
  }
  
  function ShopifyBuyInit() {
    try {
      const client = ShopifyBuy.buildClient({
        domain: getDomain(),
        storefrontAccessToken: getAccessToken(),
        language: getLanguage(),
      });

      const input = {
        buyerIdentity: {
          countryCode: getCountry(),
        },
      };

      // Klíč pro localStorage
      const localStorageCheckoutKey = `${client.config.storefrontAccessToken}.${client.config.domain}.checkoutId`;
      console.log('Creating checkout for:', {
        locale,
        domain: client.config.domain,
        accessToken: client.config.storefrontAccessToken,
        language: getLanguage(),
        country: getCountry()
      });

      client.checkout.create(input).then((checkout) => {
        // Uložení checkout ID do localStorage
        try {
          localStorage.setItem(localStorageCheckoutKey, checkout.id);
          console.log('Checkout created successfully:', checkout.id);
        } catch (error) {
          console.warn('Could not save to localStorage:', error);
        }
        
        ShopifyBuy.UI.onReady(client).then(function (ui) {
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
                button: getButtonText(),
                outOfStock: getCart().outOfStock,
                unavailable: getCart().unavailable
              }
            },
            cart: {
              iframe: false,
              text: getCart(),
              contents: { note: true },
              popup: false
            },
            toggle: {
              iframe: false,
              sticky: false,
              templates: { icon: '' }
            }
          };

          // Vytvoření komponent s error handling
          Object.entries(getProductIds()).forEach(([key, productId]) => {
            const element = productElements[key];
            if (!element) {
              console.warn(`Element for ${key} (ID: buy-button-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}) not found`);
              return;
            }
            if (!cartToggle) {
              console.warn('Cart toggle element missing - component may not work properly');
            }
            
            try {
              ui.createComponent('product', {
                id: [productId],
                node: element,
                toggles: cartToggle ? [{node: cartToggle}] : [],
                moneyFormat: getMoneyFormat(),
                options: options
              });
              console.log(`Successfully created component for ${key}`);
            } catch (error) {
              console.error(`Failed to create Shopify component for ${key}:`, error);
            }
          });

          // Tracking s optimalizací
          setupTracking(getButtonText());
        }).catch(error => console.error('Shopify UI initialization failed:', error));
      }).catch(error => console.error('Shopify checkout creation failed:', error));
    } catch (error) {
      console.error('Shopify initialization failed:', error);
    }
  }
};

// 8. NAKONEC - Variables that depend on other calculations
let deliveryMessage;

// 9. EXECUTION - Switch statement na konci
console.log('Current locale:', locale);
switch (locale) {
  // English
  case 'en':
    console.log('Locale: English');
    if (deliveryDate) deliveryDate.textContent = deliveryMessageEN;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageEN);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageEN);

    // User
    if (userMenu) userMenu.style.display = 'none';

    initializeShopify();
    break;
  
  // Slovakia
  case 'sk':
    console.log('Locale: Slovakia - Heureka should load');
    if (deliveryDate) deliveryDate.textContent = deliveryMessageSK;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageSK);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageSK);

    // User links
    Object.assign(userOrders, {href: 'https://www.meer.beauty/account'});
    Object.assign(userLogin, {href: 'https://www.meer.beauty/account/login'});
    Object.assign(userCreateAccount, {href: 'https://www.meer.beauty/account/register'});
    Object.assign(userForgotPassword, {href: 'https://www.meer.beauty/account/login#recover'});
    Object.assign(userAddresses, {href: 'https://www.meer.beauty/account/addresses'});
    
    // Heureka widget
    loadHeurekaWidget();
    
    initializeShopify();
    break;
    
  // Germany
  case 'de':
    if (deliveryDate) deliveryDate.textContent = deliveryMessageDE;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageDE);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageDE);

    // Hide alza-button if it exists
    if (alzaButton) {
      alzaButton.style.display = 'none';
    }

    // User links
    Object.assign(userOrders, {href: 'https://www.meer.beauty/account'});
    Object.assign(userLogin, {href: 'https://www.meer.beauty/account/login'});
    Object.assign(userCreateAccount, {href: 'https://www.meer.beauty/account/register'});
    Object.assign(userForgotPassword, {href: 'https://www.meer.beauty/account/login#recover'});
    Object.assign(userAddresses, {href: 'https://www.meer.beauty/account/addresses'});

    initializeShopify();
    break;

  // France
  case 'fr':
    if (deliveryDate) deliveryDate.textContent = deliveryMessageFR;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageFR);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageFR);

    // User links
    Object.assign(userOrders, {href: 'https://www.meer.beauty/account'});
    Object.assign(userLogin, {href: 'https://www.meer.beauty/account/login'});
    Object.assign(userCreateAccount, {href: 'https://www.meer.beauty/account/register'});
    Object.assign(userForgotPassword, {href: 'https://www.meer.beauty/account/login#recover'});
    Object.assign(userAddresses, {href: 'https://www.meer.beauty/account/addresses'});

    initializeShopify();
    break;
  // Poland
  case 'pl':
    if (deliveryDate) deliveryDate.textContent = deliveryMessagePL;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessagePL);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessagePL);

    // User links
    Object.assign(userOrders, {href: 'https://meercarepl.cz/account'});
    Object.assign(userLogin, {href: 'https://meercarepl.cz/account/login'});
    Object.assign(userCreateAccount, {href: 'https://meercarepl.cz/account/register'});
    Object.assign(userForgotPassword, {href: 'https://meercarepl.cz/account/login#recover'});
    Object.assign(userAddresses, {href: 'https://meercarepl.cz/account/addresses'});

    initializeShopify();
    break;

  default:
    console.log('Locale: Default (Czech) - Heureka should load');
    const getDeliveryMessage = () => {
      const dayMessages = {
        1: "pozítří u Vás", // Mon
        2: "pozítří u Vás", // Tue  
        3: "pozítří u Vás", // Wed
        4: "v pondělí u Vás", // Thu
        5: "v úterý u Vás", // Fri
        6: "v úterý u Vás", // Sat
        0: "v úterý u Vás"  // Sun
      };
      return dayMessages[dayOfWeek] || "pozítří u Vás";
    };

    deliveryMessage = getDeliveryMessage();
    
    if (deliveryDate) deliveryDate.textContent = deliveryMessage;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, deliveryMessageCZ);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessage);

    loadHeurekaWidget();
    initializeShopify();
    break;
}