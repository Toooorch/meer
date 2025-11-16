const locale = 'cz';

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

// Message constants - Czech only
// Delivery Time
const deliveryMessageCZ = "Doprava nyní ZDARMA";
const trasholdMessageCZ = "Doprava zdarma od 1500Kč";

// Configuration - Czech Store Only
const config = {
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
};

// Utility functions - Czech configuration only
const getLanguage = () => config.language;
const getCountry = () => config.countryCode;
const getDomain = () => config.domain;
const getAccessToken = () => config.accessToken;
const getButtonText = () => config.buttonText;
const getCart = () => config.cart;
const getMoneyFormat = () => config.moneyFormat;
const getProductIds = () => config.productIds;

// Funkce pro animovaný reviews counter
const animateReviewsCounter = () => {
  const reviewsElement = document.getElementById('reviews-rating-number');
  
  if (!reviewsElement) {
    return; // Tichý exit, žádný log
  }

  // Získej počáteční hodnotu z HTML
  const initialCount = parseInt(reviewsElement.textContent.trim()) || 0;
  
  if (initialCount === 0) {
    return; // Tichý exit
  }

  // Klíč pro sessionStorage
  const sessionCountKey = 'meer_reviews_added_cz';
  
  // Získej kolik jsme už přidali v této session
  let addedInSession = parseInt(sessionStorage.getItem(sessionCountKey)) || 0;

  // Aktuální počet = HTML hodnota + přidané v session
  let currentCount = initialCount + addedInSession;

  // Zobraz aktuální počet
  reviewsElement.textContent = currentCount.toString();

  // Funkce pro přidání jedné recenze
  const incrementReview = () => {
    currentCount += 1;
    addedInSession += 1;
    
    // Ulož do sessionStorage
    sessionStorage.setItem(sessionCountKey, addedInSession);
    
    // Aktualizuj UI
    reviewsElement.textContent = currentCount.toString();
    
    // Malá animace
    reviewsElement.style.opacity = '0.6';
    setTimeout(() => {
      reviewsElement.style.opacity = '1';
    }, 200);
  };

  // Opakovaný cyklus: po 8s +1, pak po 20s +1, opakuje se
  const startCycle = () => {
    // První increment po 8 sekundách
    setTimeout(() => {
      incrementReview();
      
      // Druhý increment po dalších 20 sekundách (celkem 28s od startu cyklu)
      setTimeout(() => {
        incrementReview();
      }, 20000);
      
    }, 8000);
  };

  // Spusť první cyklus
  startCycle();
  
  // Opakuj každých 60 sekund (60000ms)
  setInterval(startCycle, 60000);
};

// Debug funkce pro reset counters (volej v konzoli: resetReviewsCounter())
window.resetReviewsCounter = () => {
  sessionStorage.removeItem('meer_reviews_added_cz');
  console.log('Reviews counter reset');
  location.reload();
};

// Funkce pro vyčištění starých localStorage záznamů
// FIXED: Mažeme jen Shopify checkouty, ne Zaraz data
const cleanupOldCheckouts = () => {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      // Mažeme jen Shopify checkouty (obsahují doménu a checkoutId)
      if (key && key.includes('checkoutId') && key.includes('meer.cz')) {
        keysToRemove.push(key);
      }
    }
    
    // Odstraň jen Shopify klíče
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    if (keysToRemove.length > 0) {
      console.log('Cleaned up old Shopify checkout IDs:', keysToRemove.length);
    }
  } catch (error) {
    console.warn('Could not clean localStorage:', error);
  }
};

// Main functions
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
  // Kontrola konfigurace
  if (!config) {
    console.error('Shopify config is missing');
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

  // Vyčištění starých localStorage záznamů (pouze Shopify)
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

// EXECUTION - Czech store only
animateReviewsCounter();

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

const deliveryMessage = getDeliveryMessage();

if (deliveryDate) deliveryDate.textContent = deliveryMessage;
updateDeliveryElements(navDeliveryTrashold, deliveryTrashold, deliveryMessageCZ);
updateDeliveryElements(navDeliveryTime, deliveryTime, deliveryMessage);

initializeShopify();
