i5GalleryViewer.prototype=i5UIObject;
i5GalleryViewer.prototype.constructor=i5GalleryViewer;


function i5GalleryViewer(){
	
	
	//PUBLIC PROPERTIES
	this.galleryvieweritems="";
	this.paramobject="";
	this.cssclassname="";
	this.selecteditem="";
	this.fnInitFromJson=function(paramObject){
		
		
		for(key in paramObject){
			if (paramObject[key]!="")
				this[key]=paramObject[key];
		
		}
	
		this.paramobject=paramObject;
		this.fnCreateGalleryViewer();
		
	}

	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
	}
	
	this.fnCreateGalleryViewer=function(){
		
		this.fnCreateDiv();
		this.divtag.className=this.cssclassname;
		
		for (key in this.galleryvieweritems){
			
			var itemdivtag=document.createElement("div");
			itemdivtag.id=key;
			itemdivtag.className="i5galleryvieweritem";
			itemdivtag.onmouseup=methodizeevent(this.fnTouchEnd,this,itemdivtag.id);
			
			var maskdivtag=document.createElement("div");
			maskdivtag.id=key;
			maskdivtag.className="i5galleryvieweritemmask";
			
			var imgTag=document.createElement("img");
			imgTag.src=this.galleryvieweritems[key];

			itemdivtag.appendChild(maskdivtag);
			itemdivtag.appendChild(imgTag);
			
			this.divtag.appendChild(itemdivtag);
			
		}
		
	}
	


	
	this.fnTouchEnd=function(paramEvent,paramSelection){
		
		for (key in this.galleryvieweritems){			
			var itemdivtag=document.getElementById(key);
			if (itemdivtag.id==paramSelection)
				itemdivtag.className="i5galleryvieweritemselected";
			else
				itemdivtag.className="i5galleryvieweritem";
		}

		this.selecteditem=paramSelection;
		if (this.touchend!=""){
		var fnCallBack=eval(this.touchend);
		fnCallBack(paramSelection);
		}
	}

		
}
