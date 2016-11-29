<?php
  $servername = "localhost";
  $username = "pizzaService";
  $password = "wert";
  $dbname = "pizzaService";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $sql = "SELECT * FROM pizzabestellung WHERE $_GET[id] = pizzabestellung.bestellung_id";
  $result = $conn->query($sql);
  $lowest = 10;
  while($row = $result->fetch_assoc()){
    if($lowest > $row['zustand']){
      $lowest = $row['zustand'];
    }
  }
  if($lowest == 2){
    $sql = "UPDATE bestellung SET zustand = 1 WHERE bestellung.id = $_GET[id]";
    if ($conn->query($sql) === TRUE) {
      //echo "Record updated successfully";
    } else {
      //echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
  $conn->close();
?>
