<?php
session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="description" content="Meta description">
		<meta name=viewport content="width=device-width, initial-scale=1">
		<title>Welcome</title>
	<link rel="stylesheet" href="style/stylesheet.css">
	</head>


  
<header>

<nav>
	

  <div class="header-login">
 
 <?php
 if(isset($_SESSION["userId"])){

echo ' <div id="menubar">
        <ul id="menu">
          
       	  <li><a href="index.php">Home</a></li>
          <li><a href="show.php">Auto Services</a></li>
          <li><a href="show1.php">Electrical services</a></li>
          <li><a href="show2.php">Medical services</a></li>
        <div class="topnav-right">  <li><form action="includes/logout.inc.php" method="post"></li>
		  <li><button type="submit" name="logout-submit">Logout</button></li></form></div>
		</ul>
      </div>';

 }
 else{
 	echo'<form action="includes/login.inc.php" method="post">
 	<input type="text" name="mailuid" placeholder="Email/Username">
 	<input type="password" name="pwd" placeholder="Password">
 	<button type="submit" name="login-submit">Login</button>
</form>
<a href="signup.php">Signup</a>';


 }
?>
</nav>
    
 </div>
</header>



