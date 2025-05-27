<?php
/*include('url.php');
header("Access-Control-Allow-Origin: $url");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
*/
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
include("ConexionBBDD.php");
include("consultas.php");


$funcion = $_GET['funcion'] ?? '';
if($funcion === 'buscaPorNombre') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['usuario']) && !empty($input['usuario'])) {
        
        $usuario = $input['usuario'];
        echo json_encode(buscaUsuarioPorNombreUsuario($conn, $usuario));
    } else {
        echo json_encode(array("mensaje" => "Datos incompletos"));
    }
} 
if($funcion === 'buscaPorId') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idusuario']) && !empty($input['idusuario'])) {
        
        $idusuario = $input['idusuario'];
        echo json_encode(buscarUsuarioPorIdLimitado($conn, $idusuario));
    } else {
        echo json_encode(array("mensaje" => "Datos incompletos"));
    }
} 
if($funcion === 'buscaPorIdCompleto') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idusuario']) && !empty($input['idusuario'])) {
        
        $idusuario = $input['idusuario'];
        echo json_encode(buscarUsuarioPorId($conn, $idusuario));
    } else {
        echo json_encode(array("mensaje" => "Datos incompletos"));
    }
} 
if($funcion === 'buscaTodos'){
    echo json_encode(buscarTodosUsuarios($conn));
}
if($funcion === 'actualiza'){
    // Accede directamente a $_POST en lugar de leer php://input
    $id_usuario = $_POST['id_usuario'] ?? 0;
    $nombre = $_POST['nombre'] ?? '';
    $apellido1 = $_POST['apellido1'] ?? '';
    $apellido2 = $_POST['apellido2'] ?? '';
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
    if (empty($id_usuario) || $id_usuario === 0) $errores['id_usuario'] = "El id_usuario no puede ser 0 o nulo";
    if (empty($nombre)) $errores['nombre'] = "El campo nombre es obligatorio";
    if (empty($apellido1)) $errores['apellido1'] = "El campo apellido1 es obligatorio";
    if (empty($nombre_usuario)) $errores['nombre_usuario'] = "El campo nombre de usuario es obligatorio";
    if (empty($dni)) $errores['dni'] = "El campo DNI es obligatorio";
    if (empty($email)) $errores['email'] = "El campo email es obligatorio";
    if (empty($direccion)) $errores['direccion'] = "El campo dirección es obligatorio";
    if($roles ===[] || $roles === "") $errores['roles'] = "Debes seleccionar al menos un rol";
    if (empty($telefono)) $errores['telefono'] = "El campo teléfono es obligatorio";

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores['email'] = "El formato del email no es válido";
    

    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }

    // Verifica si ya existen datos repetidos
    $checkSql = "SELECT nombre_usuario, dni, email, telefono FROM usuario WHERE (nombre_usuario = ? OR dni = ? OR email = ? OR telefono = ?) AND id_usuario != ?";
    $stmt = $conn->prepare($checkSql);
    $stmt->bind_param("ssssi", $nombre_usuario, $dni, $email, $telefono,$id_usuario);
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
    //$hashedPassword = password_hash($contrasena, PASSWORD_BCRYPT);

    // Procesa la foto si fue enviada
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
        $fotoNombre = 'U_'.$nombre_usuario . '.' . $extension;
        $carpetaFotos = $_SERVER['DOCUMENT_ROOT'] . "/imagenes/";
        $fotoRuta = $carpetaFotos . $fotoNombre;

        if (!is_dir($carpetaFotos)) {
            mkdir($carpetaFotos, 0777, true);
        }

        if (move_uploaded_file($_FILES['file']['tmp_name'], $fotoRuta)) {
            $foto = "https://rivanimal-gestion.es/imagenes/".$fotoNombre;
        } else {
            echo json_encode(["message" => "Error al subir la foto"]);
            exit();
        }
    }

    // Actualiza en la base de datos
    if (!empty($foto)) {
        $sql = "UPDATE usuario SET nombre = ?, apellido1 = ?, apellido2 = ?, nombre_usuario = ?, roles = ?, dni = ?, telefono = ?, email = ?, direccion = ?, foto = ?, licenciaPPP = ? WHERE id_usuario = ?";
        $stmt = $conn->prepare($sql);
        // Si quieres actualizar la contraseña, añade $hashedPassword y "sssssssssssi" en el bind_param
        $stmt->bind_param("sssssssssssi", $nombre, $apellido1, $apellido2, $nombre_usuario, $roles, $dni, $telefono, $email, $direccion, $foto, $licenciaPPP, $id_usuario);
    }else{
            $sql = "UPDATE usuario SET nombre = ?, apellido1 = ?, apellido2 = ?, nombre_usuario = ?, roles = ?, dni = ?, telefono = ?, email = ?, direccion = ?, licenciaPPP = ? WHERE id_usuario = ?";
        $stmt = $conn->prepare($sql);
        // Si quieres actualizar la contraseña, añade $hashedPassword y "sssssssssssi" en el bind_param
        $stmt->bind_param("ssssssssssi", $nombre, $apellido1, $apellido2, $nombre_usuario, $roles, $dni, $telefono, $email, $direccion, $licenciaPPP, $id_usuario);
    }
    if ($stmt->execute()) {
        echo json_encode(["message" => "Actualización exitosa"]);
    } else {
        echo json_encode(["message" => "Error al actualizar el usuario"]);
    }

    $stmt->close();
    $conn->close();
}
if($funcion === 'borraPorId'){
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idusuario'])) {
        $idusuario = $input['idusuario'];
    } else {
        echo json_encode(array("error" => "ID de usuario no proporcionado"));
        exit;
    }
    echo borraUsuarioPorId($conn, $idusuario);
}
?>