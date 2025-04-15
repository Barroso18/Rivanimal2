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

if ($funcion === 'paseosporanimal') {
    //echo json_encode(consultaAnimales($conn));
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idanimal'])) {
        $id_animal = $input['idanimal'];
    } else {
        echo json_encode(array("mensaje" => "ID de animal no proporcionado"));
        exit;
    }
    echo json_encode(buscaPaseosPorAnimal($conn, $id_animal));
} 
if ($funcion === 'paseosporreportediario') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idReporte'])) {
        $idReporte = $input['idReporte'];
    } else {
        echo json_encode(array("mensaje" => "ID de animal no proporcionado"));
        exit;
    }
    echo json_encode(buscaPaseosPorReporteDiario($conn, $idReporte));
}
    
?>