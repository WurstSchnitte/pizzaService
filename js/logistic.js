var init = function(){
  "use strict";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
      if (this.responseText != "-1") {
          fillStatus(this.responseText);
      }
    }
  };
  xhr.open("GET", "../php/mysql_get_every_bestellung.php", true);
  xhr.send();
};

var fillStatus = function(list){
  "use strict";
  var bestellung = JSON.parse(list).bestellung;
  var logistic = document.getElementById("logistic");

  for (var i = 0; bestellung.length > i; i++) {
    if(bestellung[i].zustand != 0){
      var form = document.createElement("form");
      var fieldset = document.createElement("fieldset");
      var legend = document.createElement("legend");
      legend.innerHTML = "ID: " + bestellung[i].id + " Adresse: " + bestellung[i].adresse;
      fieldset.appendChild(legend);

      var table = document.createElement("table");
      var tablebody = document.createElement("tbody");
      var currentRow = document.createElement("tr");
      //BESTELLLABEL
      var currentCell = document.createElement("th");
      var currentText = document.createTextNode("fertig");
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);

      //BESTELLZUSTAND
      currentCell = document.createElement("th");
      currentText = document.createTextNode("unterwegs");
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);

      currentCell = document.createElement("th");
      currentText = document.createTextNode("ausgeliefert");
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);
      tablebody.appendChild(currentRow);

      currentRow = document.createElement("tr");
  		currentCell = document.createElement("td");
      var input = document.createElement("input");
      input.name = bestellung[i].id;
      input.type = "radio";
      input.value = "fertig";
      if(bestellung[i].zustand == 1){
        input.checked = true;
      }
      input.onclick = function(){changeStatus(this.name, this.value);};
      currentCell.appendChild(input);
  		currentRow.appendChild(currentCell);

    	currentCell = document.createElement("td");
      input = document.createElement("input");
      input.name = bestellung[i].id;
      input.type = "radio";
      input.value = "unterwegs";
      if(bestellung[i].zustand == 2){
        input.checked = true;
      }
      input.onclick = function(){changeStatus(this.name, this.value);};
      currentCell.appendChild(input);
  		currentRow.appendChild(currentCell);

  		currentCell = document.createElement("td");
      input = document.createElement("input");
      input.name = bestellung[i].id;
      input.type = "radio";
      input.value = "ausgeliefert";
      if(bestellung[i].zustand == 3){
        input.checked = true;
      }
      input.onclick = function(){changeStatus(this.name, this.value);};
      currentCell.appendChild(input);
  		currentRow.appendChild(currentCell);
  		tablebody.appendChild(currentRow);
      table.appendChild(tablebody);
      fieldset.appendChild(table);
      form.appendChild(fieldset);
      logistic.appendChild(form);
    }
  }
};

var changeStatus = function(bestellung, zustand){
  "use strict";
  console.log(bestellung + " " + zustand);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
    }
  };
  xhr.open("GET", "../php/mysql_update_bestellung_zustand_with_id.php?id="+bestellung+"&zustand="+zustand, true);
  xhr.send();
};
