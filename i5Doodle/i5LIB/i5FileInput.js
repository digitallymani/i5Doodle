i5FileInput.prototype=i5UIObject;
i5FileInput.prototype.constructor=i5FileInput;

function i5FileInput(){
	
	i5UIObject.call(this);

	//PUBLIC PROPERTIES
	this.label="";
	this.inputTag="";
	this.onchange="";
	this.value="";
	this.filename="";

	
	this.fnInitFromJson=function(paramObject){

	i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 
		
		for(key in paramObject){
			this[key]=paramObject[key];
		}
		
		this.fnCreateDiv();	
		this.fnCreateFileInput();

		
		
	}
	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
	}
	
	this.fnCreateFileInput=function(){
		
		 
		 var labelTag=document.createElement("label");
		 labelTag.for=this.id;
		 labelTag.appendChild(document.createTextNode(this.label));
		 this.divtag.appendChild(labelTag); 
		
		 //CREATE INPUT & LABEL TAG
		 
		 this.inputTag=document.createElement("input");
		 this.inputTag.type="file";
		 this.inputTag.id=this.id + "control";
		 this.inputTag.name=this.id + "control";
		 this.inputTag.onchange=methodize(this.fnOnChange,this);
		 
		 this.divtag.appendChild(this.inputTag);
	
	}
	

	this.fnRemove=function(){
		
		i5UIObject.prototype.fnRemove.call(this); 		

		
	}

	this.fnOnChange=function(){
		this.value=this.inputTag.files[0];
	
		if (this.onchange){
		var fnCallBack=eval(this.onchange);
		fnCallBack(this);
		}
	}


}





