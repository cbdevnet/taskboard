<?php
	require("../functions.php");

	if($POST_ASSOC === NULL || empty($POST_ASSOC["section"]) || empty($POST_ASSOC["bin"] || empty($POST_ASSOC["name"]))){
		exit('{"dbinfo":["Missing vital data", -1, null]}');
	}

	exit(json_encode(createItem($POST_ASSOC["name"], $POST_ASSOC["section"], $POST_ASSOC["bin"])));

?>
