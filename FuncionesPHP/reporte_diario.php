<?php
/*
include('url.php');
header("Access-Control-Allow-Origin: $url");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
*/
// Manejar solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Responder con estado 200 OK
    exit();
}

include("ConexionBBDD.php");
include("consultas.php");
require_once 'vendor/autoload.php';

$funcion = $_GET['funcion'] ?? '';

if ($funcion === 'registrar') {
    try {
        $input = json_decode(file_get_contents("php://input"), true);
        $errores = []; // Array para almacenar los errores por campo

        // Validar que los datos requeridos estén presentes
        if (empty($input['datosReporte']['usuario'])) {
            $errores['usuario'] = "El campo usuario es obligatorio";
        }
        if (empty($input['datosReporte']['rol'])) {
            $errores['rol'] = "El campo rol es obligatorio";
        }
        if (empty($input['datosReporte']['fecha'])) {
            $errores['fecha'] = "El campo fecha es obligatorio";
        }
        if (empty($input['datosReporte']['horario'])) {
            $errores['horario'] = "El campo horario es obligatorio";
        }

        // Si hay errores en los campos obligatorios, devolverlos
        if (!empty($errores)) {
            echo json_encode(["errores" => $errores]);
            //http_response_code(400); // Código de error 400: Solicitud incorrecta
            $conn->close();
            exit();
        }

        $usuario = $input['datosReporte']['usuario'];
        $rol = $input['datosReporte']['rol'];
        $fecha = $input['datosReporte']['fecha'];
        $horario = $input['datosReporte']['horario'];

        // Buscar si el usuario existe y obtener su ID
        $id_usuario = consigueIdUsuario($conn, $usuario);
        if (!$id_usuario) {
            $errores['usuario'] = "Usuario no encontrado";
        }

        // Validar el formato de la fecha
        $fecha_obj = DateTime::createFromFormat('Y-m-d', $fecha);
        if (!$fecha_obj || $fecha_obj->format('Y-m-d') !== $fecha) {
            $errores['fecha'] = "Formato de fecha inválido";
        }

        //Comprobar que un mismo usuario no se pueda anotar varias veces el mismo dia en el mismo turno
        $compruebaDuplicados = compruebaDuplicados($conn,$id_usuario,$fecha,$horario);
        if($compruebaDuplicados){
            
            $errores['duplicado'] = "ya existe un reporte de este usuario en este horario";
        }

        // Validar el horario
        if (!in_array($horario, ['MAÑANA', 'TARDE'])) {
            $errores['horario'] = "Horario inválido";
        }

        // Validar el rol
        $roles_validos = ['admin', 'voluntario', 'gespad', 'educadora'];
        if (!in_array($rol, $roles_validos)) {
            $errores['rol'] = "Rol inválido";
        }

        // Si hay errores después de las validaciones, devolverlos
        if (!empty($errores)) {
            echo json_encode(["errores" => $errores]);
            //http_response_code(400); // Código de error 400: Solicitud incorrecta
            exit();
        }

        // Si todo está correcto, llamar a la función para agregar el reporte diario
        $resultado = agregaReporteDiario($conn, $id_usuario['id_usuario'], $rol, $fecha, $horario);
        if ($resultado) {
            echo json_encode(["mensaje" => "Reporte diario registrado exitosamente"]);
            http_response_code(201); // Código de éxito 201: Creado
        } else {
            echo json_encode(["errores" => ["general" => "Error al registrar el reporte diario"]]);
            //http_response_code(500); // Código de error 500: Error interno del servidor
        }
    } catch (Exception $e) {
        // Manejo de excepciones generales
        echo json_encode(["errores" => ["general" => "Error inesperado: " . $e->getMessage()]]);
        //http_response_code(500); // Código de error 500: Error interno del servidor
    }
} elseif ($funcion === 'buscarTodos') {//Consulta todos los reportes diarios
    try {
        // Aquí puedes implementar la lógica para consultar reportes diarios
        // Por ejemplo: consultarReportesDiarios($conn);
        echo json_encode(["mensaje" => "Consulta de reportes diarios realizada correctamente"]);
        http_response_code(200); // Código de éxito 200: OK
    } catch (Exception $e) {
        echo json_encode(["errores" => ["general" => "Error al consultar reportes diarios: " . $e->getMessage()]]);
        //http_response_code(500); // Código de error 500: Error interno del servidor
    }
}elseif($funcion === 'buscarPorUsuario'){//Consulta reportes diarios por usuario
    try {
        // Aquí puedes implementar la lógica para consultar reportes diarios
        // Por ejemplo: consultarReportesDiarios($conn);
        $input = json_decode(file_get_contents("php://input"), true);
        if (isset($input['idusuario'])) {
            $idusuario = $input['idusuario'];
        } else {
            echo json_encode(array("mensaje" => "ID de usuario no proporcionado"));
            exit;
        }
        echo json_encode(buscaReportesDiariosPorUsuario($conn, $idusuario));
     
       // echo json_encode(["mensaje" => "Consulta de reportes diarios realizada correctamente"]);
        //http_response_code(200); // Código de éxito 200: OK
    } catch (Exception $e) {
        echo json_encode(["errores" => ["general" => "Error al consultar reportes diarios: " . $e->getMessage()]]);
        //http_response_code(500); // Código de error 500: Error interno del servidor
    }
} else if($funcion === 'borraPorId'){
    //Hay que comprobar primero si existen paseos u otros reportes asociados
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idReporteDiario'])) {
        $id_reporte_diario = $input['idReporteDiario'];
    } else {
        echo json_encode(array("mensaje" => "ID de reporte no proporcionado"));
        exit;
    }
    echo borraReporteDiarioPorId($conn, $id_reporte_diario);
}

else {
    echo json_encode(["errores" => ["general" => "Función no válida"]]);
    //http_response_code(400); // Código de error 400: Solicitud incorrecta
}
?>