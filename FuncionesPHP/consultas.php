<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
    include("ConexionBBDD.php");

    //Consulta para comprobar si existe el nombre de usuario
    function comprobarNombreUsuario($nombreUsuario, $conexion){
        $consulta = "SELECT * FROM usuarios WHERE nombreUsuario = '$nombreUsuario'";
        $resultado = mysqli_query($conexion, $consulta);
        $filas = mysqli_num_rows($resultado);
        if($filas > 0){
            return "El nombre de usuario ya existe";
        }else{
            return "El nombre de usuario está disponible";
        }
    }
    function consultaAnimales($conn){
        $consulta="SELECT * FROM animal";
        $resultado = mysqli_query($conn, $consulta);
        $resultado = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
        return $resultado;
    }
    // Manejo de la acción recibida por URL
$funcion = $_GET['funcion'] ?? '';

if ($funcion === 'animalestodos') {
    echo json_encode(consultaAnimales($conn));
} 
?>