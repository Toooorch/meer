// Delivery
const deliveryTrashold = document.getElementById("delivery-treshold");
const deliveryTime = document.getElementById("delivery-speed");
const deliveryDate = document.getElementById("delivery-date");
const userMenu = document.getElementById("user-menu");

// Product Elements
const setComplete = document.getElementById("buy-button-set-complete");
const setI = document.getElementById("buy-button-set-I");
const setII = document.getElementById("buy-button-set-II");
const stepI = document.getElementById("buy-button-step-I");
const stepII = document.getElementById("buy-button-step-II");
const stepIII = document.getElementById("buy-button-step-III");
const stepIV = document.getElementById("buy-button-step-IV");
const giftCard = document.getElementById("buy-button-gift-card");

// Cart
const cartToggle = document.getElementById("cart-toggle");

// Delivery Time
const deliveryMessageEN = "Fast Delivery";
const deliveryMessageSK = "Doručenie za 1-3 dni";
const deliveryMessageDE = "Lieferung in 2-3 Tagen";
const deliveryMessagePL = "Dostawa 1-3 dni";
const deliveryMessageFR = "Livraison en 2-5 jours";

// Free Delivery
//const deliveryMessageCZ = "Doprava zdarma od 1500Kč";
const deliveryMessageCZ = "Rychlé odeslání";
//const deliveryMessageCZ = "Doprava nyní ZDARMA";
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

// User Section
const userOrders = document.getElementById('user-orders');
const userLogin = document.getElementById('user-login');
const userCreateAccount = document.getElementById('user-create-account');
const userForgotPassword = document.getElementById('user-forgot-password');
const userAddresses = document.getElementById('user-adresses');

// Random elements
const alzaButton = document.getElementById('alza-button');

let deliveryMessage;

const thehours = new Date().getHours();
const dayOfWeek = new Date().getDay();

const href = window.location.href;
const findTermURL = (term) => {
  if (href.includes(term)){
    return href;
  }
};

switch (href) {
  // English
  case findTermURL('en.meer.care'):

  if (deliveryDate != null) {
    deliveryDate.textContent = deliveryMessageEN;
  }
    deliveryTrashold.textContent = trasholdMessageEN;
    deliveryTime.textContent = deliveryMessageEN;

    // User
    userMenu.style.display = 'none';

        /* Shopify Code Start */
        (function () {
          var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
          if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
              ShopifyBuyInit();
            } else {
              loadScript();
            }
          } else {
            loadScript();
          }
          function loadScript() {
            var script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
            script.onload = ShopifyBuyInit;
          }
          function ShopifyBuyInit() {
            var client = ShopifyBuy.buildClient({
              domain: 'meer-care.myshopify.com',
              storefrontAccessToken: 'd0790ee9d09c16714d92224efa9f5882',
              language: 'en',
            });
      
            var input = {
              buyerIdentity: {
                countryCode: 'US',
              },
            };
      
        client.checkout.create(input).then((checkout) => {
          ShopifyBuy.UI.onReady(client).then(function (ui) {
            var options = {
          "product": {
            "iframe": false,
            "contents": {
              "img": false,
              "button": false,
              "buttonWithQuantity": true,
              "title": false,
              "price": false
            },
            "text": {
              "button": "Add to Basket",
              "outOfStock": "Sold Out",
              "unavailable": "Sold Out"
            }
          },
          "productSet": {},
          "cart": {
              "iframe": false,
              "text": {
                "title": "Cart",
                  "total": "Subtotal",
                  "empty": "Your cart is empty.",
                  "notice": "",
                  "button": "Proceed to Checkout",
                  "noteDescription": "Order Note",
                  "outOfStock": "Sold Out",
                  "unavailable": "Sold Out",
              },
              "contents": {
                "note": true
              },
              "popup": false
        },
        "toggle": {
          "iframe": false,
          "sticky": false,
          "templates": {
              "icon": '',
          }
        },
        "lineItem": {}
      }

      if(document.getElementById('buy-button-set-complete')){
        ui.createComponent('product', {
        id: [8623720366405],
        node: setComplete,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
      if(document.getElementById('buy-button-set-I')){
          ui.createComponent('product', {
          id: [7542825058534],
          node: setI,
          toggles: [{node: cartToggle}],
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-set-II')){
          ui.createComponent('product', {
          id: [8021842854118],
          node: setII,
          toggles: [{node: cartToggle}],
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-I')){
          ui.createComponent('product', {
          id: [7601486758118],
          node: stepI,
          toggles: [{node: cartToggle}],
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-II')){
          ui.createComponent('product', {
          id: [7609802686694],
          node: stepII,
          toggles: [{node: cartToggle}],
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-III')){
          ui.createComponent('product', {
          id: [7931357692134],
          node: stepIII,
          toggles: [{node: cartToggle}],
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-IV')){
          ui.createComponent('product', {
          id: [7931360051430],
          node: stepIV,
          toggles: [{node: cartToggle}],
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-gift-card')){
        ui.createComponent('product', {
        id: [8578704736581],
        node: giftCard,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
        });
      }

      
        });
      })
      }
      })();

      break;
  
  // Slovakia
  case findTermURL('sk.meer.care'):

  if (deliveryDate != null) {
    deliveryDate.textContent = deliveryMessageSK;
  }
  deliveryTrashold.textContent = trasholdMessageSK;
  deliveryTime.textContent = deliveryMessageSK;

    // User
    userOrders.setAttribute('href', 'https://www.meer.beauty/account');
    userLogin.setAttribute('href', 'https://www.meer.beauty/account/login');
    userCreateAccount.setAttribute('href', 'https://www.meer.beauty/account/register');
    userForgotPassword.setAttribute('href', 'https://www.meer.beauty/account/login#recover');
    userAddresses.setAttribute('href', 'https://www.meer.beauty/account/addresses');

    /* Shopify Code Start */
    (function () {
      var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          ShopifyBuyInit();
        } else {
          loadScript();
        }
      } else {
        loadScript();
      }
      function loadScript() {
        var script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInit;
      }
      function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
          domain: 'meer.sk',
          storefrontAccessToken: '618933109ccee1040151ba599180cfef',
          language: 'sk',
        });
  
        var input = {
          buyerIdentity: {
            countryCode: 'SK',
          },
        };
  
    client.checkout.create(input).then((checkout) => {
      ShopifyBuy.UI.onReady(client).then(function (ui) {
        var options = {
      "product": {
        "iframe": false,
        "contents": {
          "img": false,
          "button": false,
          "buttonWithQuantity": true,
          "title": false,
          "price": false
        },
        "text": {
          "button": "Pridať do košíka",
          "outOfStock": "Vypredané",
          "unavailable": "Vypredané"
        }
      },
      "productSet": {},
      "cart": {
          "iframe": false,
          "text": {
            "title": "Košík",
              "total": "Celková čiastka",
              "empty": "Momentálne nemáte v košíku vložený žiadny tovar.",
              "notice": "",
              "button": "Pokračovať k pokladni",
              "noteDescription": "Poznámka k objednávke",
              "outOfStock": "Vypredané",
              "unavailable": "Vypredané",
          },
          "contents": {
            "note": true
          },
          "popup": false
    },
    "toggle": {
      "iframe": false,
      "sticky": false,
      "templates": {
          "icon": '',
      }
    },
    "lineItem": {}
  }

  if(document.getElementById('buy-button-set-complete')){
    ui.createComponent('product', {
    id: [8592696639827],
    node: setComplete,
    toggles: [{node: cartToggle}],
    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
    options: options
  });
}
  if(document.getElementById('buy-button-set-I')){
      ui.createComponent('product', {
      id: [8592695624019],
      node: setI,
      toggles: [{node: cartToggle}],
      moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
      options: options
    });
  }
  if(document.getElementById('buy-button-set-II')){
      ui.createComponent('product', {
      id: [8592696541523],
      node: setII,
      toggles: [{node: cartToggle}],
      moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-I')){
      ui.createComponent('product', {
      id: [8592695886163],
      node: stepI,
      toggles: [{node: cartToggle}],
      moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-II')){
      ui.createComponent('product', {
      id: [8592696115539],
      node: stepII,
      toggles: [{node: cartToggle}],
      moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-III')){
      ui.createComponent('product', {
      id: [8592696279379],
      node: stepIII,
      toggles: [{node: cartToggle}],
      moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-IV')){
      ui.createComponent('product', {
      id: [8592696475987],
      node: stepIV,
      toggles: [{node: cartToggle}],
      moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
      options: options
    });
  }
  if(document.getElementById('buy-button-gift-card')){
    ui.createComponent('product', {
    id: [8592808051027],
    node: giftCard,
    toggles: [{node: cartToggle}],
    moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
    options: options
    });
  }

  
    });
  })
  }
  })();

      break;

// Germany
    case findTermURL('de.meer.care'):

    if (deliveryDate != null) {
      deliveryDate.textContent = deliveryMessageDE;
    }
    deliveryTrashold.textContent = trasholdMessageDE;
    deliveryTime.textContent = deliveryMessageDE;

    // Hide alza-button if it exists
    if (alzaButton) {
      alzaButton.style.display = 'none';
    }

        // User
        userOrders.setAttribute('href', 'https://www.meer.beauty/account');
        userLogin.setAttribute('href', 'https://www.meer.beauty/account/login');
        userCreateAccount.setAttribute('href', 'https://www.meer.beauty/account/register');
        userForgotPassword.setAttribute('href', 'https://www.meer.beauty/account/login#recover');
        userAddresses.setAttribute('href', 'https://www.meer.beauty/account/addresses');

          /* Shopify Code Start */
          (function () {
            var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
            if (window.ShopifyBuy) {
              if (window.ShopifyBuy.UI) {
                ShopifyBuyInit();
              } else {
                loadScript();
              }
            } else {
              loadScript();
            }
            function loadScript() {
              var script = document.createElement('script');
              script.async = true;
              script.src = scriptURL;
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
              script.onload = ShopifyBuyInit;
            }
            function ShopifyBuyInit() {
              var client = ShopifyBuy.buildClient({
                domain: 'meercarede.cz',
                storefrontAccessToken: '618933109ccee1040151ba599180cfef',
                language: 'de',
              });
        
              var input = {
                buyerIdentity: {
                  countryCode: 'DE',
                },
              };
        
          client.checkout.create(input).then((checkout) => {
            ShopifyBuy.UI.onReady(client).then(function (ui) {
              var options = {
            "product": {
              "iframe": false,
              "contents": {
                "img": false,
                "button": false,
                "buttonWithQuantity": true,
                "title": false,
                "price": false
              },
              "text": {
                "button": "In den Einkaufswagen",
                "outOfStock": "Ausverkauft",
                "unavailable": "Ausverkauft"
              }
            },
            "productSet": {},
            "cart": {
                "iframe": false,
                "text": {
                  "title": "Warenkorb",
                    "total": "Zwischensumme",
                    "empty": "Ihr Warenkorb ist leer",
                    "notice": "",
                    "button": "Zur Kasse gehen",
                    "noteDescription": "Bestellhinweis",
                    "outOfStock": "Ausverkauft",
                    "unavailable": "Ausverkauft",
                },
                "contents": {
                  "note": true
                },
                "popup": false
          },
          "toggle": {
            "iframe": false,
            "sticky": false,
            "templates": {
                "icon": '',
            }
          },
          "lineItem": {}
        }

        if(document.getElementById('buy-button-set-complete')){
          ui.createComponent('product', {
          id: [9792222462291],
          node: setComplete,
          toggles: [{node: cartToggle}],
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: options
        });
      }
        if(document.getElementById('buy-button-set-I')){
            ui.createComponent('product', {
            id: [9792209256787],
            node: setI,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-set-II')){
            ui.createComponent('product', {
            id: [9792221315411],
            node: setII,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-I')){
            ui.createComponent('product', {
            id: [9792209650003],
            node: stepI,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-II')){
            ui.createComponent('product', {
            id: [9792209977683],
            node: stepII,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-III')){
            ui.createComponent('product', {
            id: [9792218235219],
            node: stepIII,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-IV')){
            ui.createComponent('product', {
            id: [9792220135763],
            node: stepIV,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-gift-card')){
          ui.createComponent('product', {
          id: [8592808051027],
          node: giftCard,
          toggles: [{node: cartToggle}],
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: options
          });
        }
        
        
          });
        })
        }
        })();

    break;

    // France
    case findTermURL('fr.meer.care'):

    if (deliveryDate != null) {
    deliveryDate.textContent = deliveryMessageFR;
    }
    deliveryTrashold.textContent = trasholdMessageFR;
    deliveryTime.textContent = deliveryMessageFR;

        // User
        userOrders.setAttribute('href', 'https://www.meer.beauty/account');
        userLogin.setAttribute('href', 'https://www.meer.beauty/account/login');
        userCreateAccount.setAttribute('href', 'https://www.meer.beauty/account/register');
        userForgotPassword.setAttribute('href', 'https://www.meer.beauty/account/login#recover');
        userAddresses.setAttribute('href', 'https://www.meer.beauty/account/addresses');

          /* Shopify Code Start */
          (function () {
            var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
            if (window.ShopifyBuy) {
              if (window.ShopifyBuy.UI) {
                ShopifyBuyInit();
              } else {
                loadScript();
              }
            } else {
              loadScript();
            }
            function loadScript() {
              var script = document.createElement('script');
              script.async = true;
              script.src = scriptURL;
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
              script.onload = ShopifyBuyInit;
            }
            function ShopifyBuyInit() {
              var client = ShopifyBuy.buildClient({
                domain: 'meercarefr.cz',
                storefrontAccessToken: '618933109ccee1040151ba599180cfef',
                language: 'fr',
              });
        
              var input = {
                buyerIdentity: {
                  countryCode: 'FR',
                },
              };
        
          client.checkout.create(input).then((checkout) => {
            ShopifyBuy.UI.onReady(client).then(function (ui) {
              var options = {
            "product": {
              "iframe": false,
              "contents": {
                "img": false,
                "button": false,
                "buttonWithQuantity": true,
                "title": false,
                "price": false
              },
              "text": {
                "button": "Ajouter au panier",
                "outOfStock": "Vendu",
                "unavailable": "Vendu"
              }
            },
            "productSet": {},
            "cart": {
                "iframe": false,
                "text": {
                  "title": "Panier",
                    "total": "Sous-total",
                    "empty": "Vous n'avez actuellement aucun article dans votre panier.",
                    "notice": "",
                    "button": "Passer la commande",
                    "noteDescription": "Bon de commande",
                    "outOfStock": "Vendu",
                    "unavailable": "Vendu",
                },
                "contents": {
                  "note": true
                },
                "popup": false
          },
          "toggle": {
            "iframe": false,
            "sticky": false,
            "templates": {
                "icon": '',
            }
          },
          "lineItem": {}
        }

        if(document.getElementById('buy-button-set-complete')){
          ui.createComponent('product', {
          id: [8592696639827],
          node: setComplete,
          toggles: [{node: cartToggle}],
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: options
        });
      }
        if(document.getElementById('buy-button-set-I')){
            ui.createComponent('product', {
            id: [8592695624019],
            node: setI,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-set-II')){
            ui.createComponent('product', {
            id: [8592696541523],
            node: setII,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-I')){
            ui.createComponent('product', {
            id: [8592695886163],
            node: stepI,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-II')){
            ui.createComponent('product', {
            id: [8592696115539],
            node: stepII,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-III')){
            ui.createComponent('product', {
            id: [8592696279379],
            node: stepIII,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-IV')){
            ui.createComponent('product', {
            id: [8592696475987],
            node: stepIV,
            toggles: [{node: cartToggle}],
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: options
          });
        }
        if(document.getElementById('buy-button-gift-card')){
          ui.createComponent('product', {
          id: [8592808051027],
          node: giftCard,
          toggles: [{node: cartToggle}],
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: options
          });
        }
              
          });
        })
        }
        })();
        

    break;
// Poland
    case findTermURL('pl.meer.care'):

    if (deliveryDate != null) {
      deliveryDate.textContent = deliveryMessagePL;
    }
    deliveryTrashold.textContent = trasholdMessagePL;
    deliveryTime.textContent = deliveryMessagePL;

        // User
        userOrders.setAttribute('href', 'https://meercare.pl/account');
        userLogin.setAttribute('href', 'https://meercare.pl/account/login');
        userCreateAccount.setAttribute('href', 'https://meercare.pl/account/register');
        userForgotPassword.setAttribute('href', 'https://meercare.pl/account/login#recover');
        userAddresses.setAttribute('href', 'https://meercare.pl/account/addresses');

      /* Shopify Code Start */
      (function () {
        var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        if (window.ShopifyBuy) {
          if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
          } else {
            loadScript();
          }
        } else {
          loadScript();
        }
        function loadScript() {
          var script = document.createElement('script');
          script.async = true;
          script.src = scriptURL;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
          script.onload = ShopifyBuyInit;
        }
        function ShopifyBuyInit() {
          var client = ShopifyBuy.buildClient({
            domain: 'meercarepl.cz',
            storefrontAccessToken: 'd0790ee9d09c16714d92224efa9f5882',
            language: 'pl',
          });
    
          var input = {
            buyerIdentity: {
              countryCode: 'PL',
            },
          };
    
      client.checkout.create(input).then((checkout) => {
        ShopifyBuy.UI.onReady(client).then(function (ui) {
          var options = {
        "product": {
          "iframe": false,
          "contents": {
            "img": false,
            "button": false,
            "buttonWithQuantity": true,
            "title": false,
            "price": false
          },
          "text": {
            "button": "Włożyć do koszyka",
            "outOfStock": "Sprzedany",
            "unavailable": "Sprzedany"
          }
        },
        "productSet": {},
        "cart": {
            "iframe": false,
            "text": {
              "title": "Koszyk",
                "total": "Suma",
                "empty": "Obecnie nie masz żadnych produktów w koszyku.",
                "notice": "",
                "button": "Przejdź do finalizacji zakupu",
                "noteDescription": "Uwaga do zamówienia",
                "outOfStock": "Sprzedany",
                "unavailable": "Sprzedany",
            },
            "contents": {
              "note": true
            },
            "popup": false
      },
      "toggle": {
        "iframe": false,
        "sticky": false,
        "templates": {
            "icon": '',
        }
      },
      "lineItem": {}
    }

    if(document.getElementById('buy-button-set-complete')){
      ui.createComponent('product', {
      id: [8623720366405],
      node: setComplete,
      toggles: [{node: cartToggle}],
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
    if(document.getElementById('buy-button-set-I')){
        ui.createComponent('product', {
        id: [7542825058534],
        node: setI,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-set-II')){
        ui.createComponent('product', {
        id: [8021842854118],
        node: setII,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-I')){
        ui.createComponent('product', {
        id: [7601486758118],
        node: stepI,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-II')){
        ui.createComponent('product', {
        id: [7609802686694],
        node: stepII,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-III')){
        ui.createComponent('product', {
        id: [7931357692134],
        node: stepIII,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-IV')){
        ui.createComponent('product', {
        id: [7931360051430],
        node: stepIV,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-gift-card')){
      ui.createComponent('product', {
      id: [8578704736581],
      node: giftCard,
      toggles: [{node: cartToggle}],
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
      });
    }
              
  });
})
}
})();

break;

  default:
      // Czech
        var tomorrow = "zítra u Vás (Zásilkovna)";
        var nexttomorrow = "pozítří u Vás (Zásilkovna)";
        var monday = "v pondělí u Vás (Zásilkovna)";
        var tuesday = "v úterý u Vás (Zásilkovna)";

        if (thehours >= 0 && thehours < 19 && dayOfWeek == 1) {
            deliveryMessage = tomorrow;
        } else if (thehours >= 19 && thehours < 24 && dayOfWeek == 1) {
            deliveryMessage = nexttomorrow;
        } else if (thehours >= 0 && thehours < 19 && dayOfWeek == 2) {
            deliveryMessage = tomorrow;
        } else if (thehours >= 19 && thehours < 24 && dayOfWeek == 2) {
            deliveryMessage = nexttomorrow;
        } else if (thehours >= 0 && thehours < 19 && dayOfWeek == 3) {
            deliveryMessage = tomorrow;
        } else if (thehours >= 19 && thehours < 24 && dayOfWeek == 3) {
            deliveryMessage = nexttomorrow;
        } else if (thehours >= 0 && thehours < 19 && dayOfWeek == 4) { // Thursday before 19
            deliveryMessage = tomorrow;
        } else if (thehours >= 19 && thehours < 24 && dayOfWeek == 4) { // Thursday after 19
            deliveryMessage = monday;
        } else if (thehours >= 0 && thehours < 19 && dayOfWeek == 5) { // Friday before 19
            deliveryMessage = monday;
        } else if (thehours >= 19 && thehours < 24 && dayOfWeek == 5) { // Friday after 19
            deliveryMessage = tuesday;
        } else if (thehours >= 0 && thehours < 24 && dayOfWeek == 6) { // Sat
            deliveryMessage = tuesday;
        } else if (thehours >= 0 && thehours < 24 && dayOfWeek == 0) { // Sun 
            deliveryMessage = tuesday;
        }

      // Change text in 'complete-save-tag-text' div if it exists
      const completeSaveTagText = document.getElementById('com100K   plete-save-tag-text');
      if (completeSaveTagText) {
          completeSaveTagText.textContent = "Sada - ušetříte 100Kč";
      }

      // Hide all divs with the class 'free-shipping-tag'
      const freeShippingTags = document.querySelectorAll('.free-shipping-tag');
      freeShippingTags.forEach(tag => {
          tag.style.display = 'none';
      });

      deliveryTime.textContent = deliveryMessage;

    if (deliveryDate != null) {
      deliveryDate.textContent = deliveryMessage;
    }

    deliveryTrashold.textContent = deliveryMessageCZ;

      /* Shopify Code Start */
      (function () {
        var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        if (window.ShopifyBuy) {
          if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
          } else {
            loadScript();
          }
        } else {
          loadScript();
        }
        function loadScript() {
          var script = document.createElement('script');
          script.async = true;
          script.src = scriptURL;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
          script.onload = ShopifyBuyInit;
        }
        function ShopifyBuyInit() {
          var client = ShopifyBuy.buildClient({
            domain: 'meer.cz',
            storefrontAccessToken: 'd0790ee9d09c16714d92224efa9f5882',
            language: 'cs',
          });
    
          var input = {
            buyerIdentity: {
              countryCode: 'CZ',
            },
          };
    
      client.checkout.create(input).then((checkout) => {
        ShopifyBuy.UI.onReady(client).then(function (ui) {
          var options = {
        "product": {
          "iframe": false,
          "contents": {
            "img": false,
            "button": false,
            "buttonWithQuantity": true,
            "title": false,
            "price": false
          },
          "text": {
            "button": "Přidat do košíku",
            "outOfStock": "Vyprodáno",
            "unavailable": "Vyprodáno"
          }
        },
        "productSet": {},
        "cart": {
            "iframe": false,
            "text": {
              "title": "Košík",
                "total": "Celková částka",
                "empty": "Momentálně nemáte v košíku vloženo žádné zboží.",
                "notice": "",
                "button": "Pokračovat k pokladně",
                "noteDescription": "Poznámka k objednávce",
                "outOfStock": "Vyprodáno",
                "unavailable": "Vyprodáno",
            },
            "contents": {
              "note": true
            },
            "popup": false
      },
      "toggle": {
        "iframe": false,
        "sticky": false,
        "templates": {
            "icon": '',
        }
      },
      "lineItem": {}
    }

    if(document.getElementById('buy-button-set-complete')){
      ui.createComponent('product', {
      id: [8623720366405],
      node: setComplete,
      toggles: [{node: cartToggle}],
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
    if(document.getElementById('buy-button-set-I')){
        ui.createComponent('product', {
        id: [7542825058534],
        node: setI,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-set-II')){
        ui.createComponent('product', {
        id: [8021842854118],
        node: setII,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-I')){
        ui.createComponent('product', {
        id: [7601486758118],
        node: stepI,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-II')){
        ui.createComponent('product', {
        id: [7609802686694],
        node: stepII,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-III')){
        ui.createComponent('product', {
        id: [7931357692134],
        node: stepIII,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-IV')){
        ui.createComponent('product', {
        id: [7931360051430],
        node: stepIV,
        toggles: [{node: cartToggle}],
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-gift-card')){
      ui.createComponent('product', {
      id: [8578704736581],
      node: giftCard,
      toggles: [{node: cartToggle}],
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
      });
    }

      });
    })
    }
    })();

};
