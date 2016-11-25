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

$sql = "SELECT * FROM Pizza";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  $array
  $i = 0;
  while($row = $result->fetch_assoc()) {
    $array->menuitems[i]->id=$id;
    $array->menuitems[i]->name=$id;
    $array->menuitems[i]->preis=$id;
  }
} else {
  echo "0 results";
}
$conn->close();
echo json_encode($array);
 ?>
