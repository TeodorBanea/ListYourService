<?php
include_once 'includes/dbh2.inc.php';

require "header.php";
	echo"<table border='1' width='800' cellspacing='0' border-collapse:collapse>
 		<tr>
 		<th>Name</th>
 		<th>Address</th>
 		<th>Phone</th>
 		<th>Description</th></tr>";
 echo'<a href="add2.php">Add medical service</a>';
	$sql ='SELECT * FROM medical;';
 	$result =mysqli_query($conn, $sql);
 	$resultCheck =mysqli_num_rows($result);
 	
 if($resultCheck > 0 ){
 	while($row = mysqli_fetch_assoc($result)){
 		
 		echo "<tr><td>". $row['Name']."</td><td>". $row['Address'] . "</td><td>". $row['Phone'] ."</td><td>" . $row["Description"]."</td></tr>";}
 		echo"</table>";
 
 	
}
require "footer.php";
?>