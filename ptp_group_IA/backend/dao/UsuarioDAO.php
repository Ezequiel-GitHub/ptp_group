<?php /*CAMBIO*/

require_once __DIR__ . '/../config/database.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../PHPMailer/Exception.php';
require_once __DIR__ . '/../PHPMailer/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/SMTP.php';

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

        $stmt = $conn->prepare("SELECT nombre, email, telefono, estado_academico, curriculum from usuario where email = ?");

        $stmt->bind_param("s", $email);

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

    $stmt = $conn->prepare("SELECT id, nombre, email, telefono, estado_academico, curriculum, password, admin from usuario where email = ?");

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

    if (!$stmt->execute()) {
        return [
            'success' => false,
            'mensaje' => "No se pudo guardar el enlace del currículum"
        ];
    }

    return [
        'success' => true,
        'mensaje' => "Enlace del currículum guardado correctamente"
    ];
}

function modificarUsuario($id, $nombre, $email, $telefono, $estado_academico) {

    $conn = conectar();

    // Evita que una cuenta utilice el correo que ya pertenece a otro usuario.
    $stmt = $conn->prepare("SELECT id FROM usuario WHERE email = ? AND id <> ?");
    $stmt->bind_param("si", $email, $id);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        return [
            'success' => false,
            'mensaje' => "Ese correo electrónico ya está siendo utilizado por otra cuenta."
        ];
    }

    $stmt = $conn->prepare("UPDATE usuario SET nombre = ?, email = ?, telefono = ?, estado_academico = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $nombre, $email, $telefono, $estado_academico, $id);

    if (!$stmt->execute()) {
        return [
            'success' => false,
            'mensaje' => "No se pudieron guardar los cambios de tu cuenta."
        ];
    }

    return [
        'success' => true,
        'mensaje' => "Los datos de tu cuenta se actualizaron correctamente."
    ];
}

function eliminarUsuario($id) {

    $conn = conectar();

    $stmt = $conn->prepare("DELETE from postulacion where id_usuario = ?");

    $stmt->bind_param("i", $id);

    $stmt->execute();

    $stmt = $conn->prepare("DELETE from usuario where id = ?");

    $stmt->bind_param("i", $id);

    return $stmt->execute();
}

function recuperarPassword($email) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT id, password from usuario where email = ?");

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 0) {
        return [
                'success' => false,
                'mensaje' => "No se ha encontrado el usuario"
                ];
    } else {

        $password = $resultado->fetch_assoc()['password'];

        $para = $email;
        $asunto = "Recuperación de contraseña";
        $mensaje = "Hola, haz solicitado recuperar tu contraseña. Tu contraseña es:" . $password;
        $header = "From: ezequiellema541@gmail.com";

        if (mail($para, $asunto, $mensaje, $header)) {
            return [
                    'success' => true,
                    'mensaje' => "Se ha enviado un correo con tu contraseña"
                    ];
        } else {
            return [
                    'success' => false,
                    'mensaje' => "No se ha podido enviar el correo"
                    ];
        }
    }
}

function enviarCodigo($email) {

    $conn = conectar();

    $stmt = $conn->prepare("SELECT id, nombre from usuario where email = ?");

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $resultado = $stmt->get_result();

    $usuario = $resultado->fetch_assoc();

    if ($resultado->num_rows == 0) {
        return [
                'success' => false,
                'mensaje' => "No se ha encontrado el usuario"
                ];
    } else {

        $codigo = strval(random_int(100000, 999999));
        $expiracion = date('Y-m-d H:i:s', strtotime('+15 minutes'));

        $stmt = $conn->prepare("UPDATE usuario SET codigo_recuperacion = ?, codigo_expiracion = ? where email = ?");

        $stmt->bind_param("sss", $codigo, $expiracion, $email);

        $stmt->execute();

        $mail = new PHPMailer(true);
        
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'ezequiellema541@gmail.com';
            $mail->Password = 'qthv dbnx lstl bzaz';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Evita bloqueos por certificados SSL locales en XAMPP
            $mail->SslContext = ['ssl' => ['verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true]];

            $mail->setFrom('ezequiellema541@gmail.com', 'PTP Group');
            $mail->addAddress($email, $usuario['nombre']);

            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';
            $mail->Subject = 'Codigo de recuperación de contraseña';
            $mail->Body = "Hola " . $usuario['nombre'] . ", haz solicitado recuperar tu contraseña. Tu código de recuperación es: <b>$codigo</b>. Este código expirará en 15 minutos.";

            $mail->send();
            return [
                    'success' => true,
                    'mensaje' => "Se ha enviado un correo con tu código de recuperación"
                    ];
    }
}

function restablecerContraseña($email, $codigo, $nueva_contrasena) {

    $ahora = date('Y-m-d H:i:s');

    $conn = conectar();

    $stmt = $conn->prepare("SELECT id from usuario where email = ? and codigo_recuperacion = ? and codigo_expiracion > ?");

    $stmt->bind_param("sss", $email, $codigo, $ahora);

    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 0) {
        return [
                'success' => false,
                'mensaje' => "El código es incorrecto o ya expiró"
                ];
    } else {

        $hash = password_hash($nueva_contrasena, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("UPDATE usuario SET password = ?, codigo_recuperacion = NULL, codigo_expiracion = NULL where id = ?");

        $stmt->bind_param("si", $hash, $resultado->fetch_assoc()['id']);

        $stmt->execute();

        return [
                'success' => true,
                'mensaje' => "Contraseña restablecida correctamente"
                ];
    }
}