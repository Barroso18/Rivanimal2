<?php
header('Content-Type: application/json');
include("ConexionBBDD.php");
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;

$secret_key = "mi_clave_secreta";  // Clave secreta para firmar el JWT
$issued_at = time();  // Tiempo de emisión
$expiration_time = $issued_at + 3600;  // El token expirará en 1 hora
$issuer = "mi_aplicacion_php";

$data = json_decode(file_get_contents("php://input"));

if (isset($data->usuario) && isset($data->contrasena)) {
    $usuario = $data->usuario;
    $contrasena = $data->contrasena;

    // Consulta para verificar si el usuario existe
    $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Verificar si la contraseña es correcta (se debe verificar con una contraseña encriptada, aquí es solo un ejemplo)
        if (password_verify($contrasena, $row['contrasena'])) {
            // Datos para generar el token
            $payload = array(
                "iss" => $issuer,
                "iat" => $issued_at,
                "exp" => $expiration_time,
                "data" => array(
                    "id" => $row['id'],
                    "usuario" => $row['usuario']
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