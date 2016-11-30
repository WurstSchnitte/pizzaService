var init = function(){
  "use strict";
  var id = window.location.search.substr(1);

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
      if (this.responseText != "-1") {
          fillStatus(this.responseText);
      }
    }
  };
  xhr.open("GET", "../php/mysql_get_bestellung_with_id.php?id="+id, true);
  xhr.send();
};

var fillStatus = function(list){
  "use strict";
  var liste = JSON.parse(list).bestellung;
  for(var index = 0; index < liste.length; index++){
    if(liste[index].zustand != 3){
      var menuitems = liste[index].pizzen;
      var content = document.getElementById("info");
      var form = document.createElement("form");
      var fieldset = document.createElement("fieldset");
      var legend = document.createElement("legend");
      legend.innerHTML = liste[index].id;
      fieldset.appendChild(legend);

      var table = document.createElement("table");
      var tablebody = document.createElement("tbody");

      var currentRow = document.createElement("tr");
      var currentCell = document.createElement("th");
      var currentText = document.createTextNode("fertig");
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);

      currentCell = document.createElement("th");
      currentText = document.createTextNode("unterwegs");
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);
      tablebody.appendChild(currentRow);

      var fertig = "O";
      var unterwegs = "O";
      if(liste[index].zustand == 1){
        fertig = "X";
      }else if(liste[index].zustand == 2){
        unterwegs = "X";
      }

      currentRow = document.createElement("tr");
      currentCell = document.createElement("td");
      currentText = document.createTextNode(fertig);
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);

      currentCell = document.createElement("th");
      currentText = document.createTextNode(unterwegs);
      currentCell.appendChild(currentText);
      currentRow.appendChild(currentCell);

      tablebody.appendChild(currentRow);
      table.appendChild(tablebody);
      fieldset.appendChild(table);

      table = document.createElement("table");
      tablebody = document.createElement("tbody");

      currentRow = document.createElement("tr");
      //PIZZANAME
      currentCell = document.createElement("th");
      currentText = document.createTextNode("Pizza");
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

      for (var i = 0; menuitems.length > i; i++) {
        var bestellt = "O";
        var imofen = "O";
        fertig = "O";

        if(menuitems[i].zustand == 0){
          bestellt = "X";
        }else if(menuitems[i].zustand == 1){
          imofen = "X";
        }else if(menuitems[i].zustand == 2){
          fertig = "X";
        }

        currentRow = document.createElement("tr");
        //PIZZANAME
        currentCell = document.createElement("td");
        currentText = document.createTextNode(menuitems[i].name);
        currentCell.appendChild(currentText);
        currentRow.appendChild(currentCell);

        //PIZZAZUSTAND
        currentCell = document.createElement("td");
        currentText = document.createTextNode(bestellt);
        currentCell.appendChild(currentText);
        currentRow.appendChild(currentCell);

        currentCell = document.createElement("td");
        currentText = document.createTextNode(imofen);
        currentCell.appendChild(currentText);
        currentRow.appendChild(currentCell);

        currentCell = document.createElement("td");
        currentText = document.createTextNode(fertig);
        currentCell.appendChild(currentText);
        currentRow.appendChild(currentCell);

        tablebody.appendChild(currentRow);
      }
      table.appendChild(tablebody);
      fieldset.appendChild(table);
      form.appendChild(fieldset);
    }
    content.appendChild(form);
  }
};
