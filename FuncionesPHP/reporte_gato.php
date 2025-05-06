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

if ($funcion === 'buscarPorAnimal') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idanimal']) && !empty($input['idanimal'])) {
        $idanimal = $input['idanimal'];
        echo json_encode(buscarRepGatPoridanimal($conn, $idanimal));
    } else {
        echo json_encode(array("mensaje" => "Datos incompletos"));
    }
}
if($funcion === 'buscarPorReporteDiario') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idanimal']) && !empty($input['idanimal'])) {
        $idanimal = $input['idanimal'];
        echo json_encode(buscarRepGatRD($conn, $idrepDiario));
    } else {
        echo json_encode(array("mensaje" => "Datos incompletos"));
    }

}
?>