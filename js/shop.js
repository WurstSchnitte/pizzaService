var auswahl = [];
var menuitems = [];
var sum = 0;

var init=function(){
  "use strict";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      menuitems = JSON.parse(this.responseText).menuitems;
      fill();
    }
  };
  xhr.open("GET", "../php/mysql_get_every_pizza.php", true);
  xhr.send();
};

var fill = function(){
  "use strict";
  var menulist = document.getElementById("menulist");
  for(var i=0; i<menuitems.length; i++){
    var menuitem = document.createElement("button");
    var nameLabel = document.createElement("span");
    var priceLabel = document.createElement("span");

    nameLabel.className = "left menuitem";
    priceLabel.className = "right menuitem";

    nameLabel.textContent = menuitems[i].name;
    priceLabel.textContent = menuitems[i].preis + "€";

    menuitem.id=i;
    menuitem.type="button";
    menuitem.onclick = function(){
      add(this.id);
    };
    menuitem.appendChild(nameLabel);
    menuitem.appendChild(priceLabel);

    menulist.appendChild(menuitem);
  }
};

var add = function(artNr){
  "use strict";
  auswahl.push(menuitems[artNr]);
  update();
};

var rem = function(all){
  "use strict";
  if(!all) {
    var auswahlSelect = document.getElementById("auswahl");
    for(var i=auswahlSelect.length-1; i>=0; i--){
      if(auswahlSelect[i].selected)
        auswahl.splice(i,1);
    }
  }
  else auswahl = [];
  update();
};

var update = function(){
  "use strict";
  var auswahlSelect = document.getElementById("auswahl");

  while(auswahlSelect.firstChild)
    auswahlSelect.removeChild(auswahlSelect.firstChild);

  for(var i=0; i<auswahl.length; i++){
    var el = document.createElement("option");
    el.textContent = auswahl[i].name;
    auswahlSelect.appendChild(el);
  }

  var price = document.getElementById("price");
  var sum = 0;

  for(i=0; i<auswahl.length; i++){
    sum += Math.abs(auswahl[i].preis);
  }
  price.textContent = Math.round(sum*100)/100 + " €";
};

var submit2 = function(){
  "use strict";
  var s="Ihre Bestellung:\n";
  var bst = [];
  var adr = document.getElementById("adr").value;

  for(var i=0; i<auswahl.length; i++){
    s+=auswahl[i].name+"\n";
    bst.push(auswahl[i].id);
  }

  if(auswahl.length != 0 && adr != ""){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        //console.log(this.responseText);
        window.location.href = "info.html?"+this.responseText;
      }
    };
    xhr.open("POST", "../php/mysql_insert_bestellung.php", true);

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var par = {
      "adresse": adr,
      "bestellung": bst
    };
    xhr.send(JSON.stringify(par));
  }

};
