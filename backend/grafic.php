<?php
include('conection/index.php'); 
class querrySql {
  private $mysqli;

  public function __construct($mysqli) {
    $this->mysqli = $mysqli;
  }

  public function getQuerrySql() {
    $sql = "SELECT * from tabela4";
    $result = $this->mysqli->query($sql);
    $data = array();

    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $data[] = $row;
      }
    }

    return $data;
  }
}

$querry = new querrySql($mysqli);

$data = array('querry' => $querry->getQuerrySql()
);

$mysqli->close();

echo json_encode($data);
?>
