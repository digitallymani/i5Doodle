function i5UIObjects(){
	
	this.metaarray="";
	this.metaobjectreferencearray=new Array();
	this.uistylesheet="";
	this.uiwindows=new Array();
	this.uigallerymanager="";
	this.uiwindows=new Array();


this.fnInit=function(paramObject){


	this.metaarray=paramObject;
	
	for(ctr=0;ctr<=this.metaarray.length-1;ctr++)
	{
		var objectType=eval(this.metaarray[ctr].type);
		var objectId=this.metaarray[ctr].id;

		for (ctr1=0;ctr1<=this.metaobjectreferencearray.length-1;ctr1++)
		{
			tempObject=this.metaobjectreferencearray[ctr1];
			if (tempObject.id==objectId){
				this.metaobjectreferencearray.splice(ctr1,1);
				break;
			}
		}
		
		
		ai5Object=new objectType();
		ai5Object.fnInitFromJson(this.metaarray[ctr]);
		
	
		//this.metaobjectreferencearray.push(ai5Object);

		
		if (this.metaarray[ctr].type=="i5Window"){
			this.uiwindows.push(ai5Object);
			
		}
		if (this.metaarray[ctr].type=="i5GalleryManager"){
			this.uigallerymanager=ai5Object;
			window.i5GALLERYMANAGER=ai5Object;
		}
		
	}
}

this.fnRemove=function(){
	
	
}
}