function i5Gallery(paramGallery){
	
	this.metaarray="";
	this.metaobjectreferencearray="";
	this.galleryname=paramGallery;
	this.jsfilesarray=new Array();
	this.loadedjsfilesctr=0;
	this.gallerydetails="";
	this.blninitialized=false;
	this.state="ACTIVE";
	this.jsfilesarray.push("../" + window.GALLERIESFOLDERNAME + "/" + this.galleryname + "/" + this.galleryname + "uimeta.js");
	window.fnLoadJSFiles(this,this.jsfilesarray);

}

i5Gallery.prototype.fnOni5JSFileLoaded=function(){
		
		this.loadedjsfilesctr++;
		if (this.blninitialized==false){
			this.blninitialized=true;
			this.gallerydetails=eval(this.galleryname.toUpperCase() + "DETAILS");
			this.jsfilesarray=this.gallerydetails.jsfiles.split(",");
			this.loadedjsfilesctr=0;
			window.fnLoadJSFiles(this,this.jsfilesarray);
		}
		else{
			if (this.loadedjsfilesctr==this.jsfilesarray.length){
				window.fnLoadCSSFile(this.gallerydetails.cssfile);
				this.fnInitFromJson(this.gallerydetails.meta);
			}
		}
			
}
		
	
i5Gallery.prototype.fnInitFromJson=function(paramObject){

		
		this.metaarray=paramObject;
		this.metaobjectreferencearray=new Array();
		
		for(ctr=0;ctr<this.metaarray.length;ctr++)
		{
			var objectType=eval(this.metaarray[ctr].type);
			ai5Object=new objectType();
			ai5Object.fnInitFromJson(this.metaarray[ctr]);
			//ai5Object.divtag.style.position="relative";
			this.metaobjectreferencearray[ctr]=ai5Object;
			window.THISi5APPUIOBJECTS.metaobjectreferencearray.push(ai5Object);
		}
		
}


i5Gallery.prototype.fnGetObject=function(paramObjectName){
	for(ctr=0;ctr<this.metaobjectreferencearray.length;ctr++)
	{
		ai5Object=this.metaobjectreferencearray[ctr];
		if (ai5Object.name==paramObjectName){
			return(ai5Object);
		}
	}
	return(null);
}
	