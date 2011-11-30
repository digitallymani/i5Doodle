i5Button.prototype=i5UIObject;
i5Button.prototype.constructor=i5Button;

function i5Button(){
	
	i5UIObject.call(this);
	
	
	//PRIVATE PROPERTIES
	this.defaultimageobject="";
	this.rolloverimageobject="";
	this.downimageobject="";
	this.upimageobject="";
	this.canvastagname="";	
	this.loadedImageCount=0;
	this.maxImageCount=0;
	
	this.i5ButtonPropList={
			"behavior":"behavior",
			"touchend":"touchend",
			"defaultimagesrc":"defaultimagesrc",
			"defaultimageobject":"defaultimageobject",
			"rolloverimagesrc":"rolloverimagesrc",
			"rolloverimageobject":"rolloverimageobject",
			"downimagesrc":"downimagesrc",
			"downimageobject":"downimageobject",
			"upimagesrc":"upimagesrc",
			"upimageobject":"upimageobject",
			"size":"size",
			"color":"color",
			"label":"label",
			"canvasTag":"canvasTag",
			"canvascontext":"canvascontext",
			"buttonstyle":"buttonstyle",
	}

	this.fnInitFromJson=function(paramObject){
		
	i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 

	this.fnCreateDiv();

	for(key in paramObject){
		this[key]=paramObject[key];
	}

		if(this.buttonstyle=="IMAGE"){
			this.fnCreateImageButton();
		}
		if(this.buttonstyle=="SHAPE"){
			this.fnCreateShapeButton();
		}
	
		this.divtag.onmouseup=methodize(this.fnTouchEnd,this);
	
	
	}	
	
	this.fnInitFromDiv=function(paramObject){

		i5UIObject.prototype.fnInitFromDiv.call(this,paramObject); 

			
			//set i5ButtonPropList
			for(key in this.i5ButtonPropList){
				if (this.divtag.getAttribute(key)){
					this[key]=this.divtag.getAttribute(key);
				}	
			}	
	}

	this.fnGetHTML5=function(){
		return(this.divtag);
	}
	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
		
		for(key in this.i5ButtonPropList){
			if (this[key]){
			this.divtag.setAttribute(this.i5ButtonPropList[key],this[this.i5ButtonPropList[key]] )
			}
		}
	}

	this.fnCreateImageButton=function(){

	if (this.defaultimagesrc){
		this.defaultimageobject=new Image();
		this.defaultimageobject.onload=methodizeevent(this.fnOnLoad,this);
		this.defaultimageobject.onerror=methodizeevent(this.fnOnError,this);
		this.defaultimageobject.onabort=i5Button.prototype.fnOnAbort;		
		this.maxImageCount++;
		this.defaultimageobject.imagepreloader=this;
	 
	 }


	 if (this.rolloverimagesrc){
		 this.maxImageCount++;
		 this.rolloverimageobject=new Image();
		 this.rolloverimageobject.onload=methodizeevent(this.fnOnLoad,this);
		 this.rolloverimageobject.onerror=methodizeevent(this.fnOnError,this);
		 this.rolloverimageobject.onabort=methodizeevent(this.fnOnAbort,this);
		 this.rolloverimageobject.imagepreloader=this;
	 
	 }
	 
	 if (this.downimagesrc){
		 this.maxImageCount++;
		 this.downimageobject=new Image();
		 this.downimageobject.onload=methodizeevent(this.fnOnLoad,this);
		 this.downimageobject.onerror=methodizeevent(this.fnOnError,this);
		 this.downimageobject.onabort=methodizeevent(this.fnOnAbort,this);
	 
		 this.downimageobject.imagepreloader=this;
	 }

	 if (this.upimagesrc){
		 this.maxImageCount++;
		 this.upimageobject=new Image();
		 this.upimageobject.onload=methodizeevent(this.fnOnLoad,this);
		 this.upimageobject.onerror=methodizeevent(this.fnOnError,this);
		 this.upimageobject.onabort=methodizeevent(this.fnOnAbort,this);
		 this.upimageobject.imagepreloader=this;
	 
	 }	 
	 
	 //CREATE CANVAS
	 this.canvas = document.createElement("canvas");
	 this.canvastagname="canvas" +  this.id;
	 this.canvas.id=this.canvastagname;
	 this.canvas.width=this.defaultimageobject.width;
	 this.canvas.height=this.defaultimageobject.height;
	 this.canvas.style.left=this.left;
	 this.canvas.style.top=this.top;
	 
	 this.divtag.appendChild(this.canvas);

	 
	 //SETUP IMAGE PRELOADER
	 
	 this.defaultimageobject.src=this.defaultimagesrc;
	 this.rolloverimageobject.src=this.rolloverimagesrc;
	 this.downimageobject.src=this.downimagesrc;
	 this.upimageobject.src=this.upimagesrc;
	 
}


this.fnCreateShapeButton=function(){
	
//	this.divtag.zIndex="200";
	//this.divtag.className=this.cssclassname;
	this.divtag.className=this.size + " i5button " + this.color;
	this.divtag.appendChild(document.createTextNode(this.label));
	
	this.divtag.onmouseup=methodize(this.fnTouchEnd,this);

}


this.fnOnLoad=function(){

	this.fnOnComplete("LOADED");
	
}
this.fnOnError=function(){

	this.fnOnComplete("ERROR");

	
}
this.fnOnAbort=function(){

	this.fnOnComplete("ABORT");

	
}
this.fnOnComplete=function(paramStatus){
	
	this.loadedImageCount++;

	//if (paramStatus=="LOADED"){
	if(this.loadedImageCount==this.maxImageCount){
	this.fnCreateCanvas();
	}
	//}
}



this.fnCreateCanvas=function(paramState){
	
	this.divtag.className=this.cssclassname
	//DRAW IMAGE
	if (paramState==undefined)
		paramState="DEFAULT";
	
	if (paramState=="DEFAULT"){
	this.canvas=document.getElementById(this.canvastagname);
	this.canvas.width=this.defaultimageobject.width;
	this.canvas.height=this.defaultimageobject.height;
	if (this.canvas.getContext) {
        this.canvascontext = this.canvas.getContext("2d");
		this.canvascontext.drawImage(this.defaultimageobject,0,0);
	}
	}
	if (paramState=="ROLLOVER"){
		this.canvas=document.getElementById(this.canvastagname);
		this.canvas.width=this.rolloverimageobject.width;
		this.canvas.height=this.rolloverimageobject.height;
		if (this.canvas.getContext) {
			this.canvascontext = this.canvas.getContext("2d");
			this.canvascontext.drawImage(this.rolloverimageobject,0,0);
		}
	}
	
}

this.fnRemove=function(){
	i5UIObject.prototype.fnRemove.call(this); 		

	
}

this.fnTouchEnd=function(){
	
	if (this.touchend){
	var fnCallBack=eval(this.touchend);
	fnCallBack(this);
	}
}


}