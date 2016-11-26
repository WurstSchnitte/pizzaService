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
  if($_GET['zustand'] == "bestellt"){
    $zustand = 0;
  }else if($_GET['zustand'] == "im Ofen"){
    $zustand = 1;
  }else if($_GET['zustand'] == "fertig"){
    $zustand = 2;
  }
  echo $zustand;
  $sql = "UPDATE pizzabestellung SET zustand = $zustand WHERE pizzabestellung.id = $_GET[id]";
  if ($conn->query($sql) === TRUE) {
      //echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }
?>
