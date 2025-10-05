// Cache href for performance
const href = window.location.href;
const getLocale = (() => {
  // Cache locale result to avoid repeated calculations
  let cachedLocale = null;
  return () => {
    if (cachedLocale) return cachedLocale;
    
    if (href.includes('en.meer.care')) return cachedLocale = 'en';
    if (href.includes('sk.meer.care')) return cachedLocale = 'sk';
    if (href.includes('de.meer.care')) return cachedLocale = 'de';
    if (href.includes('fr.meer.care')) return cachedLocale = 'fr';
    if (href.includes('pl.meer.care')) return cachedLocale = 'pl';
    return cachedLocale = 'cz'; // default
  };
})();

const locale = getLocale();

// Date/time constants
const dayOfWeek = new Date().getDay();

// Optimized timeout constants
const TIMEOUTS = {
  OBSERVER_CLEANUP: 30000,
  SHOPIFY_SDK_LOAD: 8000,   // Reduced for faster feedback
  DOM_READY_CHECK: 50,      // Reduced interval for faster DOM checks
  MAX_DOM_WAIT: 3000,       // Reduced max wait time
  RETRY_DELAY: 500,         // Faster retry attempts
  MAX_RETRIES: 2,           // Fewer retries for faster failure detection
  DEBOUNCE_DELAY: 250       // Debouncing for performance
};

// Optimized DOM element caching with lazy loading
const domCache = new Map();
const getElement = (id) => {
  if (!domCache.has(id)) {
    domCache.set(id, document.getElementById(id));
  }
  return domCache.get(id);
};

// Critical DOM elements - loaded immediately
const deliveryTrashold = getElement("delivery-treshold");
const deliveryTime = getElement("delivery-speed");
const deliveryDate = getElement("delivery-date");
const navDeliveryTrashold = getElement("nav-delivery-treshold");
const navDeliveryTime = getElement("nav-delivery-speed");
const userMenu = getElement("user-menu");

// Utility function for updating multiple elements with performance optimization
const updateElements = (elements, text) => {
  // Use requestAnimationFrame for smooth DOM updates
  requestAnimationFrame(() => {
    elements.forEach(element => {
      if (element && element.textContent !== text) {
        element.textContent = text;
      }
    });
  });
};

// Optimized helper function with batched updates
const updateDeliveryElements = (navElement, footerElement, text) => {
  requestAnimationFrame(() => {
    if (navElement && navElement.textContent !== text) navElement.textContent = text;
    if (footerElement && footerElement.textContent !== text) footerElement.textContent = text;
  });
};

// Lazy-loaded product elements with caching
const productElements = {
  get setComplete() { return getElement('buy-button-set-complete'); },
  get setI() { return getElement('buy-button-set-I'); },
  get setII() { return getElement('buy-button-set-II'); },
  get stepI() { return getElement('buy-button-step-I'); },
  get stepII() { return getElement('buy-button-step-II'); },
  get stepIII() { return getElement('buy-button-step-III'); },
  get stepIV() { return getElement('buy-button-step-IV'); },
  get giftCard() { return getElement('buy-button-gift-card'); }
};

// Other DOM elements - lazy loaded
const getCartToggle = () => getElement("cart-toggle");
const getUserOrders = () => getElement('user-orders');
const getUserLogin = () => getElement('user-login');
const getUserCreateAccount = () => getElement('user-create-account');
const getUserForgotPassword = () => getElement('user-forgot-password');
const getUserAddresses = () => getElement('user-addresses');
const getAlzaButton = () => getElement('alza-button');

// Cache free shipping tags query
let freeShippingTags = null;
const getFreeShippingTags = () => {
  if (!freeShippingTags) {
    freeShippingTags = document.querySelectorAll('.free-shipping-tag');
  }
  return freeShippingTags;
};

// Message constants
// Delivery Time Messages
const deliveryMessageEN = "Fast Delivery";
const deliveryMessageSK = "Doručenie za 1-3 dni";
const deliveryMessageDE = "Lieferung in 2-3 Tagen";
const deliveryMessagePL = "Dostawa 1-3 dni";
const deliveryMessageFR = "Livraison en 2-5 jours";

// Free Delivery Messages
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

// Cache current locale config for performance
const currentLocaleConfig = localeConfigs[locale] || localeConfigs.cz;

// Optimized utility functions with caching
const getLanguage = () => currentLocaleConfig.language;
const getCountry = () => currentLocaleConfig.countryCode;
const getDomain = () => currentLocaleConfig.domain;
const getAccessToken = () => currentLocaleConfig.accessToken;
const getButtonText = () => currentLocaleConfig.buttonText;
const getCart = () => currentLocaleConfig.cart;
const getMoneyFormat = () => currentLocaleConfig.moneyFormat;
const getProductIds = () => currentLocaleConfig.productIds;

// Optimized function for waiting for DOM elements with performance improvements
const waitForElements = async (selectors, maxWait = TIMEOUTS.MAX_DOM_WAIT) => {
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    if (!Array.isArray(selectors) || selectors.length === 0) {
      reject(new Error('Invalid selectors provided to waitForElements'));
      return;
    }
    
    // Use Set for O(1) lookup performance
    const pendingSelectors = new Set(selectors);
    const foundElements = new Map();
    
    const checkElements = () => {
      try {
        // Only check pending selectors for better performance
        for (const selector of pendingSelectors) {
          const element = getElement(selector);
          if (element) {
            foundElements.set(selector, element);
            pendingSelectors.delete(selector);
          }
        }
        
        // Early termination when all elements found
        if (pendingSelectors.size === 0) {
          resolve(selectors.map(selector => foundElements.get(selector)));
          return;
        }
        
        if ((Date.now() - startTime) >= maxWait) {
          console.warn(`Timeout waiting for elements: ${Array.from(pendingSelectors).join(', ')}`);
          resolve(selectors.map(selector => foundElements.get(selector) || null));
          return;
        }
        
        setTimeout(checkElements, TIMEOUTS.DOM_READY_CHECK);
      } catch (error) {
        console.error('Error in waitForElements:', error);
        reject(error);
      }
    };
    
    checkElements();
  });
};

// Optimized Shopify SDK preloading with performance improvements
const preloadShopifySDK = (() => {
  let isLoading = false;
  let isLoaded = false;
  
  return (retryCount = 0) => {
    if (isLoaded || isLoading) return;
    
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    
    if (window.ShopifyBuy) {
      isLoaded = true;
      return;
    }
    
    if (!document.querySelector(`script[src="${scriptURL}"]`)) {
      isLoading = true;
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      
      script.onerror = () => {
        isLoading = false;
        console.error(`Failed to preload Shopify SDK (attempt ${retryCount + 1})`);
        if (retryCount < TIMEOUTS.MAX_RETRIES) {
          setTimeout(() => {
            script.remove();
            preloadShopifySDK(retryCount + 1);
          }, TIMEOUTS.RETRY_DELAY * (retryCount + 1));
        } else {
          console.error('Max retries reached for Shopify SDK preload');
        }
      };
      
      script.onload = () => {
        isLoaded = true;
        isLoading = false;
        console.log('Shopify SDK preloaded successfully');
      };
      
      document.head.appendChild(script);
      console.log(`Shopify SDK preloading started (attempt ${retryCount + 1})`);
    }
  };
})();

// Function to clean up old localStorage records with improved error handling
const cleanupOldCheckouts = () => {
  try {
    if (typeof Storage === 'undefined') {
      console.warn('localStorage is not available');
      return;
    }
    
    // Find all keys containing checkoutId
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('checkoutId')) {
        keysToRemove.push(key);
      }
    }
    
    // Remove old keys with individual error handling
    let removedCount = 0;
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
        removedCount++;
      } catch (error) {
        console.warn(`Failed to remove localStorage key: ${key}`, error);
      }
    });
    
    console.log(`Cleaned up ${removedCount} old checkout IDs from localStorage`);
  } catch (error) {
    console.warn('Could not clean localStorage:', error);
  }
};

const loadHeurekaWidget = () => {
  try {
    if (!document.querySelector('script[src*="heureka"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://cz.im9.cz/direct/i/gjs.php?n=wdgt&sak=DE44F0D5D122B2322E7114114A9957A9';
      
      script.onerror = () => {
        console.warn('Failed to load Heureka widget');
      };
      
      script.onload = () => {
        console.log('Heureka widget loaded successfully');
      };
      
      document.head.appendChild(script);
      
      window._hwq = window._hwq || [];
      _hwq.push(['setKey', 'DE44F0D5D122B2322E7114114A9957A9']);
      _hwq.push(['setTopPos', '152']);
      _hwq.push(['showWidget', '21']);
    }
  } catch (error) {
    console.error('Error loading Heureka widget:', error);
  }
};

// Optimized analytics and tracking setup with performance improvements
const setupTracking = (buttonText) => {
  try {
    // Debounced tracking function for better performance
    const trackedButtons = new WeakSet();
    
    const processButton = (button) => {
      if (trackedButtons.has(button)) return;
      
      try {
        if (button.textContent && button.textContent.includes(buttonText)) {
          button.setAttribute('data-zaraz-tracked', 'true');
          trackedButtons.add(button);
          
          button.addEventListener('click', function() {
            try {
              const shopifyWrapper = this.closest('.shopify-button');
              
              if (shopifyWrapper) {
                const eventData = {
                  product_id: shopifyWrapper.getAttribute('data-product-id'),
                  product_name: shopifyWrapper.getAttribute('data-product-name'),
                  price: parseFloat(shopifyWrapper.getAttribute('data-price')) || 0,
                  quantity: 1
                };
                
                if (typeof zaraz !== 'undefined') {
                  zaraz.track("add_to_cart", eventData);
                  console.log('Tracking event sent:', eventData);
                } else {
                  console.warn('Zaraz tracking not available');
                }
              }
            } catch (error) {
              console.error('Error in tracking click handler:', error);
            }
          }, { passive: true }); // Use passive listener for better performance
        }
      } catch (error) {
        console.error('Error processing button for tracking:', error);
      }
    };
    
    // Debounced mutation handler
    let debounceTimer;
    const debouncedHandler = (mutations) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const buttonsToProcess = [];
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1) {
                const buttons = node.querySelectorAll ? 
                  node.querySelectorAll('.shopify-buy__btn:not([data-zaraz-tracked])') : 
                  [];
                buttonsToProcess.push(...buttons);
              }
            });
          }
        });
        
        // Process buttons in batches for better performance
        requestAnimationFrame(() => {
          buttonsToProcess.forEach(processButton);
        });
      }, TIMEOUTS.DEBOUNCE_DELAY);
    };
    
    const observer = new MutationObserver(debouncedHandler);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Cleanup after defined timeout
    setTimeout(() => {
      try {
        observer.disconnect();
        clearTimeout(debounceTimer);
        console.log('Tracking observer cleaned up');
      } catch (error) {
        console.error('Error disconnecting tracking observer:', error);
      }
    }, TIMEOUTS.OBSERVER_CLEANUP);
    
  } catch (error) {
    console.error('Error setting up tracking:', error);
  }
};

const initializeShopify = async () => {
  try {
    if (!currentLocaleConfig) {
      console.error('Shopify config is missing for locale:', locale);
      return;
    }

    // Quick check using lazy-loaded elements
    const hasAnyProductElement = Object.keys(productElements).some(key => {
      const element = productElements[key];
      return element !== null;
    });
    
    if (!hasAnyProductElement) {
      console.log('No product elements found initially - waiting for DOM...');
      
      try {
        // Attempt to wait for product elements
        const productElementIds = Object.keys(productElements).map(key => 
          `buy-button-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        );
        
        await waitForElements(productElementIds, TIMEOUTS.MAX_DOM_WAIT);
        
        // Final check after waiting
        const hasAnyProductElementFinal = Object.keys(productElements).some(key => {
          return productElements[key] !== null;
        });
        
        if (!hasAnyProductElementFinal) {
          console.log('No product elements found after waiting - skipping Shopify initialization');
          return;
        }
      } catch (error) {
        console.error('Error waiting for product elements:', error);
        return;
      }
    }

    // Clean up old localStorage records
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
    
    // Timeout for loading Shopify SDK
    setTimeout(() => {
      if (!window.ShopifyBuy) {
        console.error(`Shopify SDK failed to load within ${TIMEOUTS.SHOPIFY_SDK_LOAD / 1000} seconds timeout`);
      }
    }, TIMEOUTS.SHOPIFY_SDK_LOAD);
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

      // localStorage key
      const localStorageCheckoutKey = `${client.config.storefrontAccessToken}.${client.config.domain}.checkoutId`;
      console.log('Creating checkout for:', {
        locale,
        domain: client.config.domain,
        accessToken: client.config.storefrontAccessToken,
        language: getLanguage(),
        country: getCountry()
      });

      client.checkout.create(input).then((checkout) => {
        // Save checkout ID to localStorage
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

          // Create components with optimized error handling
          const productIds = getProductIds();
          const cartToggle = getCartToggle();
          
          Object.entries(productIds).forEach(([key, productId]) => {
            const element = productElements[key];
            if (!element) {
              console.warn(`Element for ${key} not found`);
              return;
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

          // Optimized tracking setup
          setupTracking(getButtonText());
        }).catch(error => console.error('Shopify UI initialization failed:', error));
      }).catch(error => console.error('Shopify checkout creation failed:', error));
    } catch (error) {
      console.error('Shopify initialization failed:', error);
    }
  }
  } catch (error) {
    console.error('Critical error in initializeShopify:', error);
  }
};

// Preload Shopify SDK immediately on script load
preloadShopifySDK();

// Variables that depend on other calculations
let deliveryMessage;

// Main execution - Locale-specific initialization
switch (locale) {
  // English
  case 'en':
    if (deliveryDate) deliveryDate.textContent = deliveryMessageEN;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageEN);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageEN);

    // User menu optimization
    const userMenuEl = userMenu;
    if (userMenuEl) userMenuEl.style.display = 'none';

    // Asynchronous initialization with error handling
    initializeShopify().catch(error => console.error('Shopify initialization failed for EN locale:', error));
    break;
  
  // Slovakia
  case 'sk':
    if (deliveryDate) deliveryDate.textContent = deliveryMessageSK;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageSK);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageSK);

    // User links - optimized with lazy loading
    const userOrders = getUserOrders();
    const userLogin = getUserLogin();
    const userCreateAccount = getUserCreateAccount();
    const userForgotPassword = getUserForgotPassword();
    const userAddresses = getUserAddresses();
    
    if (userOrders) userOrders.href = 'https://www.meer.beauty/account';
    if (userLogin) userLogin.href = 'https://www.meer.beauty/account/login';
    if (userCreateAccount) userCreateAccount.href = 'https://www.meer.beauty/account/register';
    if (userForgotPassword) userForgotPassword.href = 'https://www.meer.beauty/account/login#recover';
    if (userAddresses) userAddresses.href = 'https://www.meer.beauty/account/addresses';
    
    loadHeurekaWidget();
    
    // Asynchronous initialization with error handling
    initializeShopify().catch(error => console.error('Shopify initialization failed for SK locale:', error));
    break;
    
  // Germany
  case 'de':
    if (deliveryDate) deliveryDate.textContent = deliveryMessageDE;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageDE);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageDE);

    // Hide alza-button if it exists
    const alzaButton = getAlzaButton();
    if (alzaButton) alzaButton.style.display = 'none';

    // User links - optimized with lazy loading
    const userOrdersDE = getUserOrders();
    const userLoginDE = getUserLogin();
    const userCreateAccountDE = getUserCreateAccount();
    const userForgotPasswordDE = getUserForgotPassword();
    const userAddressesDE = getUserAddresses();
    
    if (userOrdersDE) userOrdersDE.href = 'https://www.meer.beauty/account';
    if (userLoginDE) userLoginDE.href = 'https://www.meer.beauty/account/login';
    if (userCreateAccountDE) userCreateAccountDE.href = 'https://www.meer.beauty/account/register';
    if (userForgotPasswordDE) userForgotPasswordDE.href = 'https://www.meer.beauty/account/login#recover';
    if (userAddressesDE) userAddressesDE.href = 'https://www.meer.beauty/account/addresses';

    // Asynchronous initialization with error handling
    initializeShopify().catch(error => console.error('Shopify initialization failed for DE locale:', error));
    break;

  // France
  case 'fr':
    if (deliveryDate) deliveryDate.textContent = deliveryMessageFR;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageFR);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageFR);

    // User links - optimized with lazy loading
    const userOrdersFR = getUserOrders();
    const userLoginFR = getUserLogin();
    const userCreateAccountFR = getUserCreateAccount();
    const userForgotPasswordFR = getUserForgotPassword();
    const userAddressesFR = getUserAddresses();
    
    if (userOrdersFR) userOrdersFR.href = 'https://www.meer.beauty/account';
    if (userLoginFR) userLoginFR.href = 'https://www.meer.beauty/account/login';
    if (userCreateAccountFR) userCreateAccountFR.href = 'https://www.meer.beauty/account/register';
    if (userForgotPasswordFR) userForgotPasswordFR.href = 'https://www.meer.beauty/account/login#recover';
    if (userAddressesFR) userAddressesFR.href = 'https://www.meer.beauty/account/addresses';

    // Asynchronous initialization with error handling
    initializeShopify().catch(error => console.error('Shopify initialization failed for FR locale:', error));
    break;
    
  // Poland
  case 'pl':
    if (deliveryDate) deliveryDate.textContent = deliveryMessagePL;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessagePL);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessagePL);

    // User links - optimized with lazy loading
    const userOrdersPL = getUserOrders();
    const userLoginPL = getUserLogin();
    const userCreateAccountPL = getUserCreateAccount();
    const userForgotPasswordPL = getUserForgotPassword();
    const userAddressesPL = getUserAddresses();
    
    if (userOrdersPL) userOrdersPL.href = 'https://meercarepl.cz/account';
    if (userLoginPL) userLoginPL.href = 'https://meercarepl.cz/account/login';
    if (userCreateAccountPL) userCreateAccountPL.href = 'https://meercarepl.cz/account/register';
    if (userForgotPasswordPL) userForgotPasswordPL.href = 'https://meercarepl.cz/account/login#recover';
    if (userAddressesPL) userAddressesPL.href = 'https://meercarepl.cz/account/addresses';

    // Asynchronous initialization with error handling
    initializeShopify().catch(error => console.error('Shopify initialization failed for PL locale:', error));
    break;

  default:
    const getDeliveryMessage = () => {
      const dayMessages = {
        1: "pozítří u Vás", // Monday
        2: "pozítří u Vás", // Tuesday  
        3: "pozítří u Vás", // Wednesday
        4: "v pondělí u Vás", // Thursday
        5: "v úterý u Vás", // Friday
        6: "v úterý u Vás", // Saturday
        0: "v úterý u Vás"  // Sunday
      };
      return dayMessages[dayOfWeek] || "pozítří u Vás";
    };

    deliveryMessage = getDeliveryMessage();
    
    if (deliveryDate) deliveryDate.textContent = deliveryMessage;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, deliveryMessageCZ);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessage);

    loadHeurekaWidget();
    
    // Asynchronous initialization with error handling
    initializeShopify().catch(error => console.error('Shopify initialization failed for CZ locale:', error));
    break;
}
