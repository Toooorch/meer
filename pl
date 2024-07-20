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
            domain: 'meercare.pl',
            storefrontAccessToken: 'c4b5fbfff55de13f529ecadc6984f218',
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
        "templates": {
            "icon": '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M15 5.70256L9.71031 12.0502C9.26835 12.5806 8.48015 12.6522 7.9498 12.2103C7.41945 11.7683 7.3478 10.9801 7.78975 10.4498L14.0398 2.94977C14.5395 2.35008 15.4606 2.35008 15.9603 2.94977L22.2103 10.4498C22.6523 10.9801 22.5806 11.7683 22.0503 12.2103C21.5199 12.6522 20.7317 12.5806 20.2898 12.0502L15 5.70256Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.37402 11.25C4.82174 11.25 4.37402 11.6977 4.37402 12.25V23.25C4.37402 24.9069 5.71717 26.25 7.37402 26.25H22.625C24.2819 26.25 25.625 24.9069 25.625 23.25V12.25C25.625 11.6977 25.1773 11.25 24.625 11.25H5.37402ZM17.4999 18.75C17.4999 20.1307 16.3806 21.25 14.9999 21.25C13.6192 21.25 12.4999 20.1307 12.4999 18.75C12.4999 17.3693 13.6192 16.25 14.9999 16.25C16.3806 16.25 17.4999 17.3693 17.4999 18.75Z" fill="white"/></svg>',
        }
      },
      "lineItem": {}
    }

    if(document.getElementById('buy-button-set-complete')){
      ui.createComponent('product', {
      id: [8566259745033],
      node: setComplete,
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
      options: options
    });
  }
    if(document.getElementById('buy-button-set-I')){
        ui.createComponent('product', {
        id: [8566259712265],
        node: setI,
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
        options: options
      });
    }
    if(document.getElementById('buy-button-set-II')){
        ui.createComponent('product', {
        id: [8566259974409],
        node: setII,
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-I')){
        ui.createComponent('product', {
        id: [8566260039945],
        node: stepI,
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-II')){
        ui.createComponent('product', {
        id: [8566260072713],
        node: stepII,
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-III')){
        ui.createComponent('product', {
        id: [8566260105481],
        node: stepIII,
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
        options: options
      });
    }
    if(document.getElementById('buy-button-step-IV')){
        ui.createComponent('product', {
        id: [8566260171017],
        node: stepIV,
        moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
        options: options
      });
    }
    if(document.getElementById('buy-button-gift-card')){
      ui.createComponent('product', {
      id: [8567132815625],
      node: giftCard,
      moneyFormat: '%7B%7Bamount_with_comma_separator%7D%7D%20z%C5%82',
      options: options
      });
    }

      
      });
    })
    }
    })();
    break;
