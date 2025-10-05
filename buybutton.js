// Cache href for performance
const href = window.location.href;
const getLocale = (() => {
  let cachedLocale = null;
  return () => {
    if (cachedLocale) return cachedLocale;
    
    if (href.includes('en.meer.care')) return cachedLocale = 'en';
    if (href.includes('sk.meer.care')) return cachedLocale = 'sk';
    if (href.includes('de.meer.care')) return cachedLocale = 'de';
    if (href.includes('fr.meer.care')) return cachedLocale = 'fr';
    if (href.includes('pl.meer.care')) return cachedLocale = 'pl';
    return cachedLocale = 'cz';
  };
})();

const locale = getLocale();
console.log('Detected locale:', locale, 'for URL:', href);

// Tracking system initialization with fallback
const initializeTracking = () => {
  if (typeof zaraz !== 'undefined' && zaraz.track) {
    console.log('Zaraz tracking available');
    return zaraz;
  }
  
  console.warn('Zaraz not available, using fallback tracking');
  
  // Don't override global zaraz - just provide fallback tracking function
  return {
    track: (event, data) => {
      console.log('Fallback tracking:', event, data);
      
      if (typeof gtag !== 'undefined') {
        try {
          gtag('event', event, { custom_parameters: data });
          console.log('Sent via gtag:', event);
        } catch (error) {
          console.warn('gtag failed:', error);
        }
      } else if (typeof dataLayer !== 'undefined') {
        try {
          dataLayer.push({ event, ...data });
          console.log('Sent via dataLayer:', event);
        } catch (error) {
          console.warn('dataLayer failed:', error);
        }
      } else {
        console.log('Tracking event (no analytics available):', { event, data });
      }
    }
  };
};

// Get tracking system reference
const trackingSystem = initializeTracking();

// Date/time constants
const dayOfWeek = new Date().getDay();

// Optimized timeout constants
const TIMEOUTS = {
  OBSERVER_CLEANUP: null, // Don't auto-cleanup, clean on unload
  SHOPIFY_SDK_LOAD: 8000,
  DOM_READY_CHECK: 50,
  MAX_DOM_WAIT: 3000,
  RETRY_DELAY: 500,
  MAX_RETRIES: 2,
  DEBOUNCE_DELAY: 250
};

// Improved DOM element caching - doesn't cache null values
const domCache = new Map();
const getElement = (id) => {
  if (domCache.has(id)) {
    return domCache.get(id);
  }
  const element = document.getElementById(id);
  if (element) {
    domCache.set(id, element);
  }
  return element;
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
const deliveryMessageEN = "Fast Delivery";
const deliveryMessageSK = "Doručenie za 1-3 dni";
const deliveryMessageDE = "Lieferung in 2-3 Tagen";
const deliveryMessagePL = "Dostawa 1-3 dni";
const deliveryMessageFR = "Livraison en 2-5 jours";

const deliveryMessageCZ = "Doprava nyní ZDARMA";
const trasholdMessagePL = "Teraz z DARMOWĄ WYSYŁKĄ";
const trasholdMessageEN = "Free Delivery from $50";
const trasholdMessageSK = "Doprava teraz ZADARMO";
const trasholdMessageFR = "Frais de port offerts à partir de €60";
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
      stepIIII: 7931357692134,
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

// Validate configuration
const validateConfig = (config) => {
  if (!config) return false;
  const required = ['domain', 'accessToken', 'language', 'countryCode', 'productIds', 'cart', 'buttonText'];
  return required.every(key => config[key] !== undefined && config[key] !== null);
};

// Cache current locale config with validation
const currentLocaleConfig = (() => {
  const config = localeConfigs[locale] || localeConfigs.cz;
  if (!validateConfig(config)) {
    console.error('Invalid configuration for locale:', locale);
    return null;
  }
  return config;
})();

// Optimized utility functions with caching
const getLanguage = () => currentLocaleConfig?.language || 'cs';
const getCountry = () => currentLocaleConfig?.countryCode || 'CZ';
const getDomain = () => currentLocaleConfig?.domain || 'meer-care.myshopify.com';
const getAccessToken = () => currentLocaleConfig?.accessToken || 'd0790ee9d09c16714d92224efa9f5882';
const getButtonText = () => currentLocaleConfig?.buttonText || 'Přidat do košíku';
const getCart = () => currentLocaleConfig?.cart || localeConfigs.cz.cart;
const getMoneyFormat = () => currentLocaleConfig?.moneyFormat || '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D';
const getProductIds = () => currentLocaleConfig?.productIds || localeConfigs.cz.productIds;

// Improved waitForElements with better timeout handling
const waitForElements = async (selectors, maxWait = TIMEOUTS.MAX_DOM_WAIT) => {
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    if (!Array.isArray(selectors) || selectors.length === 0) {
      reject(new Error('Invalid selectors provided to waitForElements'));
      return;
    }
    
    const pendingSelectors = new Set(selectors);
    const foundElements = new Map();
    
    const checkElements = () => {
      try {
        for (const selector of pendingSelectors) {
          const element = getElement(selector);
          if (element) {
            foundElements.set(selector, element);
            pendingSelectors.delete(selector);
          }
        }
        
        if (pendingSelectors.size === 0) {
          resolve(selectors.map(selector => foundElements.get(selector)));
          return;
        }
        
        if ((Date.now() - startTime) >= maxWait) {
          const missing = Array.from(pendingSelectors);
          console.warn(`Timeout waiting for elements. Missing: ${missing.join(', ')}`);
          // Return partial results with info about missing elements
          resolve({
            elements: selectors.map(selector => foundElements.get(selector) || null),
            missing: missing,
            partial: true
          });
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

// Improved Shopify SDK preloading with better race condition handling
const preloadShopifySDK = (() => {
  let loadPromise = null;
  
  return () => {
    if (loadPromise) return loadPromise;
    if (window.ShopifyBuy) {
      return Promise.resolve();
    }
    
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    
    if (document.querySelector(`script[src="${scriptURL}"]`)) {
      loadPromise = new Promise((resolve) => {
        const checkLoaded = () => {
          if (window.ShopifyBuy) {
            resolve();
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
      });
      return loadPromise;
    }
    
    loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      
      const cleanup = () => {
        script.removeEventListener('load', onLoad);
        script.removeEventListener('error', onError);
      };
      
      const onLoad = () => {
        cleanup();
        console.log('Shopify SDK preloaded successfully');
        resolve();
      };
      
      const onError = (error) => {
        cleanup();
        loadPromise = null; // Reset so retry is possible
        console.error('Failed to preload Shopify SDK:', error);
        reject(error);
      };
      
      script.addEventListener('load', onLoad);
      script.addEventListener('error', onError);
      
      try {
        document.head.appendChild(script);
        console.log('Shopify SDK preloading started');
      } catch (error) {
        cleanup();
        loadPromise = null;
        reject(error);
      }
      
      // Timeout handling
      setTimeout(() => {
        if (!window.ShopifyBuy) {
          cleanup();
          const timeoutError = new Error('Shopify SDK load timeout');
          reject(timeoutError);
        }
      }, TIMEOUTS.SHOPIFY_SDK_LOAD);
    });
    
    return loadPromise;
  };
})();

// Improved localStorage cleanup with specific key format validation
const cleanupOldCheckouts = () => {
  try {
    if (typeof Storage === 'undefined') {
      console.warn('localStorage is not available');
      return;
    }
    
    const accessToken = getAccessToken();
    const domain = getDomain();
    const validKeyPattern = new RegExp(`^${accessToken}\\.${domain}\\.checkoutId$`);
    
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && validKeyPattern.test(key)) {
        keysToRemove.push(key);
      }
    }
    
    let removedCount = 0;
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
        removedCount++;
      } catch (error) {
        console.warn(`Failed to remove localStorage key: ${key}`, error);
      }
    });
    
    if (removedCount > 0) {
      console.log(`Cleaned up ${removedCount} old checkout IDs from localStorage`);
    }
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

// Improved tracking setup with proper cleanup
const setupTracking = (buttonText) => {
  try {
    const trackedButtons = new WeakSet();
    let debounceTimer = null;
    let observer = null;
    
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
                
                try {
                  trackingSystem.track("add_to_cart", eventData);
                  console.log('Tracking event sent:', eventData);
                } catch (error) {
                  console.error('Tracking failed:', error);
                }
              }
            } catch (error) {
              console.error('Error in tracking click handler:', error);
            }
          }, { passive: true });
        }
      } catch (error) {
        console.error('Error processing button for tracking:', error);
      }
    };
    
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
        
        requestAnimationFrame(() => {
          buttonsToProcess.forEach(processButton);
        });
      }, TIMEOUTS.DEBOUNCE_DELAY);
    };
    
    observer = new MutationObserver(debouncedHandler);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Cleanup on page unload instead of timeout
    const cleanup = () => {
      try {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        if (debounceTimer) {
          clearTimeout(debounceTimer);
          debounceTimer = null;
        }
        console.log('Tracking observer cleaned up');
      } catch (error) {
        console.error('Error during tracking cleanup:', error);
      }
    };
    
    window.addEventListener('beforeunload', cleanup, { once: true });
    
    return cleanup;
    
  } catch (error) {
    console.error('Error setting up tracking:', error);
    return () => {}; // Return no-op cleanup function
  }
};

const initializeShopify = async () => {
  console.log('Shopify initialization started for locale:', locale);
  try {
    if (!currentLocaleConfig) {
      console.error('Shopify config is missing or invalid for locale:', locale);
      return;
    }
    
    console.log('Config found:', {
      domain: getDomain(),
      locale: locale,
      hasProductIds: !!getProductIds()
    });

    const hasAnyProductElement = Object.keys(productElements).some(key => {
      const element = productElements[key];
      return element !== null;
    });
    
    console.log('Product elements check:', {
      hasAnyProductElement,
      elementIds: Object.keys(productElements),
      foundElements: Object.keys(productElements).filter(key => productElements[key] !== null)
    });
    
    if (!hasAnyProductElement) {
      console.log('No product elements found initially - waiting for DOM...');
      
      try {
        const productElementIds = Object.keys(productElements).map(key => 
          `buy-button-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        );
        
        const result = await waitForElements(productElementIds, TIMEOUTS.MAX_DOM_WAIT);
        
        if (result.partial) {
          console.warn('Some product elements not found:', result.missing);
        }
        
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
      
      try {
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to append Shopify SDK script:', error);
        return;
      }
      
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

        const localStorageCheckoutKey = `${client.config.storefrontAccessToken}.${client.config.domain}.checkoutId`;
        console.log('Creating checkout for:', {
          locale,
          domain: client.config.domain,
          accessToken: client.config.storefrontAccessToken,
          language: getLanguage(),
          country: getCountry()
        });

        client.checkout.create(input).then((checkout) => {
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
preloadShopifySDK().catch(error => {
  console.warn('Shopify SDK preload failed, will try again during initialization:', error);
});

// Variables that depend on other calculations
let deliveryMessage;

// Main execution - Locale-specific initialization
switch (locale) {
  case 'en':
    if (deliveryDate) deliveryDate.textContent = deliveryMessageEN;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageEN);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageEN);

    if (userMenu) userMenu.style.display = 'none';

    initializeShopify().catch(error => console.error('Shopify initialization failed for EN locale:', error));
    break;
  
  case 'sk':
    if (deliveryDate) deliveryDate.textContent = deliveryMessageSK;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageSK);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageSK);

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
    
    initializeShopify().catch(error => console.error('Shopify initialization failed for SK locale:', error));
    break;
    
  case 'de':
    if (deliveryDate) deliveryDate.textContent = deliveryMessageDE;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageDE);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageDE);

    const alzaButton = getAlzaButton();
    if (alzaButton) alzaButton.style.display = 'none';

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

    initializeShopify().catch(error => console.error('Shopify initialization failed for DE locale:', error));
    break;

  case 'fr':
    if (deliveryDate) deliveryDate.textContent = deliveryMessageFR;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessageFR);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessageFR);

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

    initializeShopify().catch(error => console.error('Shopify initialization failed for FR locale:', error));
    break;
    
  case 'pl':
    if (deliveryDate) deliveryDate.textContent = deliveryMessagePL;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, trasholdMessagePL);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessagePL);

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

    initializeShopify().catch(error => console.error('Shopify initialization failed for PL locale:', error));
    break;

  default:
    const getDeliveryMessage = () => {
      const dayMessages = {
        1: "pozítří u Vás",
        2: "pozítří u Vás",  
        3: "pozítří u Vás",
        4: "v pondělí u Vás",
        5: "v úterý u Vás",
        6: "v úterý u Vás",
        0: "v úterý u Vás"
      };
      return dayMessages[dayOfWeek] || "pozítří u Vás";
    };

    deliveryMessage = getDeliveryMessage();
    
    if (deliveryDate) deliveryDate.textContent = deliveryMessage;
    updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, deliveryMessageCZ);
    updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessage);

    loadHeurekaWidget();
    
    initializeShopify().catch(error => console.error('Shopify initialization failed for CZ locale:', error));
    break;
}