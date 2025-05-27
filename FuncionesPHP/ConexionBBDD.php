<?php

$servername = "93.93.117.225";
$username = "gestorRivanimal";
$password ="rivanimal-gestion123";
$dbname = "rivanimal";
/*
$servername = "93.93.117.225:3306";
$username = "root";
$password ="JuHeE4nX";
$dbname = "rivanimal";
*/
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}else{
    echo "Conexion correcta";
}
?>