<?php
	require("../functions.php");

	if($POST_ASSOC === NULL || empty($POST_ASSOC["item"]) || (empty($POST_ASSOC["bin"]) && empty($POST_ASSOC["section"]))){
		exit('{"dbinfo":["Missing vital data", -1, null]}');
	}

	if(!empty($POST_ASSOC["bin"])){
		exit(json_encode(moveItemBin($POST_ASSOC["item"], $POST_ASSOC["bin"])));
	}
	else{
		exit(json_encode(moveItemSection($POST_ASSOC["item"], $POST_ASSOC["section"])));
	}
?>
