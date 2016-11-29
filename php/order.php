<?php
  $data = file_get_contents("php://input", 0, null, null);// = json_decode();
  $json = json_decode($data);
  $bestellung = $json->bestellung;
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
  $sql = "INSERT INTO `bestellung` (`id`, `adresse`, `preis`) VALUES (NULL, '$json->adresse', 0)";
  if ($conn->query($sql) === TRUE) {
      //echo "New record created successfully";
  } else {
      //echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $sql = "SELECT id FROM bestellung WHERE bestellung.adresse = '$json->adresse'";
  $result = $conn->query($sql);

  $bestellungsid = $result->fetch_assoc();

  for($i = 0; $i < sizeof($bestellung); $i++){
     $sql = "INSERT INTO `pizzabestellung` (`pizza_id`, `bestellung_id`, 'zustand') VALUES ('$bestellung[$i]', '$bestellungsid[id]', 0)";
     if ($conn->query($sql) === TRUE) {
         //echo "New record created successfully";
     } else {
         //echo "Error: " . $sql . "<br>" . $conn->error;
     }
  }
  $conn->close();
  echo $bestellungsid['id'];
?>
