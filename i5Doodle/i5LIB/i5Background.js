i5Background.prototype=i5UIObject;
i5Background.prototype.constructor=i5Background;

function i5Background(){

	i5UIObject.call(this);

	
	//PUBLIC PROPERTIES
	
	/*this.behavior="";
	this.touchend="";
	this.defaultimagesrc="";
		
	//PRIVATE PROPERTIES
	this.defaultimageobject="";
	this.canvasTag="";
	this.canvascontext="";*/
	
	this.i5BackgroundPropList={
			"behavior":"behavior",
			"touchend":"touchend",
			"defaultimagesrc":"defaultimagesrc",
			"defaultimageobject":"defaultimageobject",
			"canvasTag":"canvasTag",
			"canvascontext":"canvascontext",
	}
	
this.fnInitFromJson=function(paramObject){
	
	i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 

	for(key in paramObject){
		this[key]=paramObject[key];
	}
	this.fnCreateDiv();
	                                 
	if(this.behavior=="IMAGE"){
		this.fnCreateImageBackground();
	}
	
	if(this.behavior=="SHAPE"){
		this.fnCreateShapeBackground();
	}
	
}
	
this.fnInitFromDiv=function(paramObject){

	i5UIObject.prototype.fnInitFromDiv.call(this,paramObject); 

		
		//set i5BackgroundPropList
		for(key in this.i5BackgroundPropList){
			if (this.divtag.getAttribute(key)){
				this[key]=this.divtag.getAttribute(key);
			}	
		}	
}

this.fnCreateShapeBackground=function(){
	
}
this.fnSetBackgroundColor=function(paramValue){
	i5UIObject.prototype.fnSetBackgroundColor.call(this,paramValue); 
}
this.fnSetBorder=function(paramValue){
	i5UIObject.prototype.fnSetBorder.call(this,paramValue); 
}

this.fnCreateImageBackground=function(){
	 	 
	 
	 //CREATE CANVAS
	 this.canvas = document.createElement("canvas");
	 //this.canvasTagName="canvas" + this.id;
	 this.canvas.id="canvas" + this.id;
	 this.canvas.width=this.defaultimageobject.width;
	 this.canvas.height=this.defaultimageobject.height;
	 
	 
	 this.divtag.appendChild(this.canvas);
	 
	 
	 
	 //SETUP IMAGE PRELOADER
	 this.defaultimageobject=new Image();
	 
	 this.defaultimageobject.onload=i5Background.prototype.fnOnLoad;
	 this.defaultimageobject.onerror=i5Background.prototype.fnOnError;
	 this.defaultimageobject.onabort=i5Background.prototype.fnOnAbort;
	 this.defaultimageobject.imagepreloader=this;
	 
	 this.defaultimageobject.src=this.defaultimagesrc;

}
this.fnOnLoad=function(){
	
	this.imagepreloader.fnOnComplete("LOADED");
	
}
this.fnOnError=function(){

	this.imagepreloader.fnOnComplete("ERROR");

	
}
this.fnOnAbort=function(){

	this.imagepreloader.fnOnComplete("ABORT");

	
}
this.fnOnComplete=function(paramStatus){
	
	if (paramStatus=="LOADED"){
		this.fnCreateCanvas();
	}
}



this.fnCreateCanvas=function(){

	//DRAW IMAGE
	this.canvas=document.getElementById(this.canvas.id);
	this.canvas.width=this.defaultimageobject.width;
	this.canvas.height=this.defaultimageobject.height;
	if (this.canvas.getContext) {
        this.canvascontext = this.canvas.getContext("2d");
		this.canvascontext.drawImage(this.defaultimageobject,0,0);
	}

}

this.fnCreateDiv=function(){
	i5UIObject.prototype.fnCreateDiv.call(this); 
	
	for(key in this.i5BackgroundPropList){
		if (this[key]){
		this.divtag.setAttribute(this.i5BackgroundPropList[key],this[this.i5BackgroundPropList[key]] )
		}
	}
}


this.fnRemove=function(){
	
	i5UIObject.prototype.fnRemove.call(this); 

}
}