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

// Manejo de la acción recibida por URL
$funcion = $_GET['funcion'] ?? '';

if ($funcion === 'animalestodos') {
    echo json_encode(consultaAnimales($conn));
} 

    
?>