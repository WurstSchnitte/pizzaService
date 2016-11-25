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

$sql = "SELECT pizza.name, pizzabestellung.zustand FROM pizzabestellung, pizza
                                                  WHERE pizzabestellung.bestellung_id = $_GET[id]
                                                  AND pizza.id = pizzabestellung.pizza_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  $i = 0;
  while($row = $result->fetch_assoc()) {
    $array->menuitems[$i] = new \stdClass;
    $array->menuitems[$i]->name=$row["name"];
    $array->menuitems[$i]->zustand=$row["zustand"];
    $i++;
  }
} else {
  echo "0 results";
}
$conn->close();
?>
