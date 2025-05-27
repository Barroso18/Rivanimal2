<?php
/*
include('url.php');
header("Access-Control-Allow-Origin: $url");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
*/
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
    include("ConexionBBDD.php");
    function consigueIdUsuario($conn, $usuario){
        $sql = "SELECT id_usuario FROM usuario WHERE nombre_usuario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        } else {
            return null;
        }
    }
    //Comprueba duplicidades de reporte diario en un dia de un usuario
    function compruebaDuplicados($conn,$usuario,$fecha,$horario){
        $checkSql = "SELECT usuario, fecha, horario FROM reporte_diario WHERE usuario = ? AND fecha = ? AND horario = ?";
        $stmt = $conn->prepare($checkSql);
        $stmt->bind_param("iss", $usuario, $fecha, $horario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
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
    function buscarUsuarioPorIdLimitado($conn, $id_usuario) {
        $sql = "SELECT id_usuario,nombre,apellido1,apellido2,nombre_usuario,roles FROM usuario WHERE id_usuario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_usuario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        } else {
            return null;
        }
    }
    function buscarUsuarioPorId($conn, $id_usuario) {
        $sql = "SELECT * FROM usuario WHERE id_usuario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_usuario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
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
    function buscarTodosUsuarios($conn){
        $sql = "SELECT * FROM usuario";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
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
    function buscaAnimalPorid_animal($conn, $id_animal){
        if (!is_numeric($id_animal)) {
            return array("error" => "El ID del animal debe ser un número.");
        }
    
        $sql = "SELECT * FROM animal WHERE id_animal = ?";
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
    function buscaAnimalPorUsuario($conn, $usuario){
        $sql = "SELECT DISTINCT a.* 
            FROM animal a
            LEFT JOIN reporte_paseo rp ON rp.animal = a.id_animal AND rp.usuario = ?
            LEFT JOIN reporte_gatos rg ON rg.gato = a.id_animal AND rg.usuario = ?
            WHERE rp.usuario IS NOT NULL OR rg.usuario IS NOT NULL";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $usuario, $usuario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return null;
        }
    }

    function buscaUsuariosPorAnimal($conn, $id_animal){
        $sql = "SELECT DISTINCT u.*,
                    COALESCE(rdp.rol, rdg.rol) AS rol
                FROM usuario u
                LEFT JOIN reporte_paseo rp ON rp.usuario = u.id_usuario AND rp.animal = ?
                LEFT JOIN reporte_diario rdp ON rp.reporte_diario = rdp.id_reporte_diario
                LEFT JOIN reporte_gatos rg ON rg.usuario = u.id_usuario AND rg.gato = ?
                LEFT JOIN reporte_diario rdg ON rg.reporte_diario = rdg.id_reporte_diario
                WHERE rp.animal IS NOT NULL OR rg.gato IS NOT NULL";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $id_animal, $id_animal);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return null;
        }
    }

    function buscaPaseosPorReporteDiario($conn, $id_reporte_diario){
        $sql = "SELECT rp.*, a.nombre AS nombre_animal, u.nombre_usuario AS nombre_usuario FROM reporte_paseo AS rp INNER JOIN  animal a ON rp.animal = a.id_animal INNER JOIN usuario u ON rp.usuario = u.id_usuario WHERE reporte_diario = ?";
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
        $sql = "SELECT rp.*, a.nombre AS nombre_animal, u.nombre AS usuario_nombre, u.nombre_usuario AS nombre_usuario
                FROM reporte_paseo rp INNER JOIN  animal a ON rp.animal = a.id_animal INNER JOIN  usuario u ON rp.usuario = u.id_usuario WHERE rp.animal = ? ORDER BY rp.fecha_hora_inicio DESC";
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
    function agregaReporteDiario($conn, $usuario, $rol, $fecha, $horario){
        // Inserta en la base de datos
        $sql = "INSERT INTO reporte_diario (usuario, rol, fecha, horario) 
        VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isss", $usuario, $rol, $fecha, $horario);

        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            return json_encode(["message" => "Registro exitoso"]);
        } else {
            $stmt->close();
            $conn->close();
            return json_encode(["message" => "Error al registrar el reporte diario"]);
        }

        
    }
    function buscaReporteDiarioPorId($conn, $id_reporte_diario){
        $sql = "SELECT * FROM reporte_diario WHERE id_reporte_diario = ?";
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
    function agregaPaseo($conn, $voluntario,$animal,$reporte_diario, $ubicaciones,$caca_nivel,$descripcion,$fecha_hora_inicio,$fecha_hora_fin){
        $sql = "INSERT INTO reporte_paseo (animal, usuario, reporte_diario, fecha_hora_inicio, fecha_hora_fin, descripcion, caca_nivel, ubicaciones) 
        VALUES (?, ?, ?, ?,?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiisssis", $animal, $voluntario, $reporte_diario, $fecha_hora_inicio,$fecha_hora_fin,$descripcion,$caca_nivel,$ubicaciones);

        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            return json_encode(["message" => "Registro exitoso"]);
        } else {
            $stmt->close();
            $conn->close();
            return json_encode(["message" => "Error al registrar el reporte paseo"]);
        }
    }
    function agregaReporteGato($conn, $voluntario, $animal, $reporte_diario, $caca_nivel, $descripcion, $fecha_hora_inicio, $fecha_hora_fin){
        $sql = "INSERT INTO reporte_gatos (gato, usuario, reporte_diario, fecha_hora_inicio, fecha_hora_fin, descripcion, caca_nivel) 
        VALUES (?, ?, ?, ?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiisssi", $animal, $voluntario, $reporte_diario, $fecha_hora_inicio,$fecha_hora_fin,$descripcion,$caca_nivel);

        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            return json_encode(["message" => "Registro exitoso"]);
        } else {
            $stmt->close();
            $conn->close();
            return json_encode(["message" => "Error al registrar el reporte gatos"]);
        }
    }
    function borraPaseoPorId($conn, $id_paseo){
        $sql = "DELETE FROM reporte_paseo WHERE id_paseo = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_paseo);

        if ($stmt->execute()) {
            $filas_afectadas = $stmt->affected_rows;
            $stmt->close();
            $conn->close();
            return json_encode([
                "mensaje" => "Paseo eliminado exitosamente",
                "filas_eliminadas" => $filas_afectadas
            ]);
        } else {
            $error = $stmt->error;
            $stmt->close();
            $conn->close();
            return json_encode([
                "mensaje" => "Error al eliminar el paseo",
                "error" => $error
            ]);
        }
    }
    function borraReporteGatoPorId($conn, $id_rep){
        $sql = "DELETE FROM reporte_gatos WHERE id_rep_gatos = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_rep);

        if ($stmt->execute()) {
            $filas_afectadas = $stmt->affected_rows;
            $stmt->close();
            $conn->close();
            return json_encode([
                "mensaje" => "Reporte gato eliminado exitosamente",
                "filas_eliminadas" => $filas_afectadas
            ]);
        } else {
            $error = $stmt->error;
            $stmt->close();
            $conn->close();
            return json_encode([
                "mensaje" => "Error al eliminar el reporte gato",
                "error" => $error
            ]);
        }
    }
    function borraReporteDiarioPorId($conn, $id_rep){
        $sql = "DELETE FROM reporte_diario WHERE id_reporte_diario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_rep);

        if ($stmt->execute()) {
            $filas_afectadas = $stmt->affected_rows;
            $stmt->close();
            $conn->close();
            return json_encode([
                "mensaje" => "Eliminación completada",
                "filas_eliminadas" => $filas_afectadas
            ]);
        } else {
            $error = $stmt->error;
            $stmt->close();
            $conn->close();
            return json_encode([
                "mensaje" => "Error al eliminar el reporte diario",
                "error" => $error
            ]);
        }
    }
    function borraUsuarioPorId($conn, $id_usuario){
        $foto = '';
        // 1. Obtener la ruta de la foto asociada al usuario
        $sql_foto = "SELECT foto FROM usuario WHERE id_usuario = ?";
        $stmt_foto = $conn->prepare($sql_foto);
        $stmt_foto->bind_param("i", $id_usuario);
        $stmt_foto->execute();
        $stmt_foto->bind_result($foto);
        $stmt_foto->fetch();
        $stmt_foto->close();

        // 2. Borrar el archivo de la foto si existe y no es vacío
        if (!empty($foto)) {
            $foto = substr($foto, 3); // Quita los 3 primeros caracteres si es necesario
            $ruta_foto = __DIR__ . "/../ProyectoReact/public/" . $foto;
            if (file_exists($ruta_foto)) {
                unlink($ruta_foto);
            }
        }

        // 3. Borrar el usuario de la base de datos
        $sql = "DELETE FROM usuario WHERE id_usuario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_usuario);

        if ($stmt->execute()) {
            $filas_afectadas = $stmt->affected_rows;
            $stmt->close();
            $conn->close();
            return json_encode([
                "mensaje" => "Usuario eliminado exitosamente",
                "filas_eliminadas" => $filas_afectadas
            ]);
        } else {
            $error = $stmt->error;
            $stmt->close();
            $conn->close();
            return json_encode([
                "mensaje" => "Error al eliminar el usuario",
                "error" => $error
            ]);
        }
    }
    function borraAnimalPorId($conn, $id_animal) {
        $foto = '';
        // 1. Obtener la ruta de la foto asociada al animal
        $sql_foto = "SELECT foto FROM animal WHERE id_animal = ?";
        $stmt_foto = $conn->prepare($sql_foto);
        $stmt_foto->bind_param("i", $id_animal);
        $stmt_foto->execute();
        $stmt_foto->bind_result($foto);
        $stmt_foto->fetch();
        $stmt_foto->close();

        // 2. Borrar el archivo de la foto si existe y no es vacío
        if (!empty($foto)) {
            $foto = substr($foto, 3); // Quita los 3 primeros caracteres
            $ruta_foto = __DIR__ . "/../ProyectoReact/public/" . $foto;
            if (file_exists($ruta_foto)) {
                unlink($ruta_foto);
            }
        }

        // 3. Borrar el animal de la base de datos
        $sql = "DELETE FROM animal WHERE id_animal = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_animal);

        if ($stmt->execute()) {
            $filas_afectadas = $stmt->affected_rows;
            $stmt->close();
            $conn->close();
            return json_encode([
                "mensaje" => "Animal eliminado exitosamente",
                "filas_eliminadas" => $filas_afectadas
            ]);
        } else {
            $error = $stmt->error;
            $stmt->close();
            $conn->close();
            return json_encode([
                "mensaje" => "Error al eliminar el animal",
                "error" => $error
            ]);
        }
    }
    function agregarChenil($conn, $numero, $reja, $guillotina, $activo, $descripcion){
        $sql = "INSERT INTO chenil (numero, guillotina, reja, activo, descripcion) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiiis", $numero, $guillotina, $reja, $activo, $descripcion);
        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            return ["mensaje" => "Chenil creado"];
        } else {
            $stmt->close();
            $conn->close();
            return ["errores" => "Error al crear el chenil"];
        }
    }
    function asignarChenil($conn,$id_animal,$id_chenil,$activo){
        $sql = "INSERT INTO chenil_animal (animal, chenil, activo) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iii", $id_animal, $id_chenil,$activo);
        if ($stmt->execute()) {
            $stmt->close();
            $conn->close();
            return ["mensaje" => "Chenil asignado"];
        } else {
            $stmt->close();
            $conn->close();
            return ["errores" => "Error al asignar el chenil"];
        }
    }
    function buscaChenilPorNumero($conn,$numero){
        $sql ="SELECT * FROM chenil WHERE numero = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $numero);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return ["errores" => "No hay cheniles con ese número"];
        }
    }
    function buscaChenilSinAsignar($conn){
        $sql ="SELECT * FROM chenil WHERE activo = 1 AND id_chenil NOT IN (SELECT chenil FROM chenil_animal);";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return ["errores" => "No hay cheniles libres"];
        }
    }
    function existeChenilPorNumero($conn, $numero) {
        $total = 0;
        $sql = "SELECT COUNT(*) AS total FROM chenil WHERE numero = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $numero);
        $stmt->execute();
        $stmt->bind_result($total);
        $stmt->fetch();
        $stmt->close();
        return $total > 0;
    }
    function cargaRazasSugerencias($conn, $clase){
        $sql = "SELECT nombre FROM raza_animal WHERE clase = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $clase);
        $stmt->execute();
        $resultado = $stmt->get_result();
        $razas = [];
        if ($resultado && $resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                $razas[] = $fila['nombre'];
            }
        }
        $stmt->close();
        return $razas;
    }


    /*
    function agregaAnimal($conn){//Sin terminar
        $sql = "INSERT INTO animal (nombre, clase, raza, sexo,identificador,tamaño,situacion,fecha_nacimiento,fecha_entrada,nivel,peso,descripcion,foto,comportamiento,socializacion,ppp) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
        $stmt = $conn->prepare($sql);
        //$stmt->bind_param("isss", $usuario, $rol, $fecha, $horario);
    }
        */
    function buscaEstadoAnimal($conn, $id_animal){
        $sql = "SELECT codigo FROM estado WHERE id_estado = ?";
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
    function buscaReportesDiariosPorUsuario($conn, $idusuario){
        $sql = "SELECT rd.*, u.nombre AS usuario_nombre, u.nombre_usuario AS nombre_usuario FROM reporte_diario AS rd INNER JOIN  usuario u ON rd.usuario = u.id_usuario WHERE usuario = ?  ORDER BY fecha DESC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $idusuario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return null;
        }
    }

    function buscarRepGatPoridanimal($conn, $idanimal){
        $sql = "SELECT rg.*, a.nombre AS nombre_animal, u.nombre AS usuario_nombre, u.nombre_usuario AS nombre_usuario FROM reporte_gatos rg INNER JOIN  animal a ON rg.gato = a.id_animal INNER JOIN  usuario u ON rg.usuario = u.id_usuario WHERE rg.gato = ? ORDER BY rg.fecha_hora_fin DESC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $idanimal);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return null;
        }
    }

    function buscarRepGatRD($conn, $idrepDiario){
        $sql = "SELECT rg.*, a.nombre AS nombre_animal, u.nombre AS usuario_nombre, u.nombre_usuario AS nombre_usuario FROM reporte_gatos rg INNER JOIN  animal a ON rg.gato = a.id_animal INNER JOIN  usuario u ON rg.usuario = u.id_usuario WHERE rg.reporte_diario = ? ORDER BY rg.fecha_hora_fin DESC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $idrepDiario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado && $resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } else {
            return null;
        }
    }
    function buscaNumeroChenilPorIdAnimal($conn, $id_animal) {
        $numero = 0;
        $sql = "SELECT c.numero 
                FROM chenil_animal ca
                INNER JOIN chenil c ON ca.chenil = c.id_chenil
                WHERE ca.animal = ? AND ca.activo = 1";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_animal);
        $stmt->execute();
        $stmt->bind_result($numero);
        if ($stmt->fetch()) {
            $stmt->close();
            return $numero;
        } else {
            $stmt->close();
            return null; // No tiene chenil asignado
        }
    }
?>