<?php

// Importa la conexión a la base de datos
require_once __DIR__ . '/../config/database.php';

function getDatosAdmin() {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT COUNT(*) AS total_usuarios FROM usuario");
    $stmt->execute();
    $resultadoUsuarios = $stmt->get_result();
    $totalUsuarios = $resultadoUsuarios->fetch_assoc()['total_usuarios'];

    $stmt = $conn->prepare("SELECT COUNT(*) AS total_ofertas FROM oferta WHERE estado = 'Activa'");
    $stmt->execute();
    $resultadoOfertas = $stmt->get_result();
    $totalOfertas = $resultadoOfertas->fetch_assoc()['total_ofertas'];

    $stmt = $conn->prepare("SELECT COUNT(*) AS total_postulaciones FROM postulacion");
    $stmt->execute();
    $resultadoPostulaciones = $stmt->get_result();
    $totalPostulaciones = $resultadoPostulaciones->fetch_assoc()['total_postulaciones'];

    return [
        'success' => true,
        'totalUsuarios' => (int)$totalUsuarios,
        'totalOfertas' => (int)$totalOfertas,
        'totalPostulaciones' => (int)$totalPostulaciones
    ];
}