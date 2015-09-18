<?php
	try{
		$db = new PDO("sqlite:/home/cbdev/dev/taskboard/taskboard.db3");
	}
	catch(PDOException $e){
		exit("Failed to connect to database: ".$e->getMessage());
	}

	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);

	$db->query("PRAGMA foreign_keys = ON;");
?>
