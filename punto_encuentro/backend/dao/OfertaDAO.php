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

function getOferta($titulo) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT * FROM oferta WHERE titulo LIKE ? AND estado = 'Activa'");

    $buscar = "%".$titulo."%";

    $stmt->bind_param("s", $buscar);

    $stmt->execute();

    $resultado = $stmt->get_result();

    $ofertas = [];

    if ($resultado->num_rows == 0) {
      return ['mensaje' => "No se ha encontrado ninguna oferta"];

    } else {
        $fila = $resultado->fetch_assoc();

        $ofertas[] = $fila;
    }

    return $ofertas;
}

function addOferta($titulo, $puesto, $direccion, $horario, $salario, $requisitos) {

  $conn = conectar();

  $stmt = $conn->prepare("INSERT into oferta (titulo, puesto, direccion, horario, salario, requisitos) values (?,?,?,?,?,?);");

  $stmt->bind_param("ssssss", $titulo, $puesto, $direccion, $horario, $salario, $requisitos);

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