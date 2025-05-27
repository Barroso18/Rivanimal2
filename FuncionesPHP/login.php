<?php
include('url.php');
header("Access-Control-Allow-Origin: $url");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include("ConexionBBDD.php");
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;

$secret_key = "mi_clave_secreta";  // Clave secreta para firmar el JWT
$issued_at = time();  // Tiempo de emisión
$expiration_time = $issued_at + 3600;  // El token expirará en 1 hora
$issuer = "mi_aplicacion_php";
$data = json_decode(file_get_contents("php://input"),true);

//if (isset($input['usuario']) && isset($input['contrasena'])) {
if (isset($data['datosLogin'])) {
    $usuario = $data['datosLogin']['usuario'];
    $contrasena = $data['datosLogin']['contrasena'];

    // Consulta para verificar si el usuario existe
    $sql = "SELECT * FROM usuario WHERE nombre_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    //$result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Verificar si la contraseña es correcta
        if (password_verify($contrasena, $row['contrasena'])) {
            // Datos para generar el token
            $payload = array(
                "iss" => $issuer,
                "iat" => $issued_at,
                "exp" => $expiration_time,
                "data" => array(
                    "id" => $row['id_usuario'],
                    "usuario" => $row['nombre_usuario'],
                    "roles" => $row['roles']
                )
            );

            // Generar el token JWT
            $jwt = JWT::encode($payload, $secret_key, 'HS256');

            echo json_encode(
                array(
                    "message" => "Login exitoso",
                    "jwt" => $jwt
                )
            );
        } else {
            echo json_encode(array("message" => "Contraseña incorrecta"));
        }
    } else {
        echo json_encode(array("message" => "Usuario no encontrado"));
    }
} else {
    echo json_encode(array("message" => "Credenciales incompletas"));
}
?>