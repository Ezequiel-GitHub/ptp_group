<?php /*CAMBIO*/

require_once __DIR__ . '/../config/database.php';

function register($nombre, $email, $telefono, $password, $estado_academico) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT * from usuario where email = ?");

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($fila = $resultado->fetch_assoc()) {
        return [
                'success' => false,
                'mensaje' => "Usuario ya existente con este email"
                ];
    } else {
        $stmt = $conn->prepare("INSERT into usuario 
        (nombre, email, telefono, password, estado_academico) 
        values (?, ?, ?, ?, ?)");

        $stmt->bind_param("sssss", $nombre, $email, $telefono, $password, $estado_academico);

        $stmt->execute();

        return [
                'success' => true,
                'mensaje' => "Usuario registrado con exito"
                ];
    }
}

function login($email, $password) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT * from usuario where email = ? AND password = ?");

    $stmt->bind_param("ss", $email, $password);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 0) {
        return ['success' => false,
                'mensaje' => "Contraseña o email incorrecto"];
    } else {

    $usuario = $resultado->fetch_assoc();
        
        return [
                'success' => true,
                'mensaje' => "Iniciaste sesión exitosamente",
                'usuario' => $usuario
                ];
    }
    
}

function modificarUsuario($id, $nombre, $email, $telefono, $estado_academico) {

    $conn = conectar();

    $stmt = $conn->prepare("UPDATE usuario SET nombre = ?, email = ?, telefono = ?, estado_academico = ? where id = ?");

    $stmt->bind_param("ssssi", $nombre, $email, $telefono, $estado_academico, $id);

    $stmt->execute();

    return [
            'success' => false,
            'mensaje' => "Usuario modificado con exito"
            ];
}

function eliminarUsuario($id) {

    $conn = conectar();

    $stmt = $conn->prepare("DELETE from usuario where id = ?");

    $stmt->bind_param("i", $id);

    return $stmt->execute();
}