<?php
	require("../functions.php");

	if($POST_ASSOC === NULL || empty($POST_ASSOC["item"]) || empty($POST_ASSOC["bin"])){
		exit('{"dbinfo":["1", -1, null]}');
	}

	exit(json_encode(moveItemBin($POST_ASSOC["item"], $POST_ASSOC["bin"])));

?>
