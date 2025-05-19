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


$funcion = $_GET['funcion'] ?? '';

if ($funcion === 'buscarPorAnimal') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idanimal']) && !empty($input['idanimal'])) {
        $idanimal = $input['idanimal'];
        echo json_encode(buscarRepGatPoridanimal($conn, $idanimal));
    } else {
        echo json_encode(array("mensaje" => "Datos incompletos"));
    }
}
if($funcion === 'buscarPorReporteDiario') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (isset($input['idreporteDiario']) && !empty($input['idreporteDiario'])) {
        $idreporteDiario = $input['idreporteDiario'];
        echo json_encode(buscarRepGatRD($conn, $idreporteDiario));
    } else {
        echo json_encode(array("mensaje" => "Datos incompletos"));
    }

}
if($funcion=== 'agregaReporteGato'){
    $voluntario = $_POST['voluntario'] ?? '';
    $animal = $_POST['animal'] ?? 0;
    $reporte_diario = $_POST['reporte_diario'] ?? 0;
    $caca_nivel = $_POST['caca_nivel'] ?? 0;
    $fecha_hora_inicio = $_POST['fecha_hora_inicio'] ?? '';
    $fecha_hora_fin = $_POST['fecha_hora_fin'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';

    $errores = [];

    if (empty($voluntario)) $errores['voluntario'] = "El voluntario es obligatorio";
    if (empty($animal) || $animal == 0) $errores['animal'] = "El animal es obligatorio";
    if (empty($reporte_diario) || $reporte_diario === 0) $errores['reporte_diario'] = "El reporte diario es obligatorio";
    if (empty($fecha_hora_inicio)) $errores['fecha_hora_inicio'] = "La fecha de inicio es obligatoria";
    if (empty($fecha_hora_fin)) $errores['fecha_hora_fin'] = "La fecha de fin es obligatoria";

    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }
    
    // Comprobar que la fecha hora de inicio y la de fin son distintas
    if ($fecha_hora_inicio === $fecha_hora_fin) {
        $errores['fecha_hora_fin'] = "La fecha y hora de inicio y fin deben ser distintas";
    }

    // Validar y convertir el formato de la fecha y hora: de 'Y-m-d\TH:i' (HTML datetime-local) a 'Y-m-d H:i:s'
    $fecha_obj = DateTime::createFromFormat('Y-m-d\TH:i', $fecha_hora_inicio);
    if ($fecha_obj) {
        $fecha_hora_inicio = $fecha_obj->format('Y-m-d H:i:s');
    } else {
        $errores['fecha_hora_inicio'] = "Formato de fecha y hora de inicio inválido";
    }

    $fecha_obj2 = DateTime::createFromFormat('Y-m-d\TH:i', $fecha_hora_fin);
    if ($fecha_obj2) {
        $fecha_hora_fin = $fecha_obj2->format('Y-m-d H:i:s');
    } else {
        $errores['fecha_hora_fin'] = "Formato de fecha y hora de fin inválido";
    }

    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }

    // Comprobar que ambas fechas coinciden con la fecha del reporte diario
    $reporte_diario_completo = buscaReporteDiarioPorId($conn, $reporte_diario);
    if ($reporte_diario_completo && isset($reporte_diario_completo[0]['fecha'])) {
        $fecha_reporte = $reporte_diario_completo[0]['fecha']; // formato 'Y-m-d'
        $fecha_inicio = substr($fecha_hora_inicio, 0, 10); // extrae 'Y-m-d'
        $fecha_fin = substr($fecha_hora_fin, 0, 10); // extrae 'Y-m-d'
        if ($fecha_inicio !== $fecha_reporte) {
            $errores['fecha_hora_inicio'] = "La fecha de inicio no coincide con la fecha del reporte diario";
        }
        if ($fecha_fin !== $fecha_reporte) {
            $errores['fecha_hora_fin'] = "La fecha de fin no coincide con la fecha del reporte diario";
        }
    } else {
        $errores['reporte_diario'] = "No se encontró el reporte diario especificado o está incompleto";
    }

    if (!empty($errores)) {
        echo json_encode(["errores" => $errores]);
        exit();
    }
    
    echo agregaReporteGato($conn, $voluntario, $animal, $reporte_diario, $caca_nivel, $descripcion, $fecha_hora_inicio, $fecha_hora_fin);
}
?>