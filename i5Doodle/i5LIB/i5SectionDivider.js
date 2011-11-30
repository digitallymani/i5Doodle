i5SectionDivider.prototype=i5UIObject;
i5SectionDivider.prototype.constructor=i5SectionDivider;

function i5SectionDivider(){
	
	i5UIObject.call(this);

	//PUBLIC PROPERTIES
	this.style="";//TRADITIONAL, CONTEMPORARY, IMAGE, CUSTOM
	this.label="";
	this.cssclassname="";
	
	//PRIVATE PROPERTIES
	this.inputTag="";

	this.fnInitFromJson=function(paramObject){

		i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 

		this.fnCreateDiv();

		
		for(key in paramObject){
			this[key]=paramObject[key];
		}
		this.fnCreateSectionDivider();

	}
	this.fnGetHTML5=function(){
		return(this.divtag);
	}
	


	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
	}

	this.fnCreateSectionDivider=function(){
		 
		this.divtag.className=this.cssclassname;
		this.divtag.appendChild(document.createTextNode(this.label));	 
		 
	}
}










