var auswahl = [];
var menuitems = [];
var sum = 0;

var init=function(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(JSON.parse(this.responseText).menuitems);
      menuitems = JSON.parse(this.responseText).menuitems;
      fill();
    }
  };
  xhr.open("GET", "../php/pizzen.php", true);
  xhr.send();
}

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
  auswahl.push(menuitems[artNr].id);
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
    el.textContent = menuitems[auswahl[i]].name;
    auswahlSelect.appendChild(el);
  }

  var price = document.getElementById("price");
  sum = 0;

  for(i=0; i<auswahl.length; i++){
    sum += 0;//auswahl[i][1];
  }
  price.textContent = Math.round(sum*100)/100 + " €";
};

var submit2 = function(){
  "use strict";
  var s="Ihre Bestellung:\n";
  for(var i=0; i<auswahl.length; i++){
    s+=menuitems[auswahl[i]].name+"\n";
  }
  s+="Ihr Preis: "+sum+" €";
  if(auswahl.length != 0){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        console.log(this.responseText);
      }
    };
    xhr.open("POST", "../php/bestellung.php", true);

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var par = {
      "adresse": document.getElementById("adr").value,
      "bestellung": auswahl
    };
    xhr.send(JSON.stringify(par));
  }
};
