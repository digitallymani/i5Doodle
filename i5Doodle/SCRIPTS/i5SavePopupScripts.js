var fileReaderObject, fileObject;
function fnOpenSelectedFile(paramObject){

	
	fileObject=paramObject.value;
	var selectedfilename=(paramObject.value).name;
	
	if (selectedfilename==window.THISi5APP.filename){
		alert("The selected file is already open. ");
	}
	else{
		
		fileReaderObject= new FileReader();	
		fileReaderObject.readAsText(paramObject.value);
		fileReaderObject.onload = fnFileLoaded;
	}
	
	
}

function fnFileLoaded(paramEvent){
	
	window.THISi5APP.fnClose();
	
	var tempi5DContent=unescape(fileReaderObject.result);
	window.THISi5APPUIOBJECTS.fnInit(eval(tempi5DContent)["meta"]);
	window.THISi5APP.filename=fileObject.name;
}


function fnProgressUpload(paramEvent){
	
	//alert(fileReaderObject.result);
}
function fnCompleteUpload(paramEvent){
	
	//alert(fileReaderObject.result);
}
function fnFailedUpload(){
	alert("error");
}
function fnCanceledUpload(){
	alert("error");
}
function fnCloseOpenPopup(paramObject){

	openpopup=null;
	
}