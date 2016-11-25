<?php
  $data = file_get_contents("php://input", 0, null, null);// = json_decode();
  $json = json_decode($data);
  $bestellung = $json->bestellung;
  for($i = 0; $i < sizeof($bestellung); $i++){
    
  }

  //echo var_dump($data);
?>
