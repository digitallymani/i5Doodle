function i5Shadow(){

	//PUBLIC PROPERTIES
	this.id="";
	this.name="";
	this.type="";
	this.effect="NONE";//INSET or NONE
	this.horizontalx=0;
	this.verticaly=0;
	this.blurradius=0;
	this.spreadradius=0;
	this.color="#000000";
	
	//PRIVATE PROPERTIES
	this.objectTag="";
	this.supportedShadowTag="";
	
	this.fnInitFromJson=function(paramObject){

		for(key in paramObject){
			if (paramObject[key]!="")
				this[key]=paramObject[key];
		}
		                             	
	}

	this.fnApplyOnObject=function(paramObject){
		
		var supportedShadowTagValue="";
		
		this.supportedShadowTag=window.fnGetSupportedProperty(window.BOXSHADOWPROPERTYARRAY);
		supportedShadowTagValue=  this.horizontalx + "px " + this.verticaly + "px " + this.blurradius + "px " + this.spreadradius + "px " + this.color;
		
		if (this.effect=="INSET"){
			supportedShadowTagValue= supportedShadowTagValue + " inset";
		}
		
		paramObject.divtag.style[this.supportedShadowTag]=supportedShadowTagValue;
		
	}

	this.fnApplyTextShadow=function(paramObject){
		
		var supportedShadowTagValue="";
		supportedShadowTagValue=  this.color + " " + this.horizontalx + "px " + this.verticaly + "px " + this.blurradius + "px";
		paramObject.divtag.style.textShadow=supportedShadowTagValue;
	
	}


	this.fnRemove=function(){
		
		this.objectTag.style[this.supportedShadowTag]="";
	}

}


