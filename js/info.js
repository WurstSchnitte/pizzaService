var init = function(){
  "use strict";
  var id = window.location.search.substr(1);

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
      fillStatus(this.responseText);
    }
  };
  xhr.open("GET", "../php/mysql_get_bestellung_with_id.php?id="+id, true);
  xhr.send();
}

var fillStatus = function(list){
  var menuitems = JSON.parse(list).menuitems;
  var myTable = document.getElementById("infoTable");
  var mytablebody = document.createElement("tbody");

  	for (var i = 0; menuitems.length > i; i++) {
      var bestellt = "";
      var imofen = "";
      var fertig = "";
      var unterwegs = "";

      if(menuitems[i].zustand == 0){
        bestellt = "X";
      }else if(menuitems[i].zustand == 1){
        imofen = "X";
      }else if(menuitems[i].zustand == 2){
        fertig = "X";
      }else if(menuitems[i].zustand == 3){
        unterwegs = "X";
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
  		currentCell = document.createElement("td");
  		currentText = document.createTextNode(unterwegs);
  		currentCell.appendChild(currentText);
  		currentRow.appendChild(currentCell);
  		mytablebody.appendChild(currentRow);
  	}
  	myTable.appendChild(mytablebody);
}
