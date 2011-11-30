function i5Script(){

	this.id="";
	this.type="";
	this.filetype="";
	this.location="";
	this.onscriptloadsuccess="";
	this.onscriptloaderror="";
	this.onscriptloadabort="";
	
	this.fnInitFromJson=function(paramObject){
	
		for(key in paramObject){
			if (paramObject[key]!="")
				this[key]=paramObject[key];
		}
	
		
		if (this.filetype=="JAVASCRIPT"){
			this.fnIncludeJavaScript();
		}
		if (this.filetype=="CSSSTYLESHEET"){
			this.fnIncludeStyleSheet();
		}
		
	}
	
	
	this.fnIncludeJavaScript=function(){
		
		if (window.fnGetScript()){
			this.fnIncludeScriptAbort();
		}
		else{
			var jsFileRef="";		
			jsFileRef=document.createElement("script");
			jsFileRef.setAttribute("type","text/javascript");
			jsFileRef.setAttribute("src", this.location);
			document.getElementsByTagName("head")[0].insertBefore(jsFileRef,document.head.lastChild);
			jsFileRef.onload=methodize(this.fnIncludeScriptLoaded,this);
			jsFileRef.onerror=methodize(this.fnIncludeScriptError,this);
			jsFileRef.onabort=methodize(this.fnIncludeScriptAbort,this);
		}
	}
	this.fnIncludeStyleSheet=function(){
		if (window.fnGetScript()){
			this.fnIncludeScriptAbort();
		}
		else{
			var cssRef=document.createElement("link");
			cssRef.setAttribute("rel","stylesheet");
			cssRef.setAttribute("type","text/css");
			cssRef.setAttribute("href", this.location);
			document.getElementsByTagName("head")[0].appendChild(cssRef);
			this.fnIncludeScriptLoaded();
			//cssRef.onload=methodize(this.fnIncludeScriptLoaded,this);
			//cssRef.onerror=methodize(this.fnIncludeScriptError,this);
			//cssRef.onabort=methodize(this.fnIncludeScriptAbort,this);
		}
	}
	
	this.fnIncludeScriptLoaded=function(){

		window.ARRAYOFSCRIPTS.push(this.location);
		if (this.onscriptloadsuccess){
			var fnCallBack=eval(this.onscriptloadsuccess);
			fnCallBack(this);
		}
	}
	
	this.fnIncludeScriptError=function(){
		if (this.onscriptloaderror){
			var fnCallBack=eval(this.onscriptloaderror);
			fnCallBack(this);
		}
	}
	
	this.fnIncludeScriptAbort=function(){
		if (this.onscriptloadabort){

			var fnCallBack=eval(this.onscriptloadabort);
			fnCallBack(this);
		}
	}
	this.fnRemove=function(){
	}
}