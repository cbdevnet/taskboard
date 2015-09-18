<?php
	//read postdata
	$POST_RAW = file_get_contents("php://input");
	if(!empty($POST_RAW)){
		$POST_ASSOC = json_decode($POST_RAW, true);
		if($POST_ASSOC === NULL){
			exit('{"status":500, "message":"Failed to parse posted data"}');
		}
	}
	else{
		$POST_ASSOC = NULL;
	}
?>
