<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
    include("ConexionBBDD.php");
    function consigueIdUsuario($conn, $usuario){
        $sql = "SELECT id FROM usuarios WHERE nombreUsuario = '$usuario'";
        $resultado = mysqli_query($conn, $sql);
        if ($resultado) {
            $fila = mysqli_fetch_assoc($resultado);
            return $fila['id_usuario'];
        } else {
            return null;
        }
    }
    //Consulta para comprobar si existe el nombre de usuario
    function comprobarNombreUsuario($nombreUsuario, $conexion){
        $consulta = "SELECT * FROM usuarios WHERE nombreUsuario = '$nombreUsuario'";
        $resultado = mysqli_query($conexion, $consulta);
        $filas = mysqli_num_rows($resultado);
        if($filas > 0){
            return "El nombre de usuario ya existe";
        }else{
            return "El nombre de usuario está disponible";
        }
    }
    function consultaAnimales($conn){
        $consulta="SELECT * FROM animal";
        $resultado = mysqli_query($conn, $consulta);
        $resultado = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
        return $resultado;
    }
    function buscarUsuarioPorId($conn, $id_usuario) {
        $sql = "SELECT * FROM usuario WHERE id_usuario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $id_usuario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();
            return $fila['id'];
        } else {
            return null;
        }
    }
    function buscaUsuarioPorNombreUsuario($conn, $nombre_usuario) {
        $sql = "SELECT * FROM usuario WHERE nombre_usuario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $nombre_usuario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        } else {
            return null;
        }
    }

    function buscaAnimalPorID($conn, $id_animal){
        if (!is_numeric($id_animal)) {
            return array("error" => "El ID del animal debe ser un número.");
        }
    
        $sql = "SELECT * FROM animal WHERE identificador = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_animal);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        } else {
            return null;
        }
    
    }

    function buscaPaseosPorReporteDiario($conn, $id_reporte_diario){
        $sql = "SELECT * FROM reporte_paseo WHERE reporte_diario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_reporte_diario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return null;
        }
    }
    function buscaPaseosPorAnimal($conn, $id_animal){
        $sql = "SELECT * FROM reporte_paseo WHERE animal = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_animal);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return null;
        }
    }
    function buscaTratamientoPorAnimal($conn, $id_animal){
        $sql = "SELECT * FROM tratamiento WHERE animal = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_animal);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return null;
        }
    }
?>