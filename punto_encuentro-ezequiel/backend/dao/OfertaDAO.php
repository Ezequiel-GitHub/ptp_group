<?php

// Importa la conexión a la base de datos
require_once __DIR__ . '/../config/database.php';

// Obtener todas las ofertas
function getOfertas() {

  // Se conecta a la base
  $conn = conectar();

  // Ejecuta la consulta
  $resultado = $conn->query("SELECT * FROM oferta");

  // Devuelve los datos en formato array
  return $resultado->fetch_all(MYSQLI_ASSOC);
}

function getOferta($titulo) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT * FROM oferta WHERE titulo LIKE ?");

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

