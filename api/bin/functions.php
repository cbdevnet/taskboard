<?php
	require_once("../../db_conn.php");
	require_once("../../postdata.php");
	require_once("../../headers.php");

	function fetchBins(){
		global $db;
		$rv = array();
		$STMT = $db->query("SELECT * FROM bins WHERE 1;");
		
		$rv["dbinfo"] = $db->errorInfo();

		if($STMT !== false){
			$rv["data"] = $STMT->fetchAll(PDO::FETCH_ASSOC);
		}

		return $rv;
	}
?>
