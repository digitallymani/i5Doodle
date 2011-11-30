function i5UIObject(){

	//PRIVATE
	this.i5PropsList={
			"type": "type",
			"parent":"parent",
			"persist":"persist",
			"allowresize":"allowresize",
			"category":"category",
	}
	
	//PRIVATE
	this.divtagPropsList={
			"id": "id",
			"draggable":"draggable",
			"cssclassname":"className",
	}
	
	//PRIVATE
	this.divstylePropsList={
			"left": "left",
			"top":"top",
			"width":"width",
			"height":"height",
			"zindex":"zIndex",
			"backgroundcolor":"backgroundColor",
			"position":"position",
			"cssclassname":"className",
	}
	
	//i5 PROPERTIES
	this.type="";
	this.parent="";
	this.persist=false;
	this.allowresize=false;
	this.category="i5UI";
	
	
	//div PROPERTIES
	this.id="";
	this.draggable=false;
	

	//Style Properties
	this.left="";
	this.top="";
	this.width="";
	this.height="";
	this.zindex="";
	this.backgroundcolor="";
	this.cssclassname="";
	
	//event properties

	this.position="absolute";
	
	//PRIVATE PROPERTIES
	this.divtag="";
	
	//EVENTS
	this.touchend="";
	this.ondrag="";
	this.ondragstart="";
	this.ondragend="";

	this.ondrop="";
	this.ondragenter="";
	this.ondragover="";

	this.onresize="";

	//EFFECTS
	this.shadow=new i5Shadow();
	this.border="";
	
	//SCRIPTS
	
	
}

i5UIObject.prototype.fnInitFromJson=function(paramObject){

	for(key in paramObject){
		if (paramObject[key]!="")
			this[key]=paramObject[key];
	}
	
	//this.fnCreateDiv();	
		
	if(this.parent!=""){
		this.parentObject=fnGetObject(this.parent);		
	}

	
}

i5UIObject.prototype.fnInitFromDiv=function(paramObject){

	this.divtag=paramObject;
	
	//set i5Props
	for(key in this.i5PropsList){
		if (this.divtag.getAttribute(key)){
			this[key]=this.divtag.getAttribute(key);
		}	
	}
	
	//set divtag props
	for(key in this.divtagPropsList){
		if (this.divtag[key]){
			this[key]=this.divtag[key];
		}
	}
	
	//set divtag style props
	for(key in this.divstylePropsList){
		if (this.divtag.style[key]){
			this[key]=this.divtag.style[key];
		}
		
	}
	
	if(this.parent!=""){
		this.parentObject=fnGetObject(this.parent);		
	}
	
	if (!document.getElementById(paramObject["id"])){
		this.fnCreateDiv();
	}


}



i5UIObject.prototype.fnCreateDiv=function(){
	
	this.divtag=document.createElement("div");

	
	//set i5Props
	for(key in this.i5PropsList){
		if (this[key]){
			this.divtag.setAttribute(this.i5PropsList[key],this[this.i5PropsList[key]] )
		}	
	}
	
	//set divtag props
	for(key in this.divtagPropsList){
		if (this[key]){

		var divtagPropsListValue=this.divtagPropsList[key];
		this.divtag[divtagPropsListValue]=this[key];
		}
	}
	
	//set divtag style props
	for(key in this.divstylePropsList){
	//	if (this[this.divstylePropsList[key]]){
		if (this[key]){
		var divstylePropsListValue=this.divstylePropsList[key];
		this.divtag.style[divstylePropsListValue]=this[key];
		}
	}
		
	//run rules
	if (this.divtag.getAttribute("allowresize")==true){
		
		this.divtag.style.resize="both";
		this.divtag.style.overflow="auto";
		this.divtag.style.maxWidth=(parseInt(this.parentObject.divtag.style.width)-parseInt(this.divtag.style.left)) + "px";
		this.divtag.style.maxHeight=(parseInt(this.parentObject.divtag.style.height)-parseInt(this.divtag.style.top)) + "px";
			
	}
	
	if (this.parent==""){
		document.body.appendChild(this.divtag);
	}
	else{		
		document.getElementById(this.parent).appendChild(this.divtag);
	}
	
	window.THISi5APPUIOBJECTS.metaobjectreferencearray.push(this);
}

i5UIObject.prototype.fnSetBackgroundColor=function(paramValue){
	this.divtag.style.backgroundColor=paramValue;
}

i5UIObject.prototype.fnSetBorder=function(paramValue){
	borderObject=new i5Border();
	borderObject.fnApplyOnObject(this);
}


i5UIObject.prototype.fnGetHtml5=function(){

	return(this.divtag);
}

i5UIObject.prototype.fnApplyShadowEffect=function(){

}

i5UIObject.prototype.fnApplyBorderEffect=function(){

}


i5UIObject.prototype.fnSelect=function(){
	
	var borderEffect=new i5Border();
	borderEffect.fnApplyOnObject(this);
	window.SELECTEDOBJECT=this;
	
	for(key in this.galleries){
		i5GALLERYMANAGER.fnPushIntoGallery(key, this.galleries[key]);
	}
}


i5UIObject.prototype.fnRemove=function(){

	if (this.parentObject)
	  this.parentObject.divtag.removeChild(this.divtag);
	else
		document.body.removeChild(this.divtag);

	for(key in window.THISi5APPUIOBJECTS.metaobjectreferencearray){
		if (window.THISi5APPUIOBJECTS.metaobjectreferencearray[key].id==this.id){
			window.THISi5APPUIOBJECTS.metaobjectreferencearray.splice(parseInt(key),1);
			break;
		}
	}
	
	//delete window.THISi5APPUIOBJECTS.metaobjectreferencearray[parseInt(this.metaobjectreferencearrayindex)];

	//window.THISi5APPUIOBJECTS.metaobjectreferencearray.splice(parseInt(this.metaobjectreferencearrayindex),1);

}

i5UIObject.prototype.fnOnDragStart=function(paramEvent){
	

		paramEvent.dataTransfer.effectAllowed="move";
		paramEvent.dataTransfer.dropEffect="move";
		paramEvent.dataTransfer.setData("text",this.divtag.id);


		paramEvent.stopPropagation();
		
		this.startX=paramEvent.clientX+window.scrollX;
		this.startY=paramEvent.clientY+window.scrollY;
		
		this.originalX=parseInt(this.divtag.style.left,10);
		this.originalY=parseInt(this.divtag.style.top,10);
		
		this.divtag.style.cursor="move";

	    
	if (this.ondragstart!=""){
		         
		var fnCallBack=eval(this.ondragstart);
		fnCallBack(this);
		
	}
	
}

i5UIObject.prototype.fnOnDragEnd=function(paramEvent){

		//paramEvent.preventDefault();
		//paramEvent.stopPropagation();
	

}

i5UIObject.prototype.fnOnDrag=function(paramEvent){

	if(!paramEvent) paramEvent=window.event;
		
		mouseposX=paramEvent.clientX+window.scrollX;
		mouseposY=paramEvent.clientY+window.scrollY;

		var dragLeft=(this.originalX + mouseposX - this.startX);
		var dragTop=(this.originalY  + mouseposY - this.startY);

		//LEFT TOP
		if ((dragLeft < 0) || (dragTop<0)){
			return (false);
		}
		
		//RIGHT TOP
		if (((dragLeft + parseInt(this.divtag.style.width)) > (parseInt(this.parentObject.divtag.style.width))) || (dragTop<0)){
			return (false);
		}
		
		//LEFT BOTTOM 
		if (((dragTop + parseInt(this.divtag.style.height)) > (parseInt(this.parentObject.divtag.style.height))) || (dragLeft<0)){
			return (false);
		}
		
		
		this.divtag.style.left = (this.originalX + mouseposX - this.startX)  + "px";
		this.divtag.style.top  = (this.originalY  + mouseposY - this.startY) + "px";

		this.divtag.style.cursor="move";

	
}
i5UIObject.prototype.fnOnDragOver=function(paramEvent){
	paramEvent.preventDefault();
	return(false);

}
i5UIObject.prototype.fnOnDragEnter=function(paramEvent){
	paramEvent.dataTransfer.dropEffect="move";

}
i5UIObject.prototype.fnOnDrop=function(paramEvent){
	

}

