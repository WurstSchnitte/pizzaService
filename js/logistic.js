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

function refresh() {
    location.reload();
}

setInterval(function(){refresh()}, 20000);