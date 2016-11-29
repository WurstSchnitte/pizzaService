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
  if($_GET['zustand'] == "fertig"){
    $zustand = 1;
  }else if($_GET['zustand'] == "unterwegs"){
    $zustand = 2;
  }else if($_GET['zustand'] == "ausgeliefert"){
    $zustand = 3;
  }
  $sql = "UPDATE bestellung SET zustand = $zustand WHERE bestellung.id = $_GET[id]";
  if ($conn->query($sql) === TRUE) {
      echo "Record updated successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }
?>
