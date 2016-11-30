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
if($_GET['id'] != "all"){
  $sql = "SELECT * FROM bestellung WHERE bestellung.id = $_GET[id]";
}else{
  $sql = "SELECT * FROM bestellung";
}
$result = $conn->query($sql);
$index = 0;
$array = new \stdClass;
while($row = $result->fetch_assoc()){
  $array->bestellung[$index] = new \stdClass;
  $array->bestellung[$index]->id = $row['id'];
  $array->bestellung[$index]->zustand = $row['zustand'];

  $sql = "SELECT pizza.name, pizzabestellung.zustand FROM pizzabestellung, pizza
                                                  WHERE pizzabestellung.bestellung_id = $row[id]
                                                  AND pizza.id = pizzabestellung.pizza_id";
  $result2 = $conn->query($sql);
  // output data of each row
  $i = 0;
  while($row2 = $result2->fetch_assoc()) {
    $array->bestellung[$index]->pizzen[$i] = new \stdClass;
    $array->bestellung[$index]->pizzen[$i]->name=$row2["name"];
    $array->bestellung[$index]->pizzen[$i]->zustand=$row2["zustand"];
    $i++;
  }
  $index++;
}
$conn->close();
if ($index > 0) {
    echo json_encode($array);
}
else {
  echo -1;
}
?>
