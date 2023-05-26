<?php
// Récupérer les données du formulaire
$name = $_POST['name'];
$society = $_POST['society'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$city = $_POST['city'];
$message = $_POST['message'];

// Créer une connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testbtg";
$dbtable = "testbtg";

$conn = new mysqli($servername, $username, $password, $dbname, $dbtable);
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Préparer et exécuter la requête SQL
$sql = "INSERT INTO votre_nom_de_table (`name`, `society`, `email`, `phone`, `address`, `city`, `message`) 
        VALUES ('$name', '$society', '$email', '$phone', '$address', '$city', '$message')";

if ($conn->query($sql) === TRUE) {
    echo "Données insérées avec succès";
} else {
    echo "Erreur : " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
