i5MenuBar.prototype=i5UIObject;
i5MenuBar.prototype.constructor=i5MenuBar;

function i5MenuBar(){
	
	i5UIObject.call(this);

	//PUBLIC PROPERTIES
	this.menuclassname="";
	this.mainmenuitems="";
	this.menuhandlerscript="";
	this.paramobject="";


	this.ulTag="";
	this.ulTagName="";

	this.liTag="";
	this.liTagName="";

	this.contentdivtag="";
	this.contentdivtagName="";
	
	
	this.fnInitFromJson=function(paramObject){

		i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 
		this.paramobject=paramObject;
		for(key in paramObject){
			this[key]=paramObject[key];
		}
		
		if (this.menuhandlerscript==""){
			this.fnCreateMenu();
		}
		else
		{
			var jsFileRef="";
			jsFileRef=document.createElement("script");
			jsFileRef.setAttribute("type","text/javascript");
			jsFileRef.setAttribute("src", this.menuhandlerscript);
			document.getElementsByTagName("head")[0].insertBefore(jsFileRef,document.head.lastChild);
			jsFileRef.addEventListener('load', methodize(this.fnOni5JSFileLoaded,this),false);
		}
	}
	
	this.fnOni5JSFileLoaded=function(){
		this.fnCreateMenu();
	}
	
	
	
	this.fnCreateMenu=function(){
		
		//this.fnCreateDiv();
		
		this.mainmenuitems=this.mainmenuitems.split(',');
		this.divtag=document.getElementById(this.parent);
		//alert(this.divtag.id);
		
		//create ul tag

		this.ulTag=document.createElement("ul");
		this.ulTag.id=this.menuclassname;
		this.ulTag.className=this.menuclassname;		
		this.divtag.appendChild(this.ulTag);
		
		//
		for(key in this.mainmenuitems){
			
			this.liTag=document.createElement("li");
			var anchorTag=document.createElement("a");
			//anchorTag.href="#";
			anchorTag.appendChild(document.createTextNode(this.mainmenuitems[key]));
			
			this.liTag.appendChild(anchorTag);
			this.ulTag.appendChild(this.liTag);
			
			
			var tempsubmenuobject=this.paramobject[this.mainmenuitems[key]];
			var submenuitemsarray=new Array();
			var submenuitemsarray=tempsubmenuobject["submenuitems"].split(',');
			var submenutouchenditemsarray=tempsubmenuobject["submenutouchend"].split(',');
			var tempulTag=document.createElement("ul");
			for(key1 in submenuitemsarray){
			
				var templiTag=document.createElement("li");
				anchorTag=document.createElement("a");
				anchorTag.id="anchor" + tempsubmenuobject["id"];
				anchorTag.onmouseup=eval(submenutouchenditemsarray[key1]);
				anchorTag.appendChild(document.createTextNode(submenuitemsarray[key1]));
				templiTag.appendChild(anchorTag);
				tempulTag.appendChild(templiTag);
				this.liTag.appendChild(tempulTag);
			}

		}
	}
	

	this.fnFinalizeInit=function(){
		i5UIObject.prototype.fnFinalizeInit.call(); 
	}
	this.fnIncludeStyles=function(){
		i5UIObject.prototype.fnIncludeStyles.call(); 
	}

	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
	}
	
	
	this.fnRemove=function(){
		
		i5UIObject.prototype.fnRemove.call(this); 

	}
	
	this.fnTouchEnd=function(paramCallback){
		
		//var fnCallBack=eval(paramCallback);
		//paramCallback;
	}

	this.fnTouchStart=function(){

//		this.fnCreateCanvas("ROLLOVER");
	}

}







