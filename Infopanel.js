const href = window.location.href;
const findTermInfoPanel = (term) => {
  if (href.includes(term)){
    return href;
  }
};

switch (href) {
  // English
  case findTermInfoPanel('en.meer.care'):
    document.getElementById("delivery-treshold").innerHTML = "Free delivery from $50"
    //document.getElementById("delivery-speed").innerHTML = "Free delivery from $50"
  break;
  
  // Slovakia
  case findTermInfoPanel('sk.meer.care'):
    document.getElementById("delivery-treshold").innerHTML = "Doprava zadarmo od €50"
    //document.getElementById("delivery-speed").innerHTML = "Doprava zadarmo od €50"
  break;

  // Germany
  case findTermInfoPanel('de.meer.care'):
    document.getElementById("delivery-treshold").innerHTML = "Kostenloser Versand ab €60"
    //document.getElementById("delivery-speed").innerHTML = "Kostenloser Versand ab €60"
  break;

  // France
  case findTermInfoPanel('fr.meer.care'):
    document.getElementById("delivery-treshold").innerHTML = "Frais de port offerts à partir de €60"
    //document.getElementById("delivery-speed").innerHTML = "Frais de port offerts à partir de €60"
  break;

  // Poland
  case findTermInfoPanel('pl.meer.care'):
    document.getElementById("delivery-treshold").innerHTML = "Darmowa wysyłka od 200 zł"
    //document.getElementById("delivery-speed").innerHTML = "Darmowa wysyłka od 200 zł"
  break;

  // Default
  default:
    document.getElementById("delivery-treshold").innerHTML = "Nyní doprava zdarma"
    //document.getElementById("delivery-speed").innerHTML = "Nyní doprava zdarma"
};
