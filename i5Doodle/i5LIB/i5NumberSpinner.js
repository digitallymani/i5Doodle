i5NumberSpinner.prototype=i5UIObject;
i5NumberSpinner.prototype.constructor=i5NumberSpinner;

function i5NumberSpinner(){
	
	i5UIObject.call(this);

	
	this.i5NumberSpinnerPropsList={
			"numberspinnerstyle":"numberspinnerstyle",
			"min":"min",
			"max":"max",
			"step":"step",
			"label":"label",
			"showlabel":"showlabel",
			"value":"value",
	}

	this.showlabel=true;

	//PRIVATE PROPERTIES
	this.inputTag="";
	
	this.fnInitFromJson=function(paramObject){

		i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 


		for(key in paramObject){
			this[key]=paramObject[key];
		}
		this.fnCreateDiv();

		if(this.numberspinnerstyle=="TRADITIONAL"){
			this.fnCreateTraditionalCheckbox();
		}
		
	}
	
	this.fnInitFromDiv=function(paramObject){

		i5UIObject.prototype.fnInitFromDiv.call(this,paramObject); 

			//set proplist
			for(key in this.i5NumberSpinnerPropsList){
				if (this.divtag.getAttribute(key)){
					this[key]=this.divtag.getAttribute(key);
				}	
			}	
	}

	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
	}
	
	this.fnGetHTML5=function(){
		return(this.divtag);
	}
	
	this.fnCreateTraditionalCheckbox=function(){
		
		if (this.showlabel==true){
		 //CREATE LABEL TAG
		 var labelTag=document.createElement("label");
		 labelTag.for=this.id;
		 labelTag.id="label" + this.id;
		 labelTag.appendChild(document.createTextNode(this.label));
		 this.divtag.appendChild(labelTag);
		}
		 //CREATE INPUT TAG
		 this.inputTag=document.createElement("input");
		 this.inputTag.type="number";
		 this.inputTag.id="input" + this.id;
		 this.inputTag.min=this.min;
		 this.inputTag.max=this.max;
		 this.inputTag.style.width=this.width;
		 this.inputTag.style.height=this.height;
		 this.inputTag.step=this.step;
		 this.inputTag.onmouseup=methodize(this.fnTouchEnd,this);
		 this.divtag.appendChild(this.inputTag);
		 
	}
	
	this.fnSetValue=function(paramValue){
		
		if (!this.inputTag)
				this.inputTag=document.getElementById("input" + this.id);
		
		this.inputTag.value=paramValue;
		this.value=paramValue
	}

	this.fnRemove=function(){
		i5UIObject.prototype.fnRemove.call(this); 		

	}

	this.fnTouchEnd=function(){

		var fnCallBack=eval(this.touchend);
		fnCallBack(this);

	}


}
