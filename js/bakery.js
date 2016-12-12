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
            };
            request.open("GET", "../php/mysql_check_bestellung_fertig.php?id="+this.responseText, true);
            request.send();
        }
    };
    xhr.open("GET", "../php/mysql_update_pizzabestellung_zustand_with_id.php?id="+bestellung+"&zustand="+zustand, true);
    xhr.send();
};

function refresh() {
    location.reload();
}

setInterval(function(){refresh()}, 20000);