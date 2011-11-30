function i5Border(){

	//PUBLIC PROPERTIES
	this.effect="NONE";//INSET or NONE
	this.borderWidth=1;
	this.borderColor="#000000";
	this.borderStyle="solid";
	this.borderRadius=1;
	
	//PRIVATE PROPERTIES
	this.borderobject="";
	this.supportedbordertag="";

	this.fnInitFromJson=function(paramObject){
		
		for(key in paramObject){
			if (paramObject[key]!="")
				this[key]=paramObject[key];
		}
	}
	
	this.fnApplyOnObject=function(paramObject){
		
		this.borderobject=paramObject.divtag
		this.supportedbordertag=window.fnGetSupportedProperty(window.BORDERRADIUSPROPERTYARRAY);
		this.borderobject.style[this.supportedbordertag]=this.borderRadius + "px";
		this.borderobject.style["border"]=this.borderWidth +"px " + this.borderStyle + this.borderColor;

		
		/*this.objectTag=document.getElementById(paramObjectTagName);
		this.supportedShadowTag=window.fnGetSupportedProperty(window.BOXSHADOWPROPERTYARRAY);
		
		var supportedShadowTagValue=  this.horizontalx + "px " + this.verticaly + "px " + this.blurradius + "px " + this.spreadradius + "px " + this.color;
		
		if (this.effect=="INSET"){
			supportedShadowTagValue= supportedShadowTagValue + " inset";
		}
		
		this.objectTag.style[this.supportedShadowTag]=supportedShadowTagValue;*/
		
	}


	this.fnRemove=function(){
		
		this.objectTag.style[this.supportedShadowTag]="";
	}
	
}


