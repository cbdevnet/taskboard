<?php
	require("../functions.php");

	if($POST_ASSOC === NULL || empty($POST_ASSOC["item"]) || (empty($POST_ASSOC["text"]))){
		exit('{"dbinfo":["Missing vital data", -1, null]}');
	}

	exit(json_encode(editItem($POST_ASSOC["item"], $POST_ASSOC["text"])));
?>
