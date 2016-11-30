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

$sql = "SELECT * FROM bestellung";
$result = $conn->query($sql);
$i = 0;
while($row = $result->fetch_assoc()) {
  $array->bestellung[$i] = new \stdClass;
  $array->bestellung[$i]->id = $row['id'];
  $array->bestellung[$i]->adresse = $row['adresse'];
  $array->bestellung[$i]->zustand = $row['zustand'];
  $i++;
}
$conn->close();
if ($i > 0) {
  echo json_encode($array);
}
else {
  echo -1;
}
?>
