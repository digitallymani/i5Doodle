<?php
$i5dFolderPath="i5DFILES";
//if (isset($_POST["filename"])){
if (isset($GLOBALS["HTTP_RAW_POST_DATA"])){
	// Get the data
	$fileData=$GLOBALS["HTTP_RAW_POST_DATA"];
//	$fileData=$_POST["persist"];
	//$myFile= $i5dFolderPath. '/' . $_POST["filename"];


	//$myFile = "testFile.i5d";
	$myFile='i5DFILES/' . guid() . '.i5d';
	$fh = fopen($myFile, 'w') or die("can't open file");
	//$stringData = "Bobby Bopper\n";
	fwrite($fh, $fileData);
	//$stringData = "Tracy Tanner\n";
	//fwrite($fh, $stringData);
	fclose($fh);
	
	
	
	echo $myFile;
	//echo $_POST["filename"];
}

function guid(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    }else{
        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = chr(123)// "{"
                .substr($charid, 0, 8).$hyphen
                .substr($charid, 8, 4).$hyphen
                .substr($charid,12, 4).$hyphen
                .substr($charid,16, 4).$hyphen
                .substr($charid,20,12)
                .chr(125);// "}"
        return $uuid;
    }
}

?>