<?php

// Importa la conexión a la base de datos
require_once __DIR__ . '/../config/database.php';

// Obtener todas las ofertas
function getOfertas($soloActivas) {

    $conn = conectar();

    $sql = "SELECT * FROM oferta";

    if ($soloActivas === "true") {
        $sql .= " WHERE estado = 'Activa'";
    } 

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    $resultado = $stmt->get_result();

    return $resultado->fetch_all(MYSQLI_ASSOC);
}

function getOferta($soloActivas, $titulo, $modalidad, $salario, $requisitos) {

    $conn = conectar();

    $tituloLike = $titulo ? "%" . $titulo . "%" : null;
    $requisitosLike = $requisitos ? "%" . $requisitos . "%" : null;

    $sql = "SELECT * FROM oferta 
            WHERE (? IS NULL OR titulo LIKE ?) 
            AND (? IS NULL OR modalidad = ?) 
            AND (? IS NULL OR salario >= ?) 
            AND (? IS NULL OR requisitos LIKE ?)";

    if ($soloActivas === "true") {
        $sql .= " AND estado = 'Activa'";
    }

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("ssssssss", $tituloLike, $tituloLike, $modalidad, $modalidad, $salario, $salario, $requisitosLike, $requisitosLike);

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