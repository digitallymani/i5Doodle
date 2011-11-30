i5Toolbar.prototype=i5UIObject;
i5Toolbar.prototype.constructor=i5Toolbar;

function i5Toolbar(){
	
	i5UIObject.call(this);

	
	//PUBLIC PROPERTIES
	this.toolbaritems="";
	
	this.toolbarclassname="";
	this.toolbaritemclassname="";
	
	this.touchend="";
	

	//PRIVATE PROPERTIES

	this.ulTag="";


this.fnInitFromJson=function(paramObject){

	i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 


	for(key in paramObject){
		this[key]=paramObject[key];
	}

	this.fnCreateDiv();
	this.divtag.onmouseup=methodize(this.fnTouchEnd,this);


	this.fnCreateToolbarItems();
	
}



this.fnCreateToolbarItems=function(){
	
	//CREATE toolbar [UL TAG]
	this.ulTag= document.createElement("ul");
	this.ulTag.id="ul" + this.id;
	
	if (this.toolbarclassname!="")
		this.ulTag.className=this.toolbarclassname;
	
	this.divtag.appendChild(this.ulTag);
	
	//CREATE toolbar ITEMS [LI TAG]
	for(key in this.toolbaritems){

		var liTag= document.createElement("li");
		liTag.id="li" + this.id;
		
		if (this.toolbaritemclassname!="")
			liTag.className=this.toolbaritemclassname;
		
		this.ulTag.appendChild(liTag);
		
		//CREATE A TAG
		var imgTag=document.createElement("img");
		imgTag.src="";
		liTag.appendChild(imgTag);
				
	}

}
	this.fnGetHTML5=function(){
		return(this.divtag);
	}
	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
	}

	this.fnRemove=function(){
	}

	this.fnTouchEnd=function(){
		
		var fnCallBack=eval(this.touchend);
		fnCallBack();
	}
}
