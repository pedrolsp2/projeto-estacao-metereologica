<?php
include('conection/index.php'); 
class querrySql {
  private $mysqli;

  public function __construct($mysqli) {
    $this->mysqli = $mysqli;
  }

  public function getQuerrySql() {
   // com servidor $sql = "SELECT * FROM tabela4 WHERE date BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()";
   $sql = "SELECT * FROM tabela4 WHERE date <= (SELECT MAX(date) FROM tabela4) AND date >= DATE_SUB((SELECT MAX(date) FROM tabela4), INTERVAL 7 DAY)";   
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
