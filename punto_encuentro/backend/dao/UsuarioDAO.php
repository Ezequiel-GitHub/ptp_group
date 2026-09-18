<?php /*CAMBIO*/

require_once __DIR__ . '/../config/database.php';

function register($nombre, $email, $telefono, $password, $estado_academico) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT id from usuario where email = ?");

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($fila = $resultado->fetch_assoc()) {
        return [
                'success' => false,
                'mensaje' => "Usuario ya existente con este email"
                ];
    } else {

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT into usuario 
        (nombre, email, telefono, password, estado_academico) 
        values (?, ?, ?, ?, ?)");

        $stmt->bind_param("sssss", $nombre, $email, $telefono, $hash, $estado_academico);

        $stmt->execute();

        $resultado = $stmt->get_result();

        $usuario = $resultado->fetch_assoc();

        return [
                'success' => true,
                'mensaje' => "Usuario registrado con exito",
                'usuario' => $usuario
                ];
    }
}

function login($email, $password) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT id, nombre, email, telefono, estado_academico, curriculum, password from usuario where email = ?");

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $resultado = $stmt->get_result();

    $usuario = $resultado->fetch_assoc();

    if ($resultado->num_rows == 0) {
        return [
                'success' => false,
                'mensaje' => "Cuenta no encontrada, por favor registrate"
                ];
    } else {

        if (password_verify($password, $usuario['password'])) {
        return [
                'success' => true,
                'mensaje' => "Iniciaste sesión exitosamente",
                'usuario' => $usuario
                ];

        } else {
        
        return [
                'success' => false,
                'mensaje' => "Contraseña o email incorrecto"
                ];
        }
    }
    
}

function getUsuario($id) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT * from usuario where id = ?");

    $stmt->bind_param("i", $id);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 0) {
        return ['mensaje' => "No se ha encontrado el usuario"];
    } else {
        return $resultado->fetch_assoc();
    }
}

function subirCV($id, $curriculum) {

    $conn = conectar();

    $stmt = $conn->prepare("UPDATE usuario SET curriculum = ? where id = ?");

    $stmt->bind_param("si", $curriculum, $id);

    $stmt->execute();

    return [
            'success' => true,
            'mensaje' => "Currículum subido con exito"
            ];
}

function modificarUsuario($id, $nombre, $email, $telefono, $estado_academico) {

    $conn = conectar();

    $stmt = $conn->prepare("UPDATE usuario SET nombre = ?, email = ?, telefono = ?, estado_academico = ? where id = ?");

    $stmt->bind_param("ssssi", $nombre, $email, $telefono, $estado_academico, $id);

    $stmt->execute();

    return [
            'success' => true,
            'mensaje' => "Usuario modificado con exito"
            ];
}

function eliminarUsuario($id) {

    $conn = conectar();

    $stmt = $conn->prepare("DELETE from usuario where id = ?");

    $stmt->bind_param("i", $id);

    return $stmt->execute();
}