<?php
require "header.php";
?>
<style>
 body
 {
	background-color:lightblue;
}
</style>
<body>
<?php
if(isset($_SESSION["userId"])){
require 'vreme.php';
echo '<h4> Welcome to our website!</h4>
 <p1> We hope we have made your life easier by helping you with our informations about the service providers you are looking for.</p1><br>
 <p2> If you have any questions or if you need help with your service booking please contact us right away and we can help you 24/7 </p2>';
require 'contactmap.html';
}
else
{ echo '<h3>Please login to access the database of the website</h3>';
}
?>
</body>
<?php
require "footer.php";
?>