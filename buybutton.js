const deliveryTrashold = document.getElementById("delivery-treshold");
const deliveryTime = document.getElementById("delivery-speed");
const deliveryDateDesktop = document.getElementById("delivery-date-desktop");
const deliveryDateMobile = document.getElementById("delivery-date-mobile");

// Delivery
const deliveryMessageCZ = "Doprava zdarma od 1100Kč";
const deliveryMessageEN = "Fast Delivery";
const deliveryMessageSK = "Doručenie za 1-3 dni";
const deliveryMessageDE = "Lieferung in 2-3 Tagen";
const deliveryMessagePL = "Dostawa w ciągu 1-3 dni";
const deliveryMessageFR = "Livraison en 2-5 jours";
// Free Delivery
const trasholdMessagePL = "Darmowa wysyłka od 200 zł";
const trasholdMessageEN = "Free Delivery from $50";
const trasholdMessageSK = "Doprava zadarmo od €50";
const trasholdMessageFR = "Frais de port offerts à partir de €60";
const trasholdMessageDE = "Kostenloser Versand ab €60";

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

  if (deliveryDateDesktop != null) {
    deliveryDateDesktop.textContent = deliveryMessageEN;
    deliveryDateMobile.textContent = deliveryMessageEN;
  }
    deliveryTrashold.textContent = trasholdMessageEN;
    deliveryTime.textContent = deliveryMessageEN;

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
          "templates": {
              "icon": '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M15 5.70256L9.71031 12.0502C9.26835 12.5806 8.48015 12.6522 7.9498 12.2103C7.41945 11.7683 7.3478 10.9801 7.78975 10.4498L14.0398 2.94977C14.5395 2.35008 15.4606 2.35008 15.9603 2.94977L22.2103 10.4498C22.6523 10.9801 22.5806 11.7683 22.0503 12.2103C21.5199 12.6522 20.7317 12.5806 20.2898 12.0502L15 5.70256Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.37402 11.25C4.82174 11.25 4.37402 11.6977 4.37402 12.25V23.25C4.37402 24.9069 5.71717 26.25 7.37402 26.25H22.625C24.2819 26.25 25.625 24.9069 25.625 23.25V12.25C25.625 11.6977 25.1773 11.25 24.625 11.25H5.37402ZM17.4999 18.75C17.4999 20.1307 16.3806 21.25 14.9999 21.25C13.6192 21.25 12.4999 20.1307 12.4999 18.75C12.4999 17.3693 13.6192 16.25 14.9999 16.25C16.3806 16.25 17.4999 17.3693 17.4999 18.75Z" fill="white"/></svg>',
          }
        },
        "lineItem": {}
      }

      if(document.getElementById('buy-button-set-complete-mobile')){
        ui.createComponent('product', {
        id: [8623720366405],
        node: document.getElementById('buy-button-set-complete-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
      if(document.getElementById('buy-button-set-I-mobile')){
          ui.createComponent('product', {
          id: [7542825058534],
          node: document.getElementById('buy-button-set-I-mobile'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-set-II-mobile')){
          ui.createComponent('product', {
          id: [8021842854118],
          node: document.getElementById('buy-button-set-II-mobile'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-I-mobile')){
          ui.createComponent('product', {
          id: [7601486758118],
          node: document.getElementById('buy-button-step-I-mobile'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-II-mobile')){
          ui.createComponent('product', {
          id: [7609802686694],
          node: document.getElementById('buy-button-step-II-mobile'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-III-mobile')){
          ui.createComponent('product', {
          id: [7931357692134],
          node: document.getElementById('buy-button-step-III-mobile'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-IV-mobile')){
          ui.createComponent('product', {
          id: [7931360051430],
          node: document.getElementById('buy-button-step-IV-mobile'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-gift-card-mobile')){
        ui.createComponent('product', {
        id: [8578704736581],
        node: document.getElementById('buy-button-gift-card-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
        });
      }
      if(document.getElementById('buy-button-set-complete-desktop')){
        ui.createComponent('product', {
        id: [8623720366405],
        node: document.getElementById('buy-button-set-complete-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
      if(document.getElementById('buy-button-set-I-desktop')){
          ui.createComponent('product', {
          id: [7542825058534],
          node: document.getElementById('buy-button-set-I-desktop'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-set-II-desktop')){
          ui.createComponent('product', {
          id: [8021842854118],
          node: document.getElementById('buy-button-set-II-desktop'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-I-desktop')){
          ui.createComponent('product', {
          id: [7601486758118],
          node: document.getElementById('buy-button-step-I-desktop'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-II-desktop')){
          ui.createComponent('product', {
          id: [7609802686694],
          node: document.getElementById('buy-button-step-II-desktop'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-III-desktop')){
          ui.createComponent('product', {
          id: [7931357692134],
          node: document.getElementById('buy-button-step-III-desktop'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-step-IV-desktop')){
          ui.createComponent('product', {
          id: [7931360051430],
          node: document.getElementById('buy-button-step-IV-desktop'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
      if(document.getElementById('buy-button-gift-card-desktop')){
          ui.createComponent('product', {
          id: [8578704736581],
          node: document.getElementById('buy-button-gift-card-desktop'),
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

  if (deliveryDateDesktop != null) {
    deliveryDateDesktop.textContent = deliveryMessageSK;
    deliveryDateMobile.textContent = deliveryMessageSK;
  }
  deliveryTrashold.textContent = trasholdMessageSK;
  deliveryTime.textContent = deliveryMessageSK;

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
          storefrontAccessToken: 'd0790ee9d09c16714d92224efa9f5882',
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
      "templates": {
          "icon": '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M15 5.70256L9.71031 12.0502C9.26835 12.5806 8.48015 12.6522 7.9498 12.2103C7.41945 11.7683 7.3478 10.9801 7.78975 10.4498L14.0398 2.94977C14.5395 2.35008 15.4606 2.35008 15.9603 2.94977L22.2103 10.4498C22.6523 10.9801 22.5806 11.7683 22.0503 12.2103C21.5199 12.6522 20.7317 12.5806 20.2898 12.0502L15 5.70256Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.37402 11.25C4.82174 11.25 4.37402 11.6977 4.37402 12.25V23.25C4.37402 24.9069 5.71717 26.25 7.37402 26.25H22.625C24.2819 26.25 25.625 24.9069 25.625 23.25V12.25C25.625 11.6977 25.1773 11.25 24.625 11.25H5.37402ZM17.4999 18.75C17.4999 20.1307 16.3806 21.25 14.9999 21.25C13.6192 21.25 12.4999 20.1307 12.4999 18.75C12.4999 17.3693 13.6192 16.25 14.9999 16.25C16.3806 16.25 17.4999 17.3693 17.4999 18.75Z" fill="white"/></svg>',
      }
    },
    "lineItem": {}
  }

  if(document.getElementById('buy-button-set-complete-mobile')){
    ui.createComponent('product', {
    id: [8623720366405],
    node: document.getElementById('buy-button-set-complete-mobile'),
    moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
    options: options
  });
}
  if(document.getElementById('buy-button-set-I-mobile')){
      ui.createComponent('product', {
      id: [7542825058534],
      node: document.getElementById('buy-button-set-I-mobile'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-set-II-mobile')){
      ui.createComponent('product', {
      id: [8021842854118],
      node: document.getElementById('buy-button-set-II-mobile'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-I-mobile')){
      ui.createComponent('product', {
      id: [7601486758118],
      node: document.getElementById('buy-button-step-I-mobile'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-II-mobile')){
      ui.createComponent('product', {
      id: [7609802686694],
      node: document.getElementById('buy-button-step-II-mobile'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-III-mobile')){
      ui.createComponent('product', {
      id: [7931357692134],
      node: document.getElementById('buy-button-step-III-mobile'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-IV-mobile')){
      ui.createComponent('product', {
      id: [7931360051430],
      node: document.getElementById('buy-button-step-IV-mobile'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-gift-card-mobile')){
    ui.createComponent('product', {
    id: [8578704736581],
    node: document.getElementById('buy-button-gift-card-mobile'),
    moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
    options: options
    });
  }
  if(document.getElementById('buy-button-set-complete-desktop')){
    ui.createComponent('product', {
    id: [8623720366405],
    node: document.getElementById('buy-button-set-complete-desktop'),
    moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
    options: options
  });
}
  if(document.getElementById('buy-button-set-I-desktop')){
      ui.createComponent('product', {
      id: [7542825058534],
      node: document.getElementById('buy-button-set-I-desktop'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-set-II-desktop')){
      ui.createComponent('product', {
      id: [8021842854118],
      node: document.getElementById('buy-button-set-II-desktop'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-I-desktop')){
      ui.createComponent('product', {
      id: [7601486758118],
      node: document.getElementById('buy-button-step-I-desktop'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-II-desktop')){
      ui.createComponent('product', {
      id: [7609802686694],
      node: document.getElementById('buy-button-step-II-desktop'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-III-desktop')){
      ui.createComponent('product', {
      id: [7931357692134],
      node: document.getElementById('buy-button-step-III-desktop'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-step-IV-desktop')){
      ui.createComponent('product', {
      id: [7931360051430],
      node: document.getElementById('buy-button-step-IV-desktop'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
  if(document.getElementById('buy-button-gift-card-desktop')){
      ui.createComponent('product', {
      id: [8578704736581],
      node: document.getElementById('buy-button-gift-card-desktop'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
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

    if (deliveryDateDesktop != null) {
      deliveryDateDesktop.textContent = deliveryMessageDE;
      deliveryDateMobile.textContent = deliveryMessageDE;
    }
    deliveryTrashold.textContent = trasholdMessageDE;
    deliveryTime.textContent = deliveryMessageDE;

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
                storefrontAccessToken: 'd0790ee9d09c16714d92224efa9f5882',
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
                "outOfStock": "Verkauft",
                "unavailable": "Verkauft"
              }
            },
            "productSet": {},
            "cart": {
                "iframe": false,
                "text": {
                  "title": "Einkaufswagen",
                    "total": "Summe",
                    "empty": "Ihr Einkaufswagen ist leer",
                    "notice": "",
                    "button": "Zur Kasse gehen",
                    "noteDescription": "Bestellhinweis",
                    "outOfStock": "Verkauft",
                    "unavailable": "Verkauft",
                },
                "contents": {
                  "note": true
                },
                "popup": false
          },
          "toggle": {
            "iframe": false,
            "templates": {
                "icon": '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M15 5.70256L9.71031 12.0502C9.26835 12.5806 8.48015 12.6522 7.9498 12.2103C7.41945 11.7683 7.3478 10.9801 7.78975 10.4498L14.0398 2.94977C14.5395 2.35008 15.4606 2.35008 15.9603 2.94977L22.2103 10.4498C22.6523 10.9801 22.5806 11.7683 22.0503 12.2103C21.5199 12.6522 20.7317 12.5806 20.2898 12.0502L15 5.70256Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.37402 11.25C4.82174 11.25 4.37402 11.6977 4.37402 12.25V23.25C4.37402 24.9069 5.71717 26.25 7.37402 26.25H22.625C24.2819 26.25 25.625 24.9069 25.625 23.25V12.25C25.625 11.6977 25.1773 11.25 24.625 11.25H5.37402ZM17.4999 18.75C17.4999 20.1307 16.3806 21.25 14.9999 21.25C13.6192 21.25 12.4999 20.1307 12.4999 18.75C12.4999 17.3693 13.6192 16.25 14.9999 16.25C16.3806 16.25 17.4999 17.3693 17.4999 18.75Z" fill="white"/></svg>',
            }
          },
          "lineItem": {}
        }

        if(document.getElementById('buy-button-set-complete-mobile')){
          ui.createComponent('product', {
          id: [8623720366405],
          node: document.getElementById('buy-button-set-complete-mobile'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
        if(document.getElementById('buy-button-set-I-mobile')){
            ui.createComponent('product', {
            id: [7542825058534],
            node: document.getElementById('buy-button-set-I-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-set-II-mobile')){
            ui.createComponent('product', {
            id: [8021842854118],
            node: document.getElementById('buy-button-set-II-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-I-mobile')){
            ui.createComponent('product', {
            id: [7601486758118],
            node: document.getElementById('buy-button-step-I-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-II-mobile')){
            ui.createComponent('product', {
            id: [7609802686694],
            node: document.getElementById('buy-button-step-II-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-III-mobile')){
            ui.createComponent('product', {
            id: [7931357692134],
            node: document.getElementById('buy-button-step-III-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-IV-mobile')){
            ui.createComponent('product', {
            id: [7931360051430],
            node: document.getElementById('buy-button-step-IV-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-gift-card-mobile')){
          ui.createComponent('product', {
          id: [8578704736581],
          node: document.getElementById('buy-button-gift-card-mobile'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
          });
        }
        if(document.getElementById('buy-button-set-complete-desktop')){
          ui.createComponent('product', {
          id: [8623720366405],
          node: document.getElementById('buy-button-set-complete-desktop'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
        if(document.getElementById('buy-button-set-I-desktop')){
            ui.createComponent('product', {
            id: [7542825058534],
            node: document.getElementById('buy-button-set-I-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-set-II-desktop')){
            ui.createComponent('product', {
            id: [8021842854118],
            node: document.getElementById('buy-button-set-II-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-I-desktop')){
            ui.createComponent('product', {
            id: [7601486758118],
            node: document.getElementById('buy-button-step-I-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-II-desktop')){
            ui.createComponent('product', {
            id: [7609802686694],
            node: document.getElementById('buy-button-step-II-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-III-desktop')){
            ui.createComponent('product', {
            id: [7931357692134],
            node: document.getElementById('buy-button-step-III-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-IV-desktop')){
            ui.createComponent('product', {
            id: [7931360051430],
            node: document.getElementById('buy-button-step-IV-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-gift-card-desktop')){
            ui.createComponent('product', {
            id: [8578704736581],
            node: document.getElementById('buy-button-gift-card-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
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

    if (deliveryDateDesktop != null) {
    deliveryDateDesktop.textContent = deliveryMessageFR;
    deliveryDateMobile.textContent = deliveryMessageFR;
    }
    deliveryTrashold.textContent = trasholdMessageFR;
    deliveryTime.textContent = deliveryMessageFR;

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
                storefrontAccessToken: 'd0790ee9d09c16714d92224efa9f5882',
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
            "templates": {
                "icon": '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M15 5.70256L9.71031 12.0502C9.26835 12.5806 8.48015 12.6522 7.9498 12.2103C7.41945 11.7683 7.3478 10.9801 7.78975 10.4498L14.0398 2.94977C14.5395 2.35008 15.4606 2.35008 15.9603 2.94977L22.2103 10.4498C22.6523 10.9801 22.5806 11.7683 22.0503 12.2103C21.5199 12.6522 20.7317 12.5806 20.2898 12.0502L15 5.70256Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.37402 11.25C4.82174 11.25 4.37402 11.6977 4.37402 12.25V23.25C4.37402 24.9069 5.71717 26.25 7.37402 26.25H22.625C24.2819 26.25 25.625 24.9069 25.625 23.25V12.25C25.625 11.6977 25.1773 11.25 24.625 11.25H5.37402ZM17.4999 18.75C17.4999 20.1307 16.3806 21.25 14.9999 21.25C13.6192 21.25 12.4999 20.1307 12.4999 18.75C12.4999 17.3693 13.6192 16.25 14.9999 16.25C16.3806 16.25 17.4999 17.3693 17.4999 18.75Z" fill="white"/></svg>',
            }
          },
          "lineItem": {}
        }

        if(document.getElementById('buy-button-set-complete-mobile')){
          ui.createComponent('product', {
          id: [8623720366405],
          node: document.getElementById('buy-button-set-complete-mobile'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
        if(document.getElementById('buy-button-set-I-mobile')){
            ui.createComponent('product', {
            id: [7542825058534],
            node: document.getElementById('buy-button-set-I-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-set-II-mobile')){
            ui.createComponent('product', {
            id: [8021842854118],
            node: document.getElementById('buy-button-set-II-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-I-mobile')){
            ui.createComponent('product', {
            id: [7601486758118],
            node: document.getElementById('buy-button-step-I-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-II-mobile')){
            ui.createComponent('product', {
            id: [7609802686694],
            node: document.getElementById('buy-button-step-II-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-III-mobile')){
            ui.createComponent('product', {
            id: [7931357692134],
            node: document.getElementById('buy-button-step-III-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-IV-mobile')){
            ui.createComponent('product', {
            id: [7931360051430],
            node: document.getElementById('buy-button-step-IV-mobile'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-gift-card-mobile')){
          ui.createComponent('product', {
          id: [8578704736581],
          node: document.getElementById('buy-button-gift-card-mobile'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
          });
        }
        if(document.getElementById('buy-button-set-complete-desktop')){
          ui.createComponent('product', {
          id: [8623720366405],
          node: document.getElementById('buy-button-set-complete-desktop'),
          moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
          options: options
        });
      }
        if(document.getElementById('buy-button-set-I-desktop')){
            ui.createComponent('product', {
            id: [7542825058534],
            node: document.getElementById('buy-button-set-I-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-set-II-desktop')){
            ui.createComponent('product', {
            id: [8021842854118],
            node: document.getElementById('buy-button-set-II-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-I-desktop')){
            ui.createComponent('product', {
            id: [7601486758118],
            node: document.getElementById('buy-button-step-I-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-II-desktop')){
            ui.createComponent('product', {
            id: [7609802686694],
            node: document.getElementById('buy-button-step-II-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-III-desktop')){
            ui.createComponent('product', {
            id: [7931357692134],
            node: document.getElementById('buy-button-step-III-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-step-IV-desktop')){
            ui.createComponent('product', {
            id: [7931360051430],
            node: document.getElementById('buy-button-step-IV-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
            options: options
          });
        }
        if(document.getElementById('buy-button-gift-card-desktop')){
            ui.createComponent('product', {
            id: [8578704736581],
            node: document.getElementById('buy-button-gift-card-desktop'),
            moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
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

    if (deliveryDateDesktop != null) {
      deliveryDateDesktop.textContent = deliveryMessagePL;
      deliveryDateMobile.textContent = deliveryMessagePL;
    }
    deliveryTrashold.textContent = trasholdMessagePL;
    deliveryTime.textContent = deliveryMessagePL;

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
            domain: 'meercare.pl',
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
            "button": "Dodaj do koszyka",
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
        "templates": {
            "icon": '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M15 5.70256L9.71031 12.0502C9.26835 12.5806 8.48015 12.6522 7.9498 12.2103C7.41945 11.7683 7.3478 10.9801 7.78975 10.4498L14.0398 2.94977C14.5395 2.35008 15.4606 2.35008 15.9603 2.94977L22.2103 10.4498C22.6523 10.9801 22.5806 11.7683 22.0503 12.2103C21.5199 12.6522 20.7317 12.5806 20.2898 12.0502L15 5.70256Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.37402 11.25C4.82174 11.25 4.37402 11.6977 4.37402 12.25V23.25C4.37402 24.9069 5.71717 26.25 7.37402 26.25H22.625C24.2819 26.25 25.625 24.9069 25.625 23.25V12.25C25.625 11.6977 25.1773 11.25 24.625 11.25H5.37402ZM17.4999 18.75C17.4999 20.1307 16.3806 21.25 14.9999 21.25C13.6192 21.25 12.4999 20.1307 12.4999 18.75C12.4999 17.3693 13.6192 16.25 14.9999 16.25C16.3806 16.25 17.4999 17.3693 17.4999 18.75Z" fill="white"/></svg>',
        }
      },
      "lineItem": {}
    }

    if(document.getElementById('buy-button-set-complete-mobile')){
      ui.createComponent('product', {
      id: [8623720366405],
      node: document.getElementById('buy-button-set-complete-mobile'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
    if(document.getElementById('buy-button-set-I-mobile')){
        ui.createComponent('product', {
        id: [7542825058534],
        node: document.getElementById('buy-button-set-I-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-set-II-mobile')){
        ui.createComponent('product', {
        id: [8021842854118],
        node: document.getElementById('buy-button-set-II-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-I-mobile')){
        ui.createComponent('product', {
        id: [7601486758118],
        node: document.getElementById('buy-button-step-I-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-II-mobile')){
        ui.createComponent('product', {
        id: [7609802686694],
        node: document.getElementById('buy-button-step-II-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-III-mobile')){
        ui.createComponent('product', {
        id: [7931357692134],
        node: document.getElementById('buy-button-step-III-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-IV-mobile')){
        ui.createComponent('product', {
        id: [7931360051430],
        node: document.getElementById('buy-button-step-IV-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-gift-card-mobile')){
      ui.createComponent('product', {
      id: [8578704736581],
      node: document.getElementById('buy-button-gift-card-mobile'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
      });
    }
    if(document.getElementById('buy-button-set-complete-desktop')){
      ui.createComponent('product', {
      id: [8623720366405],
      node: document.getElementById('buy-button-set-complete-desktop'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
    if(document.getElementById('buy-button-set-I-desktop')){
        ui.createComponent('product', {
        id: [7542825058534],
        node: document.getElementById('buy-button-set-I-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-set-II-desktop')){
        ui.createComponent('product', {
        id: [8021842854118],
        node: document.getElementById('buy-button-set-II-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-I-desktop')){
        ui.createComponent('product', {
        id: [7601486758118],
        node: document.getElementById('buy-button-step-I-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-II-desktop')){
        ui.createComponent('product', {
        id: [7609802686694],
        node: document.getElementById('buy-button-step-II-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-III-desktop')){
        ui.createComponent('product', {
        id: [7931357692134],
        node: document.getElementById('buy-button-step-III-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-IV-desktop')){
        ui.createComponent('product', {
        id: [7931360051430],
        node: document.getElementById('buy-button-step-IV-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-gift-card-desktop')){
        ui.createComponent('product', {
        id: [8578704736581],
        node: document.getElementById('buy-button-gift-card-desktop'),
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

        deliveryTime.textContent = deliveryMessage;

    if (deliveryDateDesktop != null) {
      deliveryDateDesktop.textContent = deliveryMessage;
      deliveryDateMobile.textContent = deliveryMessage;
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
        "templates": {
            "icon": '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M15 5.70256L9.71031 12.0502C9.26835 12.5806 8.48015 12.6522 7.9498 12.2103C7.41945 11.7683 7.3478 10.9801 7.78975 10.4498L14.0398 2.94977C14.5395 2.35008 15.4606 2.35008 15.9603 2.94977L22.2103 10.4498C22.6523 10.9801 22.5806 11.7683 22.0503 12.2103C21.5199 12.6522 20.7317 12.5806 20.2898 12.0502L15 5.70256Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.37402 11.25C4.82174 11.25 4.37402 11.6977 4.37402 12.25V23.25C4.37402 24.9069 5.71717 26.25 7.37402 26.25H22.625C24.2819 26.25 25.625 24.9069 25.625 23.25V12.25C25.625 11.6977 25.1773 11.25 24.625 11.25H5.37402ZM17.4999 18.75C17.4999 20.1307 16.3806 21.25 14.9999 21.25C13.6192 21.25 12.4999 20.1307 12.4999 18.75C12.4999 17.3693 13.6192 16.25 14.9999 16.25C16.3806 16.25 17.4999 17.3693 17.4999 18.75Z" fill="white"/></svg>',
        }
      },
      "lineItem": {}
    }

    if(document.getElementById('buy-button-set-complete-mobile')){
      ui.createComponent('product', {
      id: [8623720366405],
      node: document.getElementById('buy-button-set-complete-mobile'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
    if(document.getElementById('buy-button-set-I-mobile')){
        ui.createComponent('product', {
        id: [7542825058534],
        node: document.getElementById('buy-button-set-I-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-set-II-mobile')){
        ui.createComponent('product', {
        id: [8021842854118],
        node: document.getElementById('buy-button-set-II-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-I-mobile')){
        ui.createComponent('product', {
        id: [7601486758118],
        node: document.getElementById('buy-button-step-I-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-II-mobile')){
        ui.createComponent('product', {
        id: [7609802686694],
        node: document.getElementById('buy-button-step-II-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-III-mobile')){
        ui.createComponent('product', {
        id: [7931357692134],
        node: document.getElementById('buy-button-step-III-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-IV-mobile')){
        ui.createComponent('product', {
        id: [7931360051430],
        node: document.getElementById('buy-button-step-IV-mobile'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-gift-card-mobile')){
      ui.createComponent('product', {
      id: [8578704736581],
      node: document.getElementById('buy-button-gift-card-mobile'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
      });
    }
    if(document.getElementById('buy-button-set-complete-desktop')){
      ui.createComponent('product', {
      id: [8623720366405],
      node: document.getElementById('buy-button-set-complete-desktop'),
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
      options: options
    });
  }
    if(document.getElementById('buy-button-set-I-desktop')){
        ui.createComponent('product', {
        id: [7542825058534],
        node: document.getElementById('buy-button-set-I-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-set-II-desktop')){
        ui.createComponent('product', {
        id: [8021842854118],
        node: document.getElementById('buy-button-set-II-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-I-desktop')){
        ui.createComponent('product', {
        id: [7601486758118],
        node: document.getElementById('buy-button-step-I-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-II-desktop')){
        ui.createComponent('product', {
        id: [7609802686694],
        node: document.getElementById('buy-button-step-II-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-III-desktop')){
        ui.createComponent('product', {
        id: [7931357692134],
        node: document.getElementById('buy-button-step-III-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-IV-desktop')){
        ui.createComponent('product', {
        id: [7931360051430],
        node: document.getElementById('buy-button-step-IV-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }
    if(document.getElementById('buy-button-gift-card-desktop')){
        ui.createComponent('product', {
        id: [8578704736581],
        node: document.getElementById('buy-button-gift-card-desktop'),
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20K%C4%8D',
        options: options
      });
    }

      });
    })
    }
    })();

};
