<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Incluye el autoloader de Composer

$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP de IONOS
    $mail->isSMTP();
    $mail->Host = 'smtp.ionos.es'; // o smtp.ionos.com dependiendo de tu región
    $mail->SMTPAuth = true;
    $mail->Username = 'tu-correo@tudominio.com'; // Tu correo IONOS
    $mail->Password = 'tu_contraseña';           // Tu contraseña
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Usar SSL
    $mail->Port = 465;

    // Remitente y destinatario
    $mail->setFrom('tu-correo@tudominio.com', 'Tu Nombre');
    $mail->addAddress('destinatario@ejemplo.com', 'Nombre Destinatario');

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = 'Asunto de prueba';
    $mail->Body = '<h1>Hola desde IONOS</h1><p>Este correo fue enviado usando PHPMailer y SMTP.</p>';

    $mail->send();
    echo 'Correo enviado con éxito.';
} catch (Exception $e) {
    echo "Error al enviar el correo: {$mail->ErrorInfo}";
}
?>