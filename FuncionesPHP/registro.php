<?php
header("Access-Control-Allow-Origin: *"); // Allow any domain (replace * with a specific origin if needed)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow necessary headers

header('Content-Type: application/json');
include("ConexionBBDD.php");
// Recibir datos del cuerpo de la petición
$input = file_get_contents("php://input");

// Decodificar JSON a un array asociativo
$data = json_decode($input, true);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $nombre = $_POST['nombre'] ?? '';
    $apellido1 = $_POST['apellido1'] ?? '';
    $apellido2 = $_POST['apellido2'] ?? '';
    $contrasena = $_POST['contrasena'] ?? '';
    $nombre_usuario = $_POST['nombreUsuario'] ?? '';
    $roles = $_POST['roles'] ?? 'usuario';
    $dni = $_POST['dni'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $email = $_POST['email'] ?? '';
    $direccion = $_POST['direccion'] ?? '';
    $foto = '';
    $errores = [];
    // Verificar que los campos obligatorios no estén vacíos
    if (empty($nombre) || empty($apellido1) || empty($contrasena) || empty($nombre_usuario) || empty($dni) || empty($email) || empty($direccion)) {
        
        if(empty($nombre)){
            $errores['nombre'] = "El campo nombre es obligatorio";
        }
        if(empty($apellido1)){
            $errores['apellido1'] = "El campo apellido1 es obligatorio";
        }
        if(empty($contrasena)){
            $errores['contrasena'] = "El campo contraseña es obligatorio";
        }
        if(empty($nombre_usuario)){
            $errores['nombre_usuario'] = "El campo nombre de usuario es obligatorio";
        }
        if(empty($dni)){
            $errores['dni'] = "El campo DNI es obligatorio";
        }
        if(empty($email)){
            $errores['email'] = "El campo email es obligatorio";
        }
        if(empty($direccion)){
            $errores['direccion'] = "El campo dirección es obligatorio";
        }
        echo json_encode(["errors" => $errores]);
        exit();
    }

   

    //Creamos una consulta para comprobar si el nombre de usuario, DNI, email o teléfono ya existen
    $checkSql = "SELECT nombre_usuario,dni,email,telefono FROM usuario WHERE nombre_usuario = ? OR dni = ? OR email = ? OR telefono = ?";
    $stmt = $conn->prepare($checkSql);
    if (!$stmt) {
        echo json_encode(["message" => "Error en la preparación de la consulta"]);
        exit();
    }
    $stmt->bind_param("ssss", $nombre_usuario, $dni, $email, $telefono);
    $stmt->execute();
    //$stmt->store_result();
    $resultado = $stmt->get_result();
    while ($row = $resultado->fetch_assoc()) {
        if($row["nombre_usuario"]!=""){
            if($row["nombre_usuario"]==$nombre_usuario){
                $errores['nombre_usuario'] = "El nombre de usuario ya existe";
            }
        }
        if($row["dni"]!=""){
            if($row["dni"]==$dni){
                $errores['dni'] = "El DNI ya existe";
            }
        }
        if($row["email"]!=""){
            if($row["email"]==$email){
                $errores['email'] = "El email ya existe";
            }
        }
        if($row["telefono"]!=""){
            if($row["telefono"]==$telefono){
                $errores['telefono'] = "El teléfono ya existe";
            }
        }
        
    }
    //$stmt->store_result();
    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();
    // Encriptar la contraseña
    $hashedPassword = password_hash($contrasena, PASSWORD_BCRYPT);

    // Manejo de la foto si se sube
    if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
        $extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
        $fotoNombre = $nombre_usuario . '.' . $extension;
        $carpetaFotos = "../ProyectoReact/public/imagenes/";
        $fotoRuta = $carpetaFotos . $fotoNombre;
        if (!is_dir($carpetaFotos)) {
            mkdir($carpetaFotos, 0777, true); // Crea la carpeta si no existe
        }
        if (move_uploaded_file($_FILES['file']['tmp_name'], $fotoRuta)) {
            $foto = $fotoNombre;
        } else {
            echo json_encode(["message" => "Error al subir la foto"]);
            exit();
        }
    }

    // Insertar el usuario en la base de datos
    $sql = "INSERT INTO usuario (nombre, apellido1, apellido2, contrasena, nombre_usuario, roles, dni, telefono, email, direccion, foto) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(["message" => "Error en la preparación de la consulta"]);
        exit();
    }
    $stmt->bind_param("sssssssssss", $nombre, $apellido1, $apellido2, $hashedPassword, $nombre_usuario, $roles, $dni, $telefono, $email, $direccion, $foto);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Registro exitoso"]);
    } else {
        echo json_encode(["message" => "Error al registrar el usuario"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["message" => "Método no permitido"]);
}
?>