var init = function(){
  var id = window.location.search.substr(1);

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
    }
  };
  xhr.open("GET", "../php/info.php?id="+id, true);
  xhr.send();
}
