<?php
header("Access-Control-Allow-Origin: *");
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
        $sql = "SELECT * FROM reporte_diario WHERE fecha BETWEEN '$fecha_inicial' AND '$fecha_final'";
        $resultado = mysqli_query($conn, $sql);
        if ($resultado) {
            $filas = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
            return $filas;
        } else {
            return null;
        }

    }

?>