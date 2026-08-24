<?php

require_once __DIR__ . '/../config/database.php';

function register($nombre, $email, $telefono, $password, $estado_academico, $admin) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT * from usuario where email = ?");

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($fila = $resultado->fetch_assoc()) {
        return false; // El usuario ya existe
    } else {
        $stmt = $conn->prepare("INSERT into usuario 
        (nombre, email, telefono, password, estado_academico, admin) 
        values (?, ?, ?, ?, ?, ?)");

        $stmt->bind_param("sssssi", $nombre, $email, $telefono, $password, $estado_academico, $admin);

        return $stmt->execute();

    }
}

function login($email, $password) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT * from usuario where email = ? AND password = ?");

    $stmt->bind_param("ss", $email, $password);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 0) {
        return ['success' => false];
    } else {

    $usuario = $resultado->fetch_assoc();
        
        return [
                'success' => true,
                'usuario' => $usuario
                ];
    }
    
}

function modificarUsuario($id, $nombre, $email, $telefono, $estado_academico) {

    $conn = conectar();

    $stmt = $conn->prepare("UPDATE usuario SET nombre = ?, email = ?, telefono = ?, estado_academico = ? where id = ?");

    $stmt->bind_param("ssssi", $nombre, $email, $telefono, $estado_academico, $id);

    return $stmt->execute();
}

function eliminarUsuario($id) {

    $conn = conectar();

    $stmt = $conn->prepare("DELETE from usuario where id = ?");

    $stmt->bind_param("i", $id);

    return $stmt->execute();
}