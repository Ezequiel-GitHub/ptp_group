<?php

// Importa la conexión a la base de datos
require_once __DIR__ . '/../config/database.php';

function getDatosAdmin() {

    $conn = conectar();

    $sql = "SELECT 
            (SELECT COUNT(*) FROM usuario) AS total_usuarios, 
            (SELECT COUNT(*) FROM oferta) AS total_ofertas, 
            (SELECT COUNT(*) FROM postulacion) AS total_postulaciones";

    $stmt = $conn->prepare($sql);

    $stmt->execute();

    $resultado = $stmt->get_result();

    $datos = $resultado->fetch_assoc();

    return [
        'success' => true,
        'totalUsuarios' => (int)$datos['total_usuarios'],
        'totalOfertas' => (int)$datos['total_ofertas'],
        'totalPostulaciones' => (int)$datos['total_postulaciones']
    ];
}