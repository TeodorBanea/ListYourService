<?php 
if (isset($_POST['submit'])){
	$name = $_POST['name'];
	$subject = $_POST['name'];
	$mailfrom = $_POST['mail'];
	$message = $_POST['message'];

    $mailTo='teodor.toe@gmail.com';
    $headers ="From: ".$mailfrom;
    $txt ="You have received an e-mail from ".$name.".\n\n".$message;
mail($mailTo, $subject ,$txt,$headers);
header("Location: index.php?mailsent");
}