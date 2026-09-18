<?php

// Importa la conexión a la base de datos
require_once __DIR__ . '/../config/database.php';

function getPostulacionesUsuario($id_usuario) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT * from postulacion where id_usuario = ?");

    $stmt->bind_param("i", $id_usuario);

    $stmt->execute();

    $resultado = $stmt->get_result();

    return $resultado->fetch_all(MYSQLI_ASSOC);
}

function postulados($id_oferta) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT usuario.* FROM usuario INNER JOIN postulacion ON usuario.id = postulacion.id_usuario WHERE postulacion.id_oferta = ?");

    $stmt->bind_param("i", $id_oferta);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 0) {
        return ['mensaje' => "No hay postulados"];
    }
    return $resultado->fetch_all(MYSQLI_ASSOC);
}

function deletePostulaciones($id) {

    $conn = conectar();

    $stmt = $conn->prepare("DELETE from postulacion where id = ?");

    $stmt->bind_param("i", $id);

    return $stmt->execute();
}

function estadoPostulacion($id, $estado) {
 
    $conn = conectar();

    $stmt = $conn->prepare("UPDATE postulacion SET estado = ? where id = ?");

    $stmt->bind_param("ib", $id, $estado);

    $stmt->execute();
}

function addPostulacion($id_usuario, $id_oferta) { 

    $conn = conectar();

    $stmt = $conn->prepare("SELECT * from postulacion where id_usuario = ? AND id_oferta = ?");

    $stmt->bind_param("ii", $id_usuario, $id_oferta);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 0) {
        $stmt = $conn->prepare("INSERT INTO postulacion (id_usuario, id_oferta) VALUES (?, ?)");

        $stmt->bind_param("ii", $id_usuario, $id_oferta);
        
        $stmt->execute();

        return ['success' => true];
    } else {
        return ['success' => false];
    }
}