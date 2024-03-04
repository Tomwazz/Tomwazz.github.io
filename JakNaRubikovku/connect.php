<?php
// Připojení k databázi
$servername = "localhost";
$username = "uzivatel";
$password = "heslo";
$dbname = "databaze";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Připojení k databázi selhalo: " . $conn->connect_error);
}

// Zpracování odeslaných dat z formuláře
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$course = $_POST['course'];
$query = $_POST['query'];

// Uložení dat do databáze
$sql = "INSERT INTO objednavky_kurzu (jmeno, email, telefon, kurz, dotaz)
VALUES ('$name', '$email', '$phone', '$course', '$query')";

if ($conn->query($sql) === TRUE) {
    echo "Objednávka byla úspěšně odeslána.";
} else {
    echo "Chyba při odesílání objednávky: " . $conn->error;
}

$conn->close();
?>