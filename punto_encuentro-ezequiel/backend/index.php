<?php

// Importa los DAO
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
      // Devuelve todos los usuarios
      echo json_encode(getOfertas());
      break;
case 'oferta':
    
      // Verifica si viene el ID
      if (isset($_GET['titulo'])) {

          echo json_encode(getOferta($_GET['titulo']));

      } else {
          echo json_encode(["error" => "Falta titulo de la oferta"]);
      }

    break;
      
case 'agregar_oferta':

    $titulo = $_GET['titulo'] ?? '';
    $puesto = $_GET['puesto'] ?? '';
    $direccion = $_GET['direccion'] ?? '';
    $horario = $_GET['horario'] ?? '';
    $salario = $_GET['salario'] ?? '';
    $requisitos = $_GET['requisitos'] ?? '';
    // $id_usuario = $_GET['id_usuario'] ?? '';

    if ($titulo && $puesto && $direccion && $horario && $salario && $requisitos) {

        $ok = addOferta($titulo, $puesto, $direccion, $horario, $salario, $requisitos);

        echo json_encode($ok);

    } else {

        echo json_encode(false);

    }

    break;

case 'agregar_usuario': /*CAMBIO*/
    
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

    $id = $_GET['id'] ?? '';
    $estado = $_GET['estado'] ?? '';

    if ($id) {

        $ok = estadoPostulacion($id, $estado);

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



default:
    echo json_encode(["error" => "Ruta no válida"]);
}