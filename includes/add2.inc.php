<?php

include 'dbh2.inc.php';
$Name=$_GET['Na'];
$Phone=$_GET['Pho'];
$Addr=$_GET['Add'];
$Desc=$_GET['Desc'];


$sql = "INSERT INTO medical (Name ,Phone ,Address ,Description) VALUES ('$Name', '$Phone', '$Addr','$Desc'); "; 
mysqli_query($conn,$sql);

header("Location: ../index.php");