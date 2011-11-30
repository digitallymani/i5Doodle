var fileReaderObject, fileObject, openWindow,frameObject;
function fnOpenSelectedFile(paramObject){

	
	fileObject=paramObject.value;
	var selectedfilename=(paramObject.value).name;
	
	if (selectedfilename==window.THISi5APP.filename){
		alert("The selected file is already open. ");
		return;
	}
	
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		  // Great success! All the File APIs are supported.	
		fnOpenLocally(paramObject);

		} else {
			alert("Your browser doesn't support reading file from your desktop. Opening the file is going to take a while. Please be patient...");
			fnOpenRemotely(paramObject);

		}


}
function fnOpenLocally(paramObject){
	
	fileReaderObject= new FileReader();	
	fileReaderObject.readAsText(paramObject.value);
	fileReaderObject.onloadstart = fnOpenFileLoadingStarted;
	fileReaderObject.onload = fnOpenFileLoaded;
	fileReaderObject.onprogress = fnOpenFileLoadingInProgress;
	fileReaderObject.onerror = fnOpenFileLoadingError;
	fileReaderObject.onabort = fnOpenFileLoadingAbort;
}
function fnOpenRemotely(paramObject){

	var fileName="./i5DFILES/" + paramObject.value.fileName;
	var method="GET";	
	
	if (!document.getElementById("i5DOPENFILE")){
	frameObject=document.createElement("iframe");
	document.body.appendChild(frameObject);
	frameObject.setAttribute("id","i5DOPENFILE");
	frameObject.setAttribute("onload","fnOpenFileLoaded()");
	frameObject.setAttribute("width","0");
	frameObject.setAttribute("height","0");
	}
	frameObject.setAttribute("src",fileName);

}


function fnOpenFileLoaded(paramEvent){
	
	if (fileReaderObject){
		var tempi5DContent=fileReaderObject.result;
	}
	else{
		var tempi5DContent=window.frames[0].document.body.innerText;
	}
	window.THISi5APP.filename=fileObject.name;
	fnClose();
	
	if (window.DOMParser)
	  {
	  parser=new DOMParser();
	  xmlDoc=parser.parseFromString(tempi5DContent,"text/xml");
	  }
	else // Internet Explorer
	  {
	  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	  xmlDoc.async="false";
	  xmlDoc.load(tempi5DContent); 
	  }
	
	var contentTagsArray=xmlDoc.getElementsByTagName("div");
	var tempDivTag=document.createElement("div");
	for (ctr=0;ctr<=contentTagsArray.length-1;ctr++){
		var tagType=eval(contentTagsArray[ctr].getAttribute("type"));
		var tagCategory=contentTagsArray[ctr].getAttribute("category");
		if (tagCategory=="i5CONTENT"){

		for (ctr1=0;ctr1<=contentTagsArray[ctr].attributes.length-1; ctr1++){
			
			tempDivTag.setAttribute(contentTagsArray[ctr].attributes[ctr1].name,contentTagsArray[ctr].attributes[ctr1].value);
		
		}		
		
		//alert(tempDivTag.outerHTML);
			var ai5Object=new tagType();
			ai5Object.fnInitFromDiv(tempDivTag);
			
		}
	}
	//window.openWindow.close();
}


function fnOpenFileLoadingStarted(paramEvent){
	var statusbartext=window.fnGetObject("openfilestatusbartext");
	statusbartext.texttag.nodeValue="Loading...";
}

function fnOpenFileLoadingInProgress(paramEvent){
	var statusbartext=window.fnGetObject("openfilestatusbartext");
	statusbartext.texttag.nodeValue="Loading...";	
}
function fnOpenFileLoadingError(paramEvent){
	var statusbartext=window.fnGetObject("openfilestatusbartext");
	statusbartext.texttag.nodeValue="Error. Try again!";	

}
function fnOpenFileLoadingAbort(paramEvent){
	var statusbartext=window.fnGetObject("openfilestatusbartext");
	statusbartext.texttag.nodeValue="Loading aborted...";	
}
function fnCloseOpenPopup(paramObject){
	openpopup=null;
}

