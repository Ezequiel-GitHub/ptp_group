<?php
// Importa los DAO
require_once __DIR__ . '/dao/AdminDAO.php';
require_once __DIR__ . '/dao/OfertaDAO.php';
require_once __DIR__ . '/dao/UsuarioDAO.php';
require_once __DIR__ . '/dao/PostulacionDAO.php';

// Indica que la respuesta será JSON
header('Content-Type: application/json');

// Obtiene el parámetro action de la URL
$action = $_GET['action'] ?? '';

// Estructura de control principal
switch ($action) {

case 'ofertas':

    $soloActivas = $_GET['soloActivas'] ?? '';

    $ok = getOfertas($soloActivas);

    echo json_encode($ok);

    break;

case 'oferta':
    
    $soloActivas = $_GET['soloActivas'] ?? '';
    $titulo = !empty($_GET['titulo']) ? $_GET['titulo'] : null;
    $modalidad = !empty($_GET['modalidad']) ? $_GET['modalidad'] : null;
    $salario = !empty($_GET['salario']) ? $_GET['salario'] : null;
    $requisitos = !empty($_GET['requisitos']) ? $_GET['requisitos'] : null;

    $ok = getOferta($soloActivas, $titulo, $modalidad, $salario, $requisitos);

    echo json_encode($ok);

    break;
      
case 'agregar_oferta':

    $titulo = $_GET['titulo'] ?? '';
    $puesto = $_GET['puesto'] ?? '';
    $descripcion = $_GET['descripcion'] ?? '';
    $direccion = $_GET['direccion'] ?? '';
    $modalidad = $_GET['modalidad'] ?? '';
    $horario = $_GET['horario'] ?? '';
    $salario = $_GET['salario'] ?? '';
    $requisitos = $_GET['requisitos'] ?? '';
    $fecha_cierre = $_GET['fech_cierre'] ?? '';

    if ($titulo && $puesto && $descripcion && $direccion && $modalidad && $horario && $salario && $requisitos && $fecha_cierre) {

        $ok = addOferta($titulo, $puesto, $descripcion, $direccion, $modalidad, $horario, $salario, $requisitos, $fecha_cierre);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'editar_oferta':

    $titulo = $_GET['titulo'] ?? '';
    $puesto = $_GET['puesto'] ?? '';
    $descripcion = $_GET['descripcion'] ?? '';
    $direccion = $_GET['direccion'] ?? '';
    $modalidad = $_GET['modalidad'] ?? '';
    $horario = $_GET['horario'] ?? '';
    $salario = $_GET['salario'] ?? '';
    $requisitos = $_GET['requisitos'] ?? '';
    $fecha_cierre = $_GET['fech_cierre'] ?? '';
    $id = $_GET['id'] ?? '';

    if ($titulo && $puesto && $descripcion && $direccion && $modalidad && $horario && $salario && $requisitos && $fecha_cierre && $id) {

        $ok = editarOferta($titulo, $puesto, $descripcion, $direccion, $modalidad, $horario, $salario, $requisitos, $fecha_cierre, $id);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'usuario':

    $id = $_GET['id'] ?? '';

    if ($id) {

        $ok = getUsuario($id);

        echo json_encode($ok);

    } else {
        echo json_encode(false);
    }

    break;
case 'agregar_usuario': 
    
    $nombre = $_GET["nombre"] ?? '';
    $email = $_GET["email"] ?? '';
    $telefono = $_GET["telefono"] ?? '';
    $password = $_GET['password'] ?? '';
    $estado_academico = $_GET["estado_academico"] ?? '';

    if ($nombre && $email && $telefono && $password && $estado_academico) {
        
        $ok = register($nombre, $email, $telefono, $password, $estado_academico);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'agregar_postulacion':

    $id_usuario = $_GET['id_usuario'] ?? '';
    $id_oferta = $_GET['id_oferta'] ?? '';

    if ($id_usuario && $id_oferta) {

        $ok = addPostulacion($id_usuario, $id_oferta);

        echo json_encode($ok);
    
    } else {

        echo json_encode(false);

    }

    break;
    
case 'eliminar_oferta':

    $id = $_GET['id'] ?? '';

    if ($id) {

        $ok = deleteOferta($id);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'estado_oferta': 

    $id = $_GET['id'] ?? '';
    $estado = $_GET['estado'] ?? '';

    if ($id && $estado) {

        $ok = estadoOferta($id, $estado);

        echo json_encode($ok);

    } else {

        echo json_encode(false);
        
    }

    break;
case 'login':

    $email = $_GET['email'] ?? '';
    $password = $_GET['password'] ?? '';

    if ($email && $password) {

        $ok = login($email, $password);

        echo json_encode($ok);

    } else {
        
        echo json_encode(false);

    }

    break;

case 'modificar_usuario':

    $id = $_GET['id'] ?? '';
    $nombre = $_GET['nombre'] ?? '';
    $email = $_GET["email"] ?? '';
    $telefono = $_GET["telefono"] ?? '';
    $estado_academico = $_GET["estado_academico"] ?? '';

    if ($id && $nombre && $email && $telefono && $estado_academico) {

        $ok = modificarUsuario($id, $nombre, $email, $telefono, $estado_academico);

        echo json_encode($ok);

    } else {
        
        echo json_encode(false);

    }

    break;

case 'subir_cv':

    $id = $_GET['id'] ?? '';
    $curriculum = $_GET['curriculum'] ?? '';

    if ($id && $curriculum) {

        $ok = subirCV($id, $curriculum);

        echo json_encode($ok);

    } else {
        
        echo json_encode(false);

    }

    break;
case 'eliminar_usuario':

    $id = $_GET['id'] ?? '';

    if ($id) {

        $ok = eliminarUsuario($id);

        echo json_encode($ok);
        
    } else {

        echo json_encode(false);

    }

    break;
    
case 'postulaciones':

    $id_usuario = $_GET['id_usuario'] ?? '';
    $id_oferta = $_GET['id_oferta'] ?? '';
    $estado = $_GET['estado'] ?? '';

    if ($id_usuario && $id_oferta && $estado) {

        $ok = getPostulaciones();

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'eliminar_postulaciones':

    $id = $_GET['id'] ?? '';

    if ($id) {

        $ok = deletePostulaciones($id);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'estado_postulacion':

    $id_oferta = $_GET['id_oferta'] ?? '';
    $id_usuario = $_GET['id_usuario'] ?? '';
    $estado = $_GET['estado'] ?? '';

    if ($id_oferta && $id_usuario && $estado) {

        $ok = estadoPostulacion($id_oferta, $id_usuario, $estado);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'postulaciones_usuario':

    $id_usuario = $_GET['id_usuario'] ?? '';

    if ($id_usuario) {

        $ok = getPostulacionesUsuario($id_usuario);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'postulados': 

    $id_oferta = $_GET['id_oferta'] ?? '';

    if ($id_oferta) {

        $ok = getPostulados($id_oferta);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'postulado':

    $id_oferta = $_GET['id_oferta'] ?? '';
    $nombre = $_GET['nombre'] ?? '';

    if ($id_oferta && $nombre) {

        $ok = getPostulado($id_oferta, $nombre);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;
case 'datos_admin':

    $ok = getDatosAdmin();

    echo json_encode($ok);

    break;

case 'enviar_codigo':
    
    $email = $_GET['email'] ?? '';

    if ($email) {

        $ok = enviarCodigo($email);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'restablecer_contraseña':

    $email = $_GET['email'] ?? '';
    $codigo = $_GET['codigo'] ?? '';
    $nueva_contrasena = $_GET['nueva_contrasena'] ?? '';

    if ($email && $codigo && $nueva_contrasena) {

        $ok = restablecerContraseña($email, $codigo, $nueva_contrasena);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

default:
    echo json_encode(["error" => "Ruta no válida"]);
}