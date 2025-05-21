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
    
    //$input = json_decode(file_get_contents("php://input"), true);
    // Accede directamente a $_POST en lugar de leer php://input
    $nombre = $_POST['nombre'] ?? '';
    $clase = $_POST['clase'] ?? '';
    $raza = $_POST['raza'] ?? '';
    $sexo = $_POST['sexo'] ?? '';
    $identificador = $_POST['identificador'] ?? 0;
    $tamaño = $_POST['tamaño'] ?? '';
    $situacion = $_POST['situacion'] ?? '';
    $fechaNacimiento = $_POST['fechaNacimiento'] ?? '';
    $fechaEntrada = $_POST['fechaEntrada'] ?? '';
    $peso = $_POST['peso'] ?? 0;
    $descripcion = $_POST['descripcion'] ?? '';
    $comportamiento = $_POST['comportamiento'] ?? '';
    $socializacion = $_POST['socializacion'] ?? '';
    $nivel = $_POST['nivel'] ?? 0;
    $ppp = $_POST['ppp'] ?? 0;
    $foto = '';
    $errores = [];
    // Validaciones básicas
    if (empty($nombre)) $errores['nombre'] = "El nombre es obligatorio";
    if (empty($clase)) $errores['clase'] = "La clase es obligatoria";
    if (empty($raza)) $errores['raza'] = "La clase es obligatoria";
    if (empty($sexo)) $errores['sexo'] = "El sexo es obligatorio";
    if (empty($identificador) || $identificador === 0 || is_nan($identificador)) $errores['identificador'] = "El identificador es obligatorio y debe ser un número mayor que 0";
    if (empty($tamaño)) $errores['tamaño'] = "El tamaño es obligatorio";
    if (empty($situacion)) $errores['situacion'] = "La situación es obligatoria";
    if (empty($fechaNacimiento)) $errores['fechaNacimiento'] = "La fecha de nacimiento es obligatoria";
    if (empty($fechaEntrada)) $errores['fechaEntrada'] = "La fecha de entrada es obligatoria";
    if(empty($peso) || is_nan($peso)|| $peso <0) $errores['peso'] = "El peso debe ser un número positivo";
    if (empty($nivel) || is_nan($nivel)) $errores['nivel'] = "El nivel es obligatorio y debe ser un número entre 1 y 5";
    if (empty($clase)) $errores['clase'] = "La clase es obligatoria";
     // Validar el formato de la fecha
    $fecha_obj = DateTime::createFromFormat('Y-m-d', $fechaNacimiento);
    if (!$fecha_obj || $fecha_obj->format('Y-m-d') !== $fechaNacimiento) {
        $errores['fechaNacimiento'] = "Formato de fecha de Nacimiento inválido";
    }
     // Validar el formato de la fecha
    $fecha_obj2 = DateTime::createFromFormat('Y-m-d', $fechaEntrada);
    if (!$fecha_obj2 || $fecha_obj2->format('Y-m-d') !== $fechaEntrada) {
        $errores['fechaEntrada'] = "Formato de fecha de entrada inválido";
    }
    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }

    // Verificacion de duplicidad del identificador
    $fila = buscaAnimalPorID($conn,$identificador);
    if($fila && isset($fila['identificador']) && $fila['identificador'] === $identificador) $errores['identificador'] = "el identificador ya existe";
    
    //Verificacion gatos no PPP
    if($clase === "gato" && $ppp === 1) $errores['clase']="un gato no puede ser ppp";

    //Verificacion nivel entre 0 y 5
    if($nivel<0 || $nivel>5)$errores['nivel'] = "el nivel debe estar entre 0 y 5";

    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }
    /*
    echo json_encode(["data" => $nombre,"message" => "Registro exitoso"]);
    exit();
*/


    // Procesa la foto si fue enviada
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
        $fotoNombre = 'A_'.$nombre.'_'.$identificador . '.' . $extension;
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


    //agregaAnimal($conn);

    $sql = "INSERT INTO animal (nombre, clase, raza, sexo,identificador,tamaño,situacion,fecha_nacimiento,fecha_entrada,nivel,peso,descripcion,foto,comportamiento,socializacion,ppp) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssissssiissssi", $nombre, $clase, $raza, $sexo,$identificador,$tamaño,$situacion,$fechaNacimiento,$fechaEntrada,$nivel,$peso,$descripcion,$foto,$comportamiento,$socializacion,$ppp);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Registro de animal exitoso"]);
    } else {
        echo json_encode(["message" => "Error al registrar el animal"]);
    }

    $stmt->close();
    $conn->close();
}
if($funcion === 'actualizaAnimal'){//Agrega un animal a la base de datos
    
    //$input = json_decode(file_get_contents("php://input"), true);
    // Accede directamente a $_POST en lugar de leer php://input
    $id_animal = $_POST['id_animal']??0;
    $nombre = $_POST['nombre'] ?? '';
    $clase = $_POST['clase'] ?? '';
    $raza = $_POST['raza'] ?? '';
    $sexo = $_POST['sexo'] ?? '';
    $identificador = $_POST['identificador'] ?? 0;
    $tamaño = $_POST['tamaño'] ?? '';
    $situacion = $_POST['situacion'] ?? '';
    $fechaNacimiento = $_POST['fechaNacimiento'] ?? '';
    $fechaEntrada = $_POST['fechaEntrada'] ?? '';
    $peso = $_POST['peso'] ?? 0;
    $descripcion = $_POST['descripcion'] ?? '';
    $comportamiento = $_POST['comportamiento'] ?? '';
    $socializacion = $_POST['socializacion'] ?? '';
    $nivel = $_POST['nivel'] ?? 0;
    $ppp = $_POST['ppp'] ?? 0;
    $foto = '';
    $errores = [];
    // Validaciones básicas
    if(empty($id_animal) || $id_animal === 0) $errores['id_animal'] = "El id_animal es obligatorio";
    if (empty($nombre)) $errores['nombre'] = "El nombre es obligatorio";
    if (empty($clase)) $errores['clase'] = "La clase es obligatoria";
    if (empty($raza)) $errores['raza'] = "La clase es obligatoria";
    if (empty($sexo)) $errores['sexo'] = "El sexo es obligatorio";
    if (empty($identificador) || $identificador === 0 || is_nan($identificador)) $errores['identificador'] = "El identificador es obligatorio y debe ser un número mayor que 0";
    if (empty($tamaño)) $errores['tamaño'] = "El tamaño es obligatorio";
    if (empty($situacion)) $errores['situacion'] = "La situación es obligatoria";
    if (empty($fechaNacimiento)) $errores['fechaNacimiento'] = "La fecha de nacimiento es obligatoria";
    if (empty($fechaEntrada)) $errores['fechaEntrada'] = "La fecha de entrada es obligatoria";
    if(empty($peso) || is_nan($peso)|| $peso <0) $errores['peso'] = "El peso debe ser un número positivo";
    if (empty($nivel) || is_nan($nivel)) $errores['nivel'] = "El nivel es obligatorio y debe ser un número entre 1 y 5";
    if (empty($clase)) $errores['clase'] = "La clase es obligatoria";
     // Validar el formato de la fecha
    $fecha_obj = DateTime::createFromFormat('Y-m-d', $fechaNacimiento);
    if (!$fecha_obj || $fecha_obj->format('Y-m-d') !== $fechaNacimiento) {
        $errores['fechaNacimiento'] = "Formato de fecha de Nacimiento inválido";
    }
     // Validar el formato de la fecha
    $fecha_obj2 = DateTime::createFromFormat('Y-m-d', $fechaEntrada);
    if (!$fecha_obj2 || $fecha_obj2->format('Y-m-d') !== $fechaEntrada) {
        $errores['fechaEntrada'] = "Formato de fecha de entrada inválido";
    }
    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }

    // Verificacion de duplicidad del identificador
    $fila = buscaAnimalPorID($conn,$identificador);
    if($fila && isset($fila['identificador']) && $fila['identificador'] === $identificador) $errores['identificador'] = "el identificador ya existe";
    
    //Verificacion gatos no PPP
    if($clase === "gato" && $ppp === 1) $errores['clase']="un gato no puede ser ppp";

    //Verificacion nivel entre 0 y 5
    if($nivel<0 || $nivel>5)$errores['nivel'] = "el nivel debe estar entre 0 y 5";

    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }
    /*
    echo json_encode(["data" => $nombre,"message" => "Registro exitoso"]);
    exit();
*/


    // Procesa la foto si fue enviada
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
        $fotoNombre = 'A_'.$nombre.'_'.$identificador . '.' . $extension;
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


    //agregaAnimal($conn);

    // Si se subió una nueva foto, actualiza también el campo foto
    if (!empty($foto)) {
        $sql = "UPDATE animal SET 
            nombre=?, clase=?, raza=?, sexo=?, identificador=?, tamaño=?, situacion=?, fecha_nacimiento=?, fecha_entrada=?, nivel=?, peso=?, descripcion=?, foto=?, comportamiento=?, socializacion=?, ppp=?
            WHERE id_animal=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssissssiissssii", $nombre, $clase, $raza, $sexo, $identificador, $tamaño, $situacion, $fechaNacimiento, $fechaEntrada, $nivel, $peso, $descripcion, $foto, $comportamiento, $socializacion, $ppp, $id_animal);
    } else {
        // Si no se subió nueva foto, no actualices el campo foto
        $sql = "UPDATE animal SET 
            nombre=?, clase=?, raza=?, sexo=?, identificador=?, tamaño=?, situacion=?, fecha_nacimiento=?, fecha_entrada=?, nivel=?, peso=?, descripcion=?, comportamiento=?, socializacion=?, ppp=?
            WHERE id_animal=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssissssiisssii", $nombre, $clase, $raza, $sexo, $identificador, $tamaño, $situacion, $fechaNacimiento, $fechaEntrada, $nivel, $peso, $descripcion, $comportamiento, $socializacion, $ppp, $id_animal);
    }

    if ($stmt->execute()) {
        echo json_encode(["message" => "Animal actualizado exitosamente"]);
    } else {
        echo json_encode(["message" => "Error al actualizar el animal"]);
    }

    $stmt->close();
    $conn->close();
}
if($funcion === 'buscaAnimalPorid_animal'){//Modifica un animal a la base de datos
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['id_animal'])) {
        $id_animal = $input['id_animal'];
    } else {

        echo json_encode(array("mensaje" => "ID de animal no proporcionado"));
        exit;
    }
    $fila = buscaAnimalPorid_animal($conn, $id_animal);
    if (!$fila) {
        echo json_encode(["errores" => ["id_animal" => "No existe ningún animal con ese id_animal"]]);
        exit();
    }else{

    }
    echo json_encode($fila);
    

}
if($funcion === 'buscaEstadoAnimal'){//Modifica un animal a la base de datos
    $input = json_decode(file_get_contents("php://input"), true);
    buscaEstadoAnimal($conn, $input['id_animal']);
    //Agregar tambien el estado 

}
if($funcion === 'buscaUsuariosPorAnimal'){
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['id_animal'])) {
        $id_animal = $input['id_animal'];
    } else {

        echo json_encode(array("mensaje" => "ID de animal no proporcionado"));
        exit;
    }
    $fila = buscaUsuariosPorAnimal($conn, $id_animal);
    if (!$fila) {
        echo json_encode(["errores" => ["id_animal" => "No existe ningún usuario para ese id_animal"]]);
        exit();
    }else{

    }
    echo json_encode($fila);
    

}
if($funcion === 'borraPorId'){
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['id_animal'])) {
        $id_animal = $input['id_animal'];
    } else {
        echo json_encode(array("mensaje" => "ID de animal no proporcionado"));
        exit;
    }
    echo borraAnimalPorId($conn, $id_animal);
}
?>