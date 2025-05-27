<?php
include('url.php');
header("Access-Control-Allow-Origin: $url"); // Allow any domain (replace * with a specific origin if needed)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow necessary headers

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES["file"])) {
        $carpetaFotos = "../ProyectoReact/public/imagenes/"; // Carpeta donde se guardarán las imágenes
        if (!is_dir($carpetaFotos)) {
            mkdir($carpetaFotos, 0777, true); // Crea la carpeta si no existe
        }

        $foto = basename($_FILES["file"]["name"]);
        $rutaDestino = $carpetaFotos . $foto;

        // Validar el tipo de archivo
        $tipoArchivo = strtolower(pathinfo($rutaDestino, PATHINFO_EXTENSION));
        $tiposPermitidos = ["jpg", "jpeg", "png", "gif"];

        if (in_array($tipoArchivo, $tiposPermitidos)) {
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $rutaDestino)) {
                echo json_encode(["message" => "Imagen subida con éxito"]);
            } else {
                echo json_encode(["message" => "Error al mover el archivo"]);
            }
        } else {
            echo json_encode(["message" => "Tipo de archivo no permitido"]);
        }
    } else {
        echo json_encode(["message" => "No se recibió ningún archivo"]);
    }
} else {
    echo json_encode(["message" => "Método no permitido"]);
}
?>
