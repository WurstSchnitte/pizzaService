<?php
  $data = file_get_contents("php://input");// = json_decode();
  echo var_dump($data);
  echo $data[0];
  //echo var_dump($data);
?>
