var menuitems = [
  ['Margherita',5.99],
  ['Tuna',7.99],
  ['Europa', 8.99],
  ['Salami', 8.99],
  ['Funghi', 8.99],
  ['Fuoco', 8.99],
  ['Schinken', 8.99],
  ['Diavolo', 8.99]
];

var auswahl = [];
var sum = 0;

var fill = function(){
  var menulist = document.getElementById("menulist");
  for(var i=0; i<menuitems.length; i++){
    var menuitem = document.createElement("button");
    var nameLabel = document.createElement("span");
    var priceLabel = document.createElement("span");

    nameLabel.className = "left menuitem";
    priceLabel.className = "right menuitem";

    nameLabel.textContent = menuitems[i][0];
    priceLabel.textContent = menuitems[i][1]+" €";

    menuitem.id=i;
    menuitem.type="button";
    menuitem.onclick = function(){
      add(this.id);
    }
    menuitem.appendChild(nameLabel);
    menuitem.appendChild(priceLabel);

    menulist.appendChild(menuitem);
  }
}

var add = function(artNr){
  auswahl.push(menuitems[artNr]);
  update();
}

var rem = function(all){
  if(!all) {
    var auswahlSelect = document.getElementById("auswahl");
    for(var i=auswahlSelect.length-1; i>=0; i--){
      if(auswahlSelect[i].selected)
        auswahl.splice(i,1);
    }
  }
  else auswahl = [];
  update();
}

var update = function(){
  var auswahlSelect = document.getElementById("auswahl");

  while(auswahlSelect.firstChild)
    auswahlSelect.removeChild(auswahlSelect.firstChild);

  for(var i=0; i<auswahl.length; i++){
    var el = document.createElement("option");
    el.textContent = auswahl[i][0];
    auswahlSelect.appendChild(el);
  }

  var price = document.getElementById("price");
  sum = 0;

  for(var i=0; i<auswahl.length; i++){
    sum += auswahl[i][1];
  }
  price.textContent = Math.round(sum*100)/100 + " €";
}

var submit2 = function(){
  var s="Ihre Bestellung:\n";
  for(var i=0; i<auswahl.length; i++){
    s+=auswahl[i][0]+"\n";
  }
  s+="Ihr Preis: "+sum+" €";
  alert(s);
}
