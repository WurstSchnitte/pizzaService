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

  $sql = "SELECT pizza.name, pizzabestellung.zustand, pizzabestellung.id FROM pizzabestellung, pizza
                                                    WHERE pizzabestellung.bestellung_id = $row[id]
                                                    AND pizza.id = pizzabestellung.pizza_id";
  $result2 = $conn->query($sql);
  $j = 0;
  while($row2 = $result2->fetch_assoc()) {
    $array->bestellung[$i]->pizzen[$j] = new \stdClass;
    $array->bestellung[$i]->pizzen[$j]->id = $row2["id"];
    $array->bestellung[$i]->pizzen[$j]->name = $row2["name"];
    $array->bestellung[$i]->pizzen[$j]->zustand = $row2["zustand"];
    $j++;
  }
  $i++;
}
$conn->close();
echo json_encode($array);
?>
