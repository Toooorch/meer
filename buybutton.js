// 1. NEJDŘÍVE - URL a locale detection
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

// 2. POTOM - Date/time constants
const thehours = new Date().getHours();
const dayOfWeek = new Date().getDay();

// 3. POTOM - DOM elements
const deliveryTrashold = document.getElementById("delivery-treshold");
const deliveryTime = document.getElementById("delivery-speed");
const deliveryDate = document.getElementById("delivery-date");
const userMenu = document.getElementById("user-menu");

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
const userAddresses = document.getElementById('user-adresses');

const alzaButton = document.getElementById('alza-button');
const completeSaveTagText = document.getElementById('complete-save-tag-text');
const freeShippingTags = document.querySelectorAll('.free-shipping-tag');

// 4. POTOM - Message constants
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

// 5. POTOM - Configuration objects
const localeConfigs = {
  en: {
    domain: 'meer-care.myshopify.com',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
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
      outOfStock: "Sold Out",
      unavailable: "Sold Out"
    }
  },
  sk: {
    domain: 'meer.sk',
    accessToken: '618933109ccee1040151ba599180cfef',
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
      outOfStock: "Vypredané",
      unavailable: "Vypredané"
    }
  },
  de: {
    domain: 'meercarede.cz',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
    countryCode: 'DE',
    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
    buttonText: 'In den Warenkorb',
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
      title: "Warenkorb",
      total: "Zwischensumme",
      empty: "Ihr Warenkorb ist leer.",
      button: "Zur Kasse gehen",
      noteDescription: "Bestellnotiz",
      outOfStock: "Ausverkauft",
      unavailable: "Ausverkauft"
    }
  },
  fr: {
    domain: 'meercarefr.cz',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
    countryCode: 'FR',
    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
    buttonText: 'Ajouter au panier',
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
      title: "Panier",
      total: "Sous-total",
      empty: "Votre panier est vide.",
      button: "Procéder au paiement",
      noteDescription: "Note de commande",
      outOfStock: "Épuisé",
      unavailable: "Épuisé"
    }
  },
  pl: {
    domain: 'meercarepl.cz',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
    countryCode: 'PL',
    moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
    buttonText: 'Włożyć do koszyka',
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
      title: "Koszyk",
      total: "Suma",
      empty: "Obecnie nie masz żadnych produktów w koszyku.",
      button: "Przejdź do finalizacji zakupu",
      noteDescription: "Uwaga do zamówienia",
      outOfStock: "Sprzedany",
      unavailable: "Sprzedany"
    }
  },
  cz: {
    domain: 'meer-care.myshopify.com',
    accessToken: 'd0790ee9d09c16714d92224efa9f5882',
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
      outOfStock: "Vyprodáno",
      unavailable: "Vyprodáno"
    }
  }
};

// 6. POTOM - Utility functions
const loadHeurekaWidget = () => {
  if (!document.querySelector('script[src*="heureka"]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cz.im9.cz/direct/i/gjs.php?n=wdgt&sak=DE44F0D5D122B2322E7114114A9957A9';
    document.head.appendChild(script);
    
    window._hwq = window._hwq || [];
    _hwq.push(['setKey', 'DE44F0D5D122B2322E7114114A9957A9']);
    _hwq.push(['setTopPos', '152']);
    _hwq.push(['showWidget', '21']);
  }
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

const initializeShopify = (config) => {
  if (!config) {
    console.error('Shopify config is missing for locale:', locale);
    return;
  }

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
  }
  
  function ShopifyBuyInit() {
    try {
      const client = ShopifyBuy.buildClient({
        domain: config.domain,
        storefrontAccessToken: config.accessToken,
        language: locale,
      });

      const input = {
        buyerIdentity: {
          countryCode: config.countryCode,
        },
      };

      client.checkout.create(input).then((checkout) => {
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

          // Vytvoření komponent s error handling
          Object.entries(config.productIds).forEach(([key, productId]) => {
            const element = productElements[key];
            if (element && cartToggle) {
              try {
                ui.createComponent('product', {
                  id: [productId],
                  node: element,
                  toggles: [{node: cartToggle}],
                  moneyFormat: config.moneyFormat,
                  options: options
                });
              } catch (error) {
                console.error(`Failed to create Shopify component for ${key}:`, error);
              }
            }
          });

          // Tracking s optimalizací
          setupTracking(config.buttonText);
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
switch (locale) {
  // English
  case 'en':
    if (deliveryDate != null) {
      deliveryDate.textContent = deliveryMessageEN;
    }
    deliveryTrashold.textContent = trasholdMessageEN;
    deliveryTime.textContent = deliveryMessageEN;

    // User
    userMenu.style.display = 'none';

    initializeShopify(localeConfigs.en);
    break;
  
  // Slovakia
  case 'sk':
    if (deliveryDate != null) {
      deliveryDate.textContent = deliveryMessageSK;
    }
    deliveryTrashold.textContent = trasholdMessageSK;
    deliveryTime.textContent = deliveryMessageSK;

    // User links
    Object.assign(userOrders, {href: 'https://www.meer.beauty/account'});
    Object.assign(userLogin, {href: 'https://www.meer.beauty/account/login'});
    Object.assign(userCreateAccount, {href: 'https://www.meer.beauty/account/register'});
    Object.assign(userForgotPassword, {href: 'https://www.meer.beauty/account/login#recover'});
    Object.assign(userAddresses, {href: 'https://www.meer.beauty/account/addresses'});
    
    // Heureka widget
    loadHeurekaWidget();
    
    initializeShopify(localeConfigs.sk);
    break;
    
  // Germany
  case 'de':
    if (deliveryDate != null) {
      deliveryDate.textContent = deliveryMessageDE;
    }
    deliveryTrashold.textContent = trasholdMessageDE;
    deliveryTime.textContent = deliveryMessageDE;

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

    initializeShopify(localeConfigs.de);
    break;

  // France
  case 'fr':
    if (deliveryDate != null) {
      deliveryDate.textContent = deliveryMessageFR;
    }
    deliveryTrashold.textContent = trasholdMessageFR;
    deliveryTime.textContent = deliveryMessageFR;

    // User links
    Object.assign(userOrders, {href: 'https://www.meer.beauty/account'});
    Object.assign(userLogin, {href: 'https://www.meer.beauty/account/login'});
    Object.assign(userCreateAccount, {href: 'https://www.meer.beauty/account/register'});
    Object.assign(userForgotPassword, {href: 'https://www.meer.beauty/account/login#recover'});
    Object.assign(userAddresses, {href: 'https://www.meer.beauty/account/addresses'});

    initializeShopify(localeConfigs.fr);
    break;
  // Poland
  case 'pl':
    if (deliveryDate != null) {
      deliveryDate.textContent = deliveryMessagePL;
    }
    deliveryTrashold.textContent = trasholdMessagePL;
    deliveryTime.textContent = deliveryMessagePL;

    // User links
    Object.assign(userOrders, {href: 'https://meercare.pl/account'});
    Object.assign(userLogin, {href: 'https://meercare.pl/account/login'});
    Object.assign(userCreateAccount, {href: 'https://meercare.pl/account/register'});
    Object.assign(userForgotPassword, {href: 'https://meercare.pl/account/login#recover'});
    Object.assign(userAddresses, {href: 'https://meercare.pl/account/addresses'});

    initializeShopify(localeConfigs.pl);
    break;

  default:
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
    deliveryTrashold.textContent = deliveryMessageCZ;
    deliveryTime.textContent = deliveryMessage;

    loadHeurekaWidget();
    initializeShopify(localeConfigs.cz);
    break;
}
