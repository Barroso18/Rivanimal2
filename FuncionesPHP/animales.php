<?php
/*
include("url.php");
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
    $identificador = isset($_POST['identificador']) ? intval($_POST['identificador']) : 0;
    $tamaño = $_POST['tamaño'] ?? '';
    $situacion = $_POST['situacion'] ?? '';
    $fechaNacimiento = $_POST['fechaNacimiento'] ?? '';
    $fechaEntrada = $_POST['fechaEntrada'] ?? '';
    var_dump($_POST['peso']);
    $peso = isset($_POST['peso']) ? str_replace(',', '.', $_POST['peso']) : 0;
    $descripcion = $_POST['descripcion'] ?? '';
    $comportamiento = $_POST['comportamiento'] ?? '';
    $socializacion = $_POST['socializacion'] ?? '';
    $nivel = isset($_POST['nivel']) ? intval($_POST['nivel']) : 0;
    $ppp = isset($_POST['ppp']) ? intval($_POST['ppp']) : 0;
    $localidad = $_POST['localidad'] ?? '';
    $disponibilidad = $_POST['disponibilidad'] ?? '';
    $foto = '';
    $errores = [];
    // Validaciones básicas
    if (empty(trim($nombre))) $errores['nombre'] = "El nombre es obligatorio";
    if (empty(trim($clase))) $errores['clase'] = "La clase es obligatoria";
    if (empty(trim($raza))) $errores['raza'] = "La clase es obligatoria";
    if (empty(trim($sexo))) $errores['sexo'] = "El sexo es obligatorio";
    if (!isset($identificador) || !is_numeric($identificador) || intval($identificador) <= 0) $errores['identificador'] = "El identificador es obligatorio y debe ser un número mayor que 0";
    if (empty(trim($tamaño))) $errores['tamaño'] = "El tamaño es obligatorio";
    if (empty(trim($situacion))) $errores['situacion'] = "La situación es obligatoria";
    if (empty(trim($fechaNacimiento))) $errores['fechaNacimiento'] = "La fecha de nacimiento es obligatoria";
    if (empty(trim($fechaEntrada))) $errores['fechaEntrada'] = "La fecha de entrada es obligatoria";
    if(!isset($peso) || !is_numeric($peso) || floatval($peso) < 0) $errores['peso'] = "El peso debe ser un número positivo";
    if (!isset($nivel) || !is_numeric($nivel) || intval($nivel) < 1 || intval($nivel) > 5) $errores['nivel'] = "El nivel es obligatorio y debe ser un número entre 1 y 5";
    if(empty(trim($localidad))) $errores['localidad']="La localidad es obligatoria";
    if(empty(trim($disponibilidad))) $errores['disponibilidad']="La disponibilidad es obligatoria";
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
    if ($clase === "gato" && $ppp === 1) {
        $errores['clase'] = "Un gato no puede ser PPP";
    }

    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }

    // Verificacion de duplicidad del identificador
    $fila = buscaAnimalPorID($conn,$identificador);
    if ($fila && isset($fila['identificador']) && intval($fila['identificador']) === intval($identificador)) $errores['identificador'] = "el identificador ya existe";
    
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
        if($clase === 'perro'){
            $fotoNombre = 'A_'.$nombre.'_P'. '.' . $extension;
        }
        if($clase === 'gato'){
            $fotoNombre = 'A_'.$nombre.'_G'. '.' . $extension;
        }
        $carpetaFotos = "/var/www/html/Rivanimal2/imagenes/";
        $fotoRuta = $carpetaFotos . $fotoNombre;
        $mime = mime_content_type($_FILES['file']['tmp_name']);
        $permitidos = ['image/jpeg', 'image/png', 'image/gif'];

        if (!in_array($mime, $permitidos)) {
            echo json_encode(["error" => "Formato de imagen no permitido"]);
            exit();
        }
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


    //agregaAnimal($conn);

   $sql = "INSERT INTO animal (nombre, clase, raza, sexo, identificador, tamaño, situacion, fecha_nacimiento, fecha_entrada, nivel, peso, descripcion, foto, comportamiento, socializacion, ppp, disponibilidad, localidad) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "ssssissssidsississ",
        $nombre, $clase, $raza, $sexo, $identificador, $tamaño, $situacion, $fechaNacimiento, $fechaEntrada, 
        $nivel, $peso, $descripcion, $foto, $comportamiento, $socializacion, $ppp, $disponibilidad, $localidad
    );
    if ($stmt->execute()) {
        echo json_encode(["message" => "Registro de animal exitoso"]);
    } else {
        echo json_encode(["message" => "Error al registrar el animal"]);
    }

    $stmt->close();
    $conn->close();
}
if($funcion === 'actualizaAnimal'){//Agrega un animal a la base de datos
    var_dump($_POST);
    //$input = json_decode(file_get_contents("php://input"), true);
    // Accede directamente a $_POST en lugar de leer php://input
    $id_animal = $_POST['id_animal']??0;
    $nombre = $_POST['nombre'] ?? '';
    $clase = $_POST['clase'] ?? '';
    $raza = $_POST['raza'] ?? '';
    $sexo = $_POST['sexo'] ?? '';
    $identificador = isset($_POST['identificador']) ? intval($_POST['identificador']) : 0;
    $tamaño = $_POST['tamaño'] ?? '';
    $situacion = $_POST['situacion'] ?? '';
    $fechaNacimiento = $_POST['fechaNacimiento'] ?? '';
    $fechaEntrada = $_POST['fechaEntrada'] ?? '';
    var_dump($_POST['peso']);
    $peso = isset($_POST['peso']) ? str_replace(',', '.', $_POST['peso']) : 0;
    //$peso = $_POST['peso'] ?? 0;
    $descripcion = $_POST['descripcion'] ?? '';
    $comportamiento = $_POST['comportamiento'] ?? '';
    $socializacion = $_POST['socializacion'] ?? '';
    $nivel = isset($_POST['nivel']) ? intval($_POST['nivel']) : 0;
    $ppp = isset($_POST['ppp']) ? intval($_POST['ppp']) : 0;
    $localidad = $_POST['localidad'] ?? '';
    $disponibilidad = $_POST['disponibilidad'] ?? '';
    $foto = '';
    $errores = [];
    // Validaciones básicas
    if (empty($nombre)) $errores['nombre'] = "El nombre es obligatorio";
    if (empty(trim($clase))) $errores['clase'] = "La clase es obligatoria";
    if (empty(trim($raza))) $errores['raza'] = "La clase es obligatoria";
    if (empty(trim($sexo))) $errores['sexo'] = "El sexo es obligatorio";
    if (!isset($identificador) || !is_numeric($identificador) || intval($identificador) <= 0) $errores['identificador'] = "El identificador es obligatorio y debe ser un número mayor que 0";
    if (empty(trim($tamaño))) $errores['tamaño'] = "El tamaño es obligatorio";
    if (empty(trim($situacion))) $errores['situacion'] = "La situación es obligatoria";
    if (empty(trim($fechaNacimiento))) $errores['fechaNacimiento'] = "La fecha de nacimiento es obligatoria";
    if (empty(trim($fechaEntrada))) $errores['fechaEntrada'] = "La fecha de entrada es obligatoria";
    if(!isset($peso) || !is_numeric($peso) || floatval($peso) < 0) $errores['peso'] = "El peso debe ser un número positivo";
    if (!isset($nivel) || !is_numeric($nivel) || intval($nivel) < 1 || intval($nivel) > 5) $errores['nivel'] = "El nivel es obligatorio y debe ser un número entre 1 y 5";
    if(empty(trim($localidad))) $errores['localidad']="La localidad es obligatoria";
    if(empty(trim($disponibilidad))) $errores['disponibilidad']="La disponibilidad es obligatoria";
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
    $fila = compruebaIdentificadorDuplicado($conn,$identificador,$id_animal);
    if ($fila) $errores['identificador'] = "el identificador ya existe";
    
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
        if($clase === 'perro'){
            $fotoNombre = 'A_'.$nombre.'_P'. '.' . $extension;
        }
        if($clase === 'gato'){
            $fotoNombre = 'A_'.$nombre.'_G'. '.' . $extension;
        }
        $carpetaFotos = "/var/www/html/Rivanimal2/imagenes/";
        $fotoRuta = $carpetaFotos . $fotoNombre;
        $mime = mime_content_type($_FILES['file']['tmp_name']);
        $permitidos = ['image/jpeg', 'image/png', 'image/gif'];

        if (!in_array($mime, $permitidos)) {
            echo json_encode(["error" => "Formato de imagen no permitido"]);
            exit();
        }
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


    //agregaAnimal($conn);

    // Si se subió una nueva foto, actualiza también el campo foto
    if (!empty($foto)) {
        $sql = "UPDATE animal SET 
            nombre=?, clase=?, raza=?, sexo=?, identificador=?, tamaño=?, situacion=?, fecha_nacimiento=?, fecha_entrada=?, nivel=?, peso=?, descripcion=?, foto=?, comportamiento=?, socializacion=?, ppp=?, localidad=?, disponibilidad=?
            WHERE id_animal=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssissssidsissssi", $nombre, $clase, $raza, $sexo, $identificador, $tamaño, $situacion, $fechaNacimiento, $fechaEntrada, $nivel, $peso, $descripcion, $foto, $comportamiento, $socializacion, $ppp, $localidad, $disponibilidad, $id_animal);
    } else {
        $sql = "UPDATE animal SET 
            nombre=?, clase=?, raza=?, sexo=?, identificador=?, tamaño=?, situacion=?, fecha_nacimiento=?, fecha_entrada=?, nivel=?, peso=?, descripcion=?, comportamiento=?, socializacion=?, ppp=?, localidad=?, disponibilidad=?
            WHERE id_animal=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssissssidsisssi", $nombre, $clase, $raza, $sexo, $identificador, $tamaño, $situacion, $fechaNacimiento, $fechaEntrada, $nivel, $peso, $descripcion, $comportamiento, $socializacion, $ppp, $localidad, $disponibilidad, $id_animal);
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
if($funcion === 'crearChenil'){
    $input = json_decode(file_get_contents("php://input"), true);
    $numero = $input['datosRegistro']['numero'];
    $reja = $input['datosRegistro']['reja'] ?? 0;
    $guillotina = $input['datosRegistro']['guillotina'] ?? 0;
    $activo = $input['datosRegistro']['activo'] ?? 0;
    $descripcion = $input['datosRegistro']['descripcion'] ?? '';
    if (empty($input['datosRegistro']['numero']) || $input['datosRegistro']['numero'] === 0) {
        $errores['numero'] = "El campo número es obligatorio y distinto de 0";
    }
    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }
    $existeChenil = existeChenilPorNumero($conn,$numero);
    if($existeChenil){
        $errores['numero'] = "Ya existe un chenil con ese número";
    }
    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }
    echo json_encode(agregarChenil($conn, $numero,$reja,$guillotina,$activo,$descripcion));
}
if($funcion === 'editarChenil'){
    $numero = 0;
    
    //echo agregarChenil($conn, $numero,$reja,$guillotina,$activo,$descripcion);
}
if($funcion === 'asignarChenil'){
    $input = json_decode(file_get_contents("php://input"), true);
    
    $id_animal = $input['datosRegistro']['animal'];
    $id_chenil = $input['datosRegistro']['chenil'];
    $activo = $input['datosRegistro']['activo'];
    echo json_encode(asignarChenil($conn,$id_animal,$id_chenil,$activo));
    //echo agregarChenil($conn, $numero,$reja,$guillotina,$activo,$descripcion);
}
if($funcion === 'buscaChenilesLibres'){
    echo json_encode(buscaChenilSinAsignar($conn));
}
if($funcion === 'cargaRazasSugerencias'){
    $input = json_decode(file_get_contents("php://input"), true);
    if(isset($input['clase'])){
        $clase = $input['clase'];
    }else{
        echo json_encode(["error" => "La clase no puede ser vacia"]);
    }
    echo json_encode(cargaRazasSugerencias($conn, $clase));
}

if($funcion === 'buscaChenilAnimal'){
    $input = json_decode(file_get_contents("php://input"), true);
    if(isset($input['id_animal'])){
        $id_animal = $input['id_animal'];
    }else{
        echo json_encode(["error" => "ID de animal no proporcionado"]);
    }
    echo json_encode(buscaNumeroChenilPorIdAnimal($conn, $id_animal));
}
?>