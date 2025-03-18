<?php
header('Content-Type: application/json');
include("ConexionBBDD.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'] ?? '';
    $apellido1 = $_POST['apellido1'] ?? '';
    $apellido2 = $_POST['apellido2'] ?? '';
    $contrasena = $_POST['contrasena'] ?? '';
    $nombre_usuario = $_POST['nombre_usuario'] ?? '';
    $roles = $_POST['roles'] ?? 'usuario';
    $dni = $_POST['dni'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $email = $_POST['email'] ?? '';
    $direccion = $_POST['direccion'] ?? '';
    $foto = '';

    // Verificar que los campos obligatorios no estén vacíos
    if (empty($nombre) || empty($apellido1) || empty($contrasena) || empty($nombre_usuario) || empty($dni) || empty($email) || empty($direccion)) {
        echo json_encode(["message" => "Todos los campos obligatorios deben estar llenos"]);
        exit();
    }

    // Verificar si el usuario, email, DNI o teléfono ya existen
    $checkSql = "SELECT id_usuario FROM usuario WHERE nombre_usuario = ? OR dni = ? OR email = ? OR telefono = ?";
    $stmt = $conn->prepare($checkSql);
    if (!$stmt) {
        echo json_encode(["message" => "Error en la preparación de la consulta"]);
        exit();
    }
    $stmt->bind_param("ssss", $nombre_usuario, $dni, $email, $telefono);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["message" => "El usuario, DNI, email o teléfono ya existen"]);
        $stmt->close();
        $conn->close();
        exit();
    }

    // Encriptar la contraseña
    $hashedPassword = password_hash($contrasena, PASSWORD_BCRYPT);

    // Manejo de la foto si se sube
    if (!empty($_FILES['foto']['name'])) {
        $fotoNombre = basename($_FILES['foto']['name']);
        $fotoRuta = "uploads/" . $fotoNombre;
        if (move_uploaded_file($_FILES['foto']['tmp_name'], $fotoRuta)) {
            $foto = $fotoRuta;
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