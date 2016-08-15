<?php
	require_once("../../db_conn.php");
	require_once("../../postdata.php");
	require_once("../../headers.php");

	//This whole thing is pretty unsafe and could use some error checking

	function fetchItems($filter){
		global $db;
		$rv = array();
		$STMT = $db->query("SELECT * FROM items WHERE " . $filter . ";");
		
		$rv["dbinfo"] = $db->errorInfo();

		if($STMT !== false){
			$rv["data"] = $STMT->fetchAll(PDO::FETCH_ASSOC);
		}

		return $rv;
	}

	function moveItemBin($item, $bin){
		global $db;
		$rv = array();
		$STMT = $db->prepare("UPDATE items SET item_bin = :bin WHERE item_id = :item;");
		$res = $STMT->execute(array(":bin"=>$bin, ":item"=>$item));
		$rv["dbinfo"] = $db->errorInfo();
		return $rv;
	}

	function moveItemSection($item, $section){
		global $db;
		$rv = array();
		$STMT = $db->prepare("UPDATE items SET item_section = :section WHERE item_id = :item;");
		$res = $STMT->execute(array(":section"=>$section, ":item"=>$item));
		$rv["dbinfo"] = $db->errorInfo();
		return $rv;
	}

	function createItem($name, $section, $bin){
		global $db;
		$rv = array();
		$STMT = $db->prepare("INSERT INTO items (item_name, item_section, item_bin) VALUES (:name, :section, :bin);");
		$rv["insert"] = $STMT->execute(array(":name" => $name, ":section" => $section, ":bin" => $bin));
		$rv["dbinfo"] = $db->errorInfo();
		if($rv["insert"] === TRUE){
			$rv["item"] = fetchItems("item_id = " . $db->lastInsertId())["data"][0];
		}
		return $rv;
	}

	function editItem($item, $text){
		global $db;
		$rv = array();
		$STMT = $db->prepare("UPDATE items SET item_name = :name WHERE item_id = :item;");
		$rv["update"] = $STMT->execute(array(":name" => $text, ":item" => $item));
		$rv["dbinfo"] = $db->errorInfo();
		return $rv;
	}
?>
