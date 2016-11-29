var init = function(){
  "use strict";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
      fillStatus(this.responseText);
    }
  };
  xhr.open("GET", "../php/mysql_get_every_pizzabestellung.php", true);
  xhr.send();
}

var fillStatus = function(list){
  "use strict";
  var bestellung = JSON.parse(list).bestellung;
  var bakery = document.getElementById("bakery");
  for (var i = 0; bestellung.length > i; i++) {
    if(bestellung[i].zustand == 0){
      var form = document.createElement("form");
      var fieldset = document.createElement("fieldset");
      var legend = document.createElement("legend");
      legend.innerHTML=bestellung[i].id;
      fieldset.appendChild(legend);

      var table = document.createElement("table");
      var tablebody = document.createElement("tbody");

      var currentRow = document.createElement("tr");
      //PIZZANAME
      var currentCell = document.createElement("th");
      var currentText = document.createTextNode("Pizza");
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);
      //PIZZAZUSTAND
      currentCell = document.createElement("th");
      currentText = document.createTextNode("bestellt");
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);
      currentCell = document.createElement("th");
      currentText = document.createTextNode("im Ofen");
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);
      currentCell = document.createElement("th");
      currentText = document.createTextNode("fertig");
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);
      tablebody.appendChild(currentRow);
      for(var j = 0; j < bestellung[i].pizzen.length; j++){
        currentRow = document.createElement("tr");
        //PIZZANAME
    		currentCell = document.createElement("td");
    		currentText = document.createTextNode(bestellung[i].pizzen[j].name);
    		currentCell.appendChild(currentText);
    		currentRow.appendChild(currentCell);

        //PIZZAZUSTAND
    		currentCell = document.createElement("td");
        var input = document.createElement("input");
        input.name = bestellung[i].pizzen[j].id;
        input.type = "radio";
        input.value = "bestellt";
        if(bestellung[i].pizzen[j].zustand == 0){
          input.checked = true;
        }
        input.onclick = function(){changeStatus(this.name, this.value)};
        currentCell.appendChild(input);
    		currentRow.appendChild(currentCell);
    		currentCell = document.createElement("td");
        input = document.createElement("input");
        input.name = bestellung[i].pizzen[j].id;
        input.type = "radio";
        input.value = "im Ofen";
        if(bestellung[i].pizzen[j].zustand == 1){
          input.checked = true;
        }
        input.onclick = function(){changeStatus(this.name, this.value)};
        currentCell.appendChild(input);
    		currentRow.appendChild(currentCell);
    		currentCell = document.createElement("td");
        input = document.createElement("input");
        input.name = bestellung[i].pizzen[j].id;
        input.type = "radio";
        input.value = "fertig";
        if(bestellung[i].pizzen[j].zustand == 2){
          input.checked = true;
        }
        input.onclick = function(){changeStatus(this.name, this.value)};
        currentCell.appendChild(input);
    		currentRow.appendChild(currentCell);
    		tablebody.appendChild(currentRow);
    	}
    	table.appendChild(tablebody);
      fieldset.appendChild(table);
      form.appendChild(fieldset);
      bakery.appendChild(form);
    }
  }
}

var changeStatus = function(bestellung, zustand){
  "use strict";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
      var request = new XMLHttpRequest();
      request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          console.log(this.responseText);
        }
      }
      request.open("GET", "../php/mysql_check_bestellung_fertig.php?id="+this.responseText, true);
      request.send();
    };
  }
  xhr.open("GET", "../php/mysql_update_pizzabestellung_zustand_with_id.php?id="+bestellung+"&zustand="+zustand, true);
  xhr.send();
}
