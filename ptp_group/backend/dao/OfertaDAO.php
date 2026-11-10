<?php

// Importa la conexión a la base de datos
require_once __DIR__ . '/../config/database.php';

// Obtener todas las ofertas
function getOfertas($soloActivas) {

    $conn = conectar();

    if ($soloActivas === true || $soloActivas === 'true' || $soloActivas === '1') {
      $stmt = $conn->query("SELECT * FROM oferta where estado = 'Activa'");
    } else {
      $stmt = $conn->query("SELECT * FROM oferta");
    }

    return $stmt->fetch_all(MYSQLI_ASSOC);
}

function getOferta($titulo, $modalidad) {

    $conn = conectar();

    $sql = "SELECT * FROM oferta WHERE estado = 'Activa'";

    if ($titulo != "") {
        $sql .= " AND titulo LIKE ?";
    }

    if ($modalidad != "") {
        $sql .= " AND modalidad = ?";
    }

    $stmt = $conn->prepare($sql);

    if ($titulo != "" && $modalidad != "") {

      $buscar = "%".$titulo."%";

      $stmt->bind_param("ss", $buscar, $modalidad);

    } elseif ($titulo != "") {

      $buscar = "%".$titulo."%";

      $stmt->bind_param("s", $buscar);

    } elseif ($modalidad != "") {

      $stmt->bind_param("s", $modalidad);

    }


    $stmt->execute();

    $resultado = $stmt->get_result();

    $ofertas = [];

    if ($resultado->num_rows == 0) {
      return ['mensaje' => "No se ha encontrado ninguna oferta"];

    } else {
        
        while($fila = $resultado->fetch_assoc()) {

            $ofertas[] = $fila;
        }
    }

    return $ofertas;
}

function addOferta($titulo, $puesto, $descripcion, $direccion, $modalidad,$horario, $salario, $requisitos) {

  $conn = conectar();

  $stmt = $conn->prepare("INSERT into oferta (titulo, puesto, descripcion, direccion, modalidad, horario, salario, requisitos) values (?,?,?,?,?,?,?,?,?);");

  $stmt->bind_param("ssssssss", $titulo, $puesto, $descripcion, $direccion, $modalidad, $horario, $salario, $requisitos);

  return $stmt->execute();
}

function deleteOferta($id) {

  $conn = conectar();

  $stmt = $conn->prepare("DELETE from oferta where id = ?");

  $stmt->bind_param("i", $id);

  return $stmt->execute();
}

function estadoOferta($id, $estado) {

  $conn = conectar();

  $stmt = $conn->prepare("UPDATE oferta SET estado = ? where id = ?");

  $stmt->bind_param("si", $estado, $id);

  return $stmt->execute();
}