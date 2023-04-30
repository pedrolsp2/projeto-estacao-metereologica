<?php
include('conection/index.php'); 

class temperature {
  private $mysqli;

  public function __construct($mysqli) {
    $this->mysqli = $mysqli;
  }

  public function getTemperature() {
    $sql = "SELECT date, temperature from tabela4";
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

class solarRadiation {
  private $mysqli;

  public function __construct($mysqli) {
    $this->mysqli = $mysqli;
  }

  public function getSolarRadiation() {
    $sql = "SELECT date, Solar_Radiation from tabela4";
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

class RH {
  private $mysqli;

  public function __construct($mysqli) {
    $this->mysqli = $mysqli;
  }

  public function getRH() {
    $sql = "SELECT date, RH from tabela4";
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

$temperature = new temperature($mysqli);
$solarRadiation = new solarRadiation($mysqli);
$rh = new rh($mysqli);

$data = array(
  'temperature' => $temperature->getTemperature(),
  'solarRadiation' => $solarRadiation->getSolarRadiation(),
  'rh' => $rh->getRH()
);

$mysqli->close();

echo json_encode($data);
?>
