<?php
$servername = "localhost";
$username = "daw2";
$password ="LaElipa";
$dbname = "rivanimal";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>