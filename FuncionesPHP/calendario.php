<?php
include('url.php');
header("Access-Control-Allow-Origin: $url");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
    include("ConexionBBDD.php");
    include("consultas.php");
    function agregaReporte($conn){
        
        $fecha = $_POST['fecha'];
        $horario = $_POST['horario'];
        $rol = $_POST['rol'];
        $usuario = $_POST['usuario'];
        $id_usuario = consigueIdUsuario($conn, $usuario);
        if ($id_usuario === null) {
            echo json_encode(array("mensaje" => "Usuario no encontrado"));
            return;
        }else{
            $sql = "INSERT INTO reporte_diario (usuario,rol, fecha, horario) VALUES ( '$usuario','$rol','$fecha', '$horario')";
        
            if ($conn->query($sql) === TRUE) {
                echo json_encode(array("mensaje" => "Reporte agregado correctamente"));
            } else {
                echo json_encode(array("mensaje" => "Error al agregar el reporte: " . $conn->error));
            }
            
            $conn->close();
        }
        
    }
    function buscarReportesSemana($fecha_inicial, $fecha_final, $conn){
        $sql = "SELECT reporte_diario.*, usuario.nombre, usuario.apellido1, usuario.apellido2, usuario.nombre_usuario
        FROM reporte_diario 
        JOIN usuario ON reporte_diario.usuario = usuario.id_usuario 
        WHERE fecha BETWEEN '$fecha_inicial' AND '$fecha_final'";
        $resultado = mysqli_query($conn, $sql);
        if ($resultado && mysqli_num_rows($resultado) > 0) {
            $filas = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
            return $filas;
        } else {
            return null;
        }
        
    }
    try {
        // Decodificar el cuerpo JSON si la solicitud es POST
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $_POST = json_decode(file_get_contents('php://input'), true);
        }
    
        if (isset($_POST['funcion'])) {
            $funcion = $_POST['funcion'];
            if ($funcion == "reportesdiario") {
                if (isset($_POST['fecha_inicial'], $_POST['fecha_final']) && !empty($_POST['fecha_inicial']) && !empty($_POST['fecha_final'])) {
                    $fecha_inicial = $_POST['fecha_inicial'];
                    $fecha_final = $_POST['fecha_final'];
    
                    // Validar formato de fecha
                    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha_inicial) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha_final)) {
                        echo json_encode(array("mensaje" => "Formato de fecha inválido. Use el formato YYYY-MM-DD"));
                        exit;
                    }
    
                    $reportes = buscarReportesSemana($fecha_inicial, $fecha_final, $conn);
                    if ($reportes) {
                        echo json_encode($reportes, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    } else {
                        echo json_encode(array("error"=>1,"mensaje" => "No se encontraron reportes en la semana especificada"));
                    }
                } else {
                    echo json_encode(array("error"=>2,"mensaje" => "Datos incompletos: fecha_inicial o fecha_final no proporcionados"));
                }
            } else {
                echo json_encode(array("mensaje" => "Función no válida"));
            }
        } else {
            echo json_encode(array("mensaje" => "No se recibió ninguna función"));
        }
    } catch (Exception $e) {
        echo json_encode(array("error" => $e->getMessage()));
        http_response_code(500); // Código de error interno del servidor
        exit;
    }