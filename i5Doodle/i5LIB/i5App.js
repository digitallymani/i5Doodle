function i5App(){

	this.jsfilesarray=new Array();
	this.cssfilesarray=new Array();

	this.themename="";
	this.filename="";
	this.appname="";
	this.mode="";

this.fnInit=function(paramAppName,paramThemeName,paramMode,paramFileName){

	this.appname=paramAppName;
	this.themename=paramThemeName;
	this.filename=paramFileName;
	this.mode=paramMode;
	
	this.fnInitLib();
	
	if ((this.paramMode) & (this.paramFileName))
		this.fnOpen(paramFileName);
}

this.fnInitLib=function(paramKey){

	if (!paramKey)
		paramKey=0;

	var i5LibScript=new i5Script();	
	var i5LibJson={
			"id":paramKey.toString(),
			"type":"i5Script",
			"location":window.i5LIBMANIFEST[paramKey],
			"filetype":"JAVASCRIPT",
			"onscriptloadsuccess": methodize(this.fnOni5LibJSFileLoaded,this,i5LibScript),
	}
	
	i5LibScript.fnInitFromJson(i5LibJson);

}

this.fnOni5LibJSFileLoaded=function(paramObject){

	var paramKey=parseInt(paramObject.id);
	this.jsfilesarray.push(window.i5LIBMANIFEST[paramKey]);
	if (paramKey==window.i5LIBMANIFEST.length-1)
	{		
		this.fnLoadThemeManifest();
	}	
	else{
		this.fnInitLib(paramKey+1);
	}
		
}

this.fnLoadThemeManifest=function(){
	

	var i5ThemeScript=new i5Script();	
	
	var i5ThemeScriptJson={
			"id":this.themename,
			"type":"i5Script",
			"location": window.THEMESFOLDERNAME  +  "/" + this.themename + "/" + window.THEMESFILENAME,
			"filetype":"JAVASCRIPT",
			"onscriptloadsuccess": methodize(this.fnOni5ThemeManifestFileLoaded,this,i5ThemeScript),
	}
	i5ThemeScript.fnInitFromJson(i5ThemeScriptJson);
}

this.fnOni5ThemeManifestFileLoaded=function(paramObject){
	this.fnLoadThemeCss();
}

this.fnLoadThemeCss=function(paramKey){
	
	if (!paramKey)
		paramKey=0;

	var i5ThemeCss=new i5Script();	
	var i5ThemeCssJson={
			"id":paramKey.toString(),
			"type":"i5Script",
			"location": window.THEMESFOLDERNAME  +  "/" + this.themename + "/" + i5THEMEMANIFEST[paramKey],
			"filetype":"CSSSTYLESHEET",
			"onscriptloadsuccess": methodize(this.fnOni5ThemeCssFileLoaded,this,i5ThemeCss),
	}
	i5ThemeCss.fnInitFromJson(i5ThemeCssJson);
	
	//this.fnLoadi5UIObjectsMetaJs();
}

this.fnOni5ThemeCssFileLoaded=function(paramObject){
	
	var paramKey=parseInt(paramObject.id);
	this.cssfilesarray.push(window.i5THEMEMANIFEST[paramKey]);
	if (paramKey==window.i5THEMEMANIFEST.length-1)
	{		
		this.fnInitUiObjects(window.i5UIOBJECTSMETAFILENAME);
		
		if (this.filename)
			this.fnOpen(this.filename);
	}	
	else{
		this.fnInitLib(paramKey+1);
	}

}


this.fnInitUiObjects=function(paramFileName){
	
	var jsi5UIObjectsMetaFileRef=new i5Script();	
	
	var jsi5UIObjectsMetaFileJson={
			"id":this.appname,
			"type":"i5Script",
			"location": window.i5UIOBJECTSMETAFILENAME,
			"filetype":"JAVASCRIPT",
			"onscriptloadsuccess": methodize(this.fnLoadi5UIObjectsMetaFileLoaded,this,jsi5UIObjectsMetaFileRef),
	}
	jsi5UIObjectsMetaFileRef.fnInitFromJson(jsi5UIObjectsMetaFileJson);

}

this.fnLoadi5UIObjectsMetaFileLoaded=function(){
	
	window.THISi5APPUIOBJECTS=new i5UIObjects();
	window.THISi5APPUIOBJECTS.fnInit(i5UIOBJECTSMETA["meta"]);

}

//OPEN CONTENT OBJECTS
this.fnOpen=function(paramFileName){

	var jsi5ContentObjectsMetaFileRef=new i5Script();	
	
	var jsi5ContentObjectsMetaFileJson={
			"id":this.appname,
			"type":"i5Script",
			"location": paramFileName,
			"filetype":"JAVASCRIPT",
			"onscriptloadsuccess": methodize(this.fni5ContentObjectsMetaFileLoaded,this,jsi5ContentObjectsMetaFileJson),
	}
	jsi5ContentObjectsMetaFileRef.fnInitFromJson(jsi5ContentObjectsMetaFileJson);

}



this.fni5ContentObjectsMetaFileLoaded=function(){	
	window.THISi5APPUIOBJECTS.fnInit(i5DCONTENT["meta"]);
}

}

var THISi5APP=new i5App();