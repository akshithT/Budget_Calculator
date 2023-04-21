<?php

$host = "localhost";
$username = "root";
$password = "";
$dbname = "myapp";
$conn = new mysqli($host, $username, $password, $dbname);
// Check if the connection was successful 

//Check for errors
if (!$conn) {
 die("Connection failed: " . mysqli_connect_error());
} 
