<?php
include('url.php');
header("Access-Control-Allow-Origin: $url");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// OJO: No establecemos Content-Type como application/json aquí, porque recibimos multipart/form-data

include("ConexionBBDD.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["message" => "Método no permitido"]);
    exit();
}

// Accede directamente a $_POST en lugar de leer php://input
$nombre = $_POST['nombre'] ?? '';
$apellido1 = $_POST['apellido1'] ?? '';
$apellido2 = $_POST['apellido2'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';
$nombre_usuario = $_POST['nombreUsuario'] ?? '';
$roles = $_POST['roles'] ?? [];
$dni = $_POST['dni'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$email = $_POST['email'] ?? '';
$direccion = $_POST['direccion'] ?? '';
$licenciaPPP = $_POST['licenciaPPP'] ?? 0;
$foto = '';
$errores = [];

// Validaciones básicas
if (empty($nombre)) $errores['nombre'] = "El campo nombre es obligatorio";
if (empty($apellido1)) $errores['apellido1'] = "El campo apellido1 es obligatorio";
if (empty($contrasena)) $errores['contrasena'] = "El campo contraseña es obligatorio";
if (empty($nombre_usuario)) $errores['nombre_usuario'] = "El campo nombre de usuario es obligatorio";
if (empty($dni)) $errores['dni'] = "El campo DNI es obligatorio";
if (empty($email)) $errores['email'] = "El campo email es obligatorio";
if (empty($direccion)) $errores['direccion'] = "El campo dirección es obligatorio";
if($roles ===[] || $roles === "") $errores['roles'] = "Debes seleccionar al menos un rol";
if (empty($telefono)) $errores['telefono'] = "El campo teléfono es obligatorio";

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores['email'] = "El formato del email no es válido";
if (strlen($contrasena) < 6) $errores['contrasena'] = "La contraseña debe tener al menos 6 caracteres";

if (!empty($errores)) {
    echo json_encode(["errores" => $errores]);
    exit();
}

// Verifica si ya existen datos repetidos
$checkSql = "SELECT nombre_usuario, dni, email, telefono FROM usuario WHERE nombre_usuario = ? OR dni = ? OR email = ? OR telefono = ?";
$stmt = $conn->prepare($checkSql);
$stmt->bind_param("ssss", $nombre_usuario, $dni, $email, $telefono);
$stmt->execute();
$resultado = $stmt->get_result();

while ($fila = $resultado->fetch_assoc()) {
    if ($fila["nombre_usuario"] === $nombre_usuario) $errores['nombre_usuario'] = "El nombre de usuario ya existe";
    if ($fila["dni"] === $dni) $errores['dni'] = "El DNI ya existe";
    if ($fila["email"] === $email) $errores['email'] = "El email ya existe";
    if ($fila["telefono"] === $telefono) $errores['telefono'] = "El teléfono ya existe";
}

if (!empty($errores)) {
    echo json_encode(["errores" => $errores]);
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

// Encripta la contraseña
$hashedPassword = password_hash($contrasena, PASSWORD_BCRYPT);

// Procesa la foto si fue enviada
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
    $fotoNombre = 'U_'.$nombre_usuario . '.' . $extension;
    $carpetaFotos = "../ProyectoReact/public/imagenes/";
    $fotoRuta = $carpetaFotos . $fotoNombre;

    if (!is_dir($carpetaFotos)) {
        mkdir($carpetaFotos, 0777, true);
    }

    if (move_uploaded_file($_FILES['file']['tmp_name'], $fotoRuta)) {
        $foto = "../imagenes/".$fotoNombre;
    } else {
        echo json_encode(["message" => "Error al subir la foto"]);
        exit();
    }
}

// Inserta en la base de datos
$sql = "INSERT INTO usuario (nombre, apellido1, apellido2, contrasena, nombre_usuario, roles, dni, telefono, email, direccion, foto,licenciaPPP) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssssssi", $nombre, $apellido1, $apellido2, $hashedPassword, $nombre_usuario, $roles, $dni, $telefono, $email, $direccion, $foto,$licenciaPPP);

if ($stmt->execute()) {
    echo json_encode(["message" => "Registro exitoso"]);
} else {
    echo json_encode(["message" => "Error al registrar el usuario"]);
}

$stmt->close();
$conn->close();
?>
