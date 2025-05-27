<?php
/*include('url.php');
header("Access-Control-Allow-Origin: $url");
header('Content-Type: application/json');
*/
include('ConexionBBDD.php');
require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

$secret_key = "mi_clave_secreta";

$headers = apache_request_headers();
if (isset($headers['autorizacion'])) {
    $jwt = str_replace("Bearer ", "", $headers['autorizacion']);
    
    try {
        // Decodificar el JWT
        $algorithms = array('HS256');
        $decoded = JWT::decode($jwt, new \Firebase\JWT\Key($secret_key, 'HS256'));
        // Si el token es válido, muestra el contenido
        echo json_encode(array("message" => "Acceso autorizado", "data" => $decoded->data));
    } catch (Exception $e) {
        echo json_encode(array("message" => "Token inválido", "error" => $e->getMessage()));
    }
} else {
    echo json_encode(array("message" => "Token no proporcionado"));
}
?>