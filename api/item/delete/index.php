<?php
	require("../functions.php");

	if($POST_ASSOC === NULL || empty($POST_ASSOC["item"])){
		exit('{"dbinfo":["Missing vital data", -1, null]}');
	}

	exit(json_encode(deleteItem($POST_ASSOC["item"])));
?>
