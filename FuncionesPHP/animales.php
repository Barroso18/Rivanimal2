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
if ($funcion === 'animalporID') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['id'])) {
        $id_animal = $input['id'];
    } else {

        echo json_encode(array("mensaje" => "ID de animal no proporcionado"));
        exit;
    }
    echo json_encode(buscaAnimalPorID($conn, $id_animal));
}
if ($funcion === 'tratamientoPorAnimal') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idanimal'])) {
        $id_animal = $input['idanimal'];
    } else {
        echo json_encode(array("mensaje" => "ID de animal no proporcionado"));
        exit;
    }
    echo json_encode(buscaTratamientoPorAnimal($conn, $id_animal));
}
    //Sin terminar
if($funcion === 'agregaAnimal'){//Agrega un animal a la base de datos
    $input = json_decode(file_get_contents("php://input"), true);
    
    agregaAnimal($conn);

}
if($funcion === 'buscaAnimalPorid_animal'){//Modifica un animal a la base de datos
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['id_animal'])) {
        $id_animal = $input['id_animal'];
    } else {

        echo json_encode(array("mensaje" => "ID de animal no proporcionado"));
        exit;
    }
    echo json_encode(buscaAnimalPorid_animal($conn, $id_animal));
    

}
?>