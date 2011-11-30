<?php
$fileData="asdf";
if (is_uploaded_file($_FILES['i5openfileinputcontrol']['tmp_name']))
  $fileData = file_get_contents($_FILES['i5openfileinputcontrol']['tmp_name']);

echo($fileData);


/*$SafeFile = $_FILES['i5openfileinputcontrol']['name']; 
//$uploaddir = "i5DOPENEDFILES/"; 
//$path = $uploaddir.$SafeFile; 

/*if($i5openfileinputcontrol != none){ //AS LONG AS A FILE WAS SELECTED... 

    if(copy($HTTP_POST_FILES['i5openfileinputcontrol']['tmp_name'], $path)){ //IF IT HAS BEEN COPIED... 

        //GET FILE NAME 
        $theFileName = $HTTP_POST_FILES['i5openfileinputcontrol']['name']; 

        //GET FILE SIZE 
        $theFileSize = $HTTP_POST_FILES['i5openfileinputcontrol']['size']; 

        if ($theFileSize>999999){ //IF GREATER THAN 999KB, DISPLAY AS MB 
            $theDiv = $theFileSize / 1000000; 
            $theFileSize = round($theDiv, 1)." MB"; //round($WhatToRound, $DecimalPlaces) 
        } else { //OTHERWISE DISPLAY AS KB 
            $theDiv = $theFileSize / 1000; 
            $theFileSize = round($theDiv, 1)." KB"; //round($WhatToRound, $DecimalPlaces) 
        } 
        
        //echo($theFileName);
}

}*/

?>