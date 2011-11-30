i5TextBox.prototype=i5UIObject;
i5TextBox.prototype.constructor=i5TextBox;

function i5TextBox(){
	
	i5UIObject.call(this);

	//PUBLIC PROPERTIES
	this.style="";//TRADITIONAL, CONTEMPORARY, IMAGE, CUSTOM
	this.cssclassname="";
	this.label="";
	this.checked="";//TRUE, FALSE
	this.value="";
	
	this.defaultimagesrc="";
	this.checkedimagesrc="";
	
	//PRIVATE PROPERTIES
	this.defaultimageobject="";
	this.checkedimageobject="";

	this.inputTag="";
	
	this.loadedImageCount=0;
	this.maxImageCount=2;


	
	this.fnInitFromJson=function(paramObject){

	i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 
		
		for(key in paramObject){
			this[key]=paramObject[key];
		}
		
		this.fnCreateDiv();
		//this.divtag.ondragend=(eval(this.ondragend));
		
		
		if(this.style=="TRADITIONAL"){
			this.fnCreateTraditionalCheckbox();
		}
		if(this.style=="CONTEMPORARY"){
			//this.fnCreateContemporaryCheckbox();
		}
		if(this.style=="IMAGE"){
			//this.fnCreateImageCheckbox();
		}
		if(this.behavior=="CUSTOM"){
			//this.fnCreateCustomCheckbox();
		}
		
		
	}
	

	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
	}
	
	this.fnCreateTraditionalCheckbox=function(){
		
		 var labelTag=document.createElement("label");
		 labelTag.for=this.id;
		 labelTag.appendChild(document.createTextNode(this.label));
		 this.divtag.appendChild(labelTag);
		 
		 //CREATE INPUT & LABEL TAG
		 this.inputTag=document.createElement("input");
		 this.inputTag.type="text";
		 this.inputTag.id="txt" + this.id;
		 this.inputTag.value=this.value;
		 this.inputTag.checked=this.checked;
		 this.inputTag.width=this.width;
		 
		 this.inputTag.onmouseup=methodize(this.fnTouchEnd,this);
		 this.divtag.appendChild(this.inputTag);
		 
	

	}
	

	this.fnRemove=function(){
		
		
	}

	this.fnGetValue=function(){
		
		this.value=this.inputTag.value;
		return(this.value);
		
	}


	
	this.fnTouchEnd=function(){
		
		this.value=this.inputTag.value;
		if (this.touchend!=""){
		var fnCallBack=eval(this.touchend);
		fnCallBack(this.inputTag.value);
		}
	}

}





