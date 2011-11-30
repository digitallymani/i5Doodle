function i5GalleryManager(){
	
	this.galleryitemstitle="";
	this.galleryitemsreference="";
	this.arrayofgallerytitles=new Array();
	this.arrayofgalleryreferences=new Array();
	this.gallerymenudivtag="";
	this.gallerycontentdivtag="";
	this.ulTag="";
	this.liTag="";
	this.aTag="";
	this.paramobject="";
	this.window="";
	this.activegallery="";
	this.scrollnext="";
	this.scrollnextimageobject="";
	this.scrollprevious="";
	this.scrollpreviousimageobject="";

	this.closebutton="";
	this.activegalleryreference="";
	
	this.fnInitFromJson=function(paramObject){
		
		
		for(key in paramObject){
			if (paramObject[key]!="")
				this[key]=paramObject[key];
		
		}
		
		this.window=new i5Window();
		this.window.fnInitFromJson(paramObject);
		this.arrayofgallerytitles=this.galleryitemstitle.split(",");
		this.arrayofgalleryreferences=this.galleryitemsreference.split(",");
		this.paramobject=paramObject;
		this.fnCreateGalleryMenu();
	}

	
	this.fnCreateGalleryMenu=function(){
		
		this.fnAddButtons();

		
		this.gallerymenudivtag=document.createElement("div");
		this.gallerymenudivtag.id="i5gallerymenu";
		this.gallerymenudivtag.className="i5gallerymenu";
		this.window.divtag.appendChild(this.gallerymenudivtag);


		
		this.ulTag=document.createElement("ul");
		this.ulTag.id="i5gallerymenuitemscontainer";
		this.ulTag.className="i5gallerymenuitemscontainer";
		this.gallerymenudivtag.appendChild(this.ulTag);


		//GALLERY CONTENT AREA
		this.gallerycontentdivtag=document.createElement("div");
		this.gallerycontentdivtag.id="i5gallerycontent";
		this.gallerycontentdivtag.className="i5gallerycontent";
		this.gallerycontentdivtag.style.width=this.window.divtag.style.width;
		this.window.divtag.appendChild(this.gallerycontentdivtag);
		
		for(key in this.arrayofgallerytitles){
			
			this.fnCreateGalleryMenuItem(this.arrayofgallerytitles[key],this.arrayofgalleryreferences[key]);
			this.fnDisplayGallery(this.arrayofgalleryreferences[key]);
			
		}
		this.fnDeSelectAllGalleries();
		
		

	}
	
	this.fnShowSelectedGallery=function(paramArray){
		this.fnDeSelectAllGalleries();
		this.fnDisplayGallery(paramArray);
		this.fnSelectActiveGallery(paramArray);
	}
	
	this.fnDeSelectAllGalleries=function(){
		for(key in this.arrayofgalleryreferences){
			var aTag=document.getElementById("ANCHOR" + this.arrayofgalleryreferences[key]);
			var actualgallerycontainerdivtag=document.getElementById(this.arrayofgalleryreferences[key]  + "CONTENT");

			aTag.className="tabactive";
			if(actualgallerycontainerdivtag){
				actualgallerycontainerdivtag.style.display="none";
			}
		//	aTag.style.display="none";
		}
		this.fnHideClose();
	}
	
	this.fnSelectActiveGallery=function(paramGalleryReference){
		var aTag=document.getElementById("ANCHOR" + paramGalleryReference);
		if (aTag){
			aTag.className="";
		}
	}
	
	this.fnDisplayGallery=function(paramGalleryReference){

		
		var actualgallerycontainerdivtag=document.getElementById(paramGalleryReference + "CONTENT");
		if(!actualgallerycontainerdivtag){
			actualgallerycontainerdivtag=document.createElement("div");
			actualgallerycontainerdivtag.id=paramGalleryReference + "CONTENT";
			actualgallerycontainerdivtag.className=paramGalleryReference + "CONTENT";
			this.gallerycontentdivtag.appendChild(actualgallerycontainerdivtag);
			this.activegallery=new i5Gallery(paramGalleryReference);
			this.activegalleryreference=paramGalleryReference;
		}
		else
		{
		
			actualgallerycontainerdivtag.style.display="inline";
		}
	
		this.fnShowClose();
	}
	
	this.fnPushIntoGallery=function(paramGalleryTitle,paramGalleryReference){
		this.fnCreateGalleryMenuItem(paramGalleryTitle,paramGalleryReference);
		this.fnShowSelectedGallery(paramGalleryReference);
		return(this.fnGetGalleryReference(paramGalleryReference));
	}
	
	this.fnGetGalleryReference=function(paramGalleryReference){
		for(key in this.arrayofgalleryreferences){
			if (this.arrayofgalleryreferences[key]==paramGalleryReference){
				return(this.arrayofgalleryreferences[key]);
		}
		}
	}
	
	this.fnCreateGalleryMenuItem=function(paramGalleryTitle,paramGalleryReference){
	
		var liTag=document.getElementById("LI" + paramGalleryReference);
		if(!liTag){
		liTag=document.createElement("li");
		liTag.id="LI" + paramGalleryReference;
		var aTag=document.createElement("a");
		aTag.href="#";
		aTag.id="ANCHOR" + paramGalleryReference;
		aTag.className="tabactive";
		aTag.onmouseup=window.methodize(this.fnShowSelectedGallery,this,paramGalleryReference);
	
		aTag.appendChild(document.createTextNode(paramGalleryTitle));
		
		var closeGalleryImageTag=document.createElement("img");
		closeGalleryImageTag.src=this.closebutton;
		closeGalleryImageTag.id="CLOSE" + paramGalleryReference;
		closeGalleryImageTag.style.display="none";
		
		liTag.appendChild(closeGalleryImageTag);
		liTag.appendChild(aTag);
		this.ulTag.appendChild(liTag);
		
		var blnarrayupdated=false;
		for(key in this.arrayofgalleryreferences){
			if (this.arrayofgalleryreferences[key]==paramGalleryReference){
				blnarrayupdated=true;
				break;
			}
			else{
				blnarrayupdated=false;
			}
				
		}
		if (blnarrayupdated==false){
			this.arrayofgallerytitles.push(paramGalleryTitle);
			this.arrayofgalleryreferences.push(paramGalleryReference);
			
		}
		
		}


	}
	
	
	this.fnShowClose=function(){
//		closebuttonimage.id="i5galleryitemclose";

		var closeButtondivtag=document.getElementById("i5galleryitemclose");
		closeButtondivtag.style.display="inline";
		
	}
	this.fnHideClose=function(){
		
		var closeButtondivtag=document.getElementById("i5galleryitemclose");
		closeButtondivtag.style.display="none";
	
	}
	this.fnScrollNext=function(){
		this.gallerymenudivtag.scrollLeft=	this.gallerymenudivtag.scrollLeft+15;
	}
	this.fnScrollPrevious=function(){
		this.gallerymenudivtag.scrollLeft=	this.gallerymenudivtag.scrollLeft-15;

	}
	this.fnAddButtons=function(){
		
		var navigationbuttons=document.createElement("div");
		navigationbuttons.style.position="relative";
		navigationbuttons.style.left="0px";
		navigationbuttons.style.top="0px";
		this.window.divtag.appendChild(navigationbuttons);
		
		
		var nextbuttonimage=document.createElement("img");
		nextbuttonimage.src=this.scrollnext;
		nextbuttonimage.id= "i5scrollnext" ;
		nextbuttonimage.className= "i5scrollnext";
		nextbuttonimage.style.zIndex="15";
		nextbuttonimage.onmousedown=window.methodize(this.fnScrollNext,this,null);
		//nextbuttonimage.onmouseover=this.gallerymenudivtag.scrollRight+1;

		var previousbuttonimage=document.createElement("img");
		previousbuttonimage.src=this.scrollprevious;
		previousbuttonimage.id="i5scrollprevious";
		previousbuttonimage.className="i5scrollprevious";
		previousbuttonimage.style.zIndex="15";
		previousbuttonimage.onmousedown=window.methodize(this.fnScrollPrevious,this,null);
		
		var closebuttonimage=document.createElement("img");
		closebuttonimage.src=this.closebutton;
		closebuttonimage.id="i5galleryitemclose";
		closebuttonimage.className="i5galleryitemclose";
		closebuttonimage.style.zIndex="15";
		closebuttonimage.style.display="none";
		closebuttonimage.onmousedown=window.methodize(this.fnCloseGalleryItem,this,null);

		navigationbuttons.appendChild(previousbuttonimage);
		navigationbuttons.appendChild(closebuttonimage);
		navigationbuttons.appendChild(nextbuttonimage);


		

	}
	this.fnCloseGalleryItem=function(){
				
		//Remove content
		
		var actualgallerycontainerdivtag=document.getElementById(this.activegalleryreference + "CONTENT");
		this.gallerycontentdivtag.removeChild(actualgallerycontainerdivtag);
		
		//Remove Anchor
		var actualgalleryliTag=document.getElementById("LI" + this.activegalleryreference);
		this.ulTag.removeChild(actualgalleryliTag);
		
		
		
		//Remove reference from all Arrays
		for(key in this.arrayofgalleryreferences){

			if (this.arrayofgalleryreferences[key]==this.activegalleryreference){
				this.arrayofgalleryreferences.splice(key,1);
				this.arrayofgallerytitles.splice(key,1);	
			

			}
			
		}

		this.fnHideClose();
		
	}

}
