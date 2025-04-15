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


$funcion = $_GET['funcion'] ?? '';
if($funcion === 'buscaPorNombre') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['usuario']) && !empty($input['usuario'])) {
        
        $usuario = $input['usuario'];
        buscaUsuarioPorNombreUsuario($conn, $usuario);
    } else {
        echo json_encode(array("mensaje" => "Datos incompletos"));
    }
} 

?>