i5Window.prototype=i5UIObject;
i5Window.prototype.constructor=i5Window;

function i5Window(){

	i5UIObject.call(this);
	
	this.style="";//CHROME & CHROMELESS
	this.behavior="";//POPUP & INLINE
	this.dock="";//NONE,FILL, RIGHT, LEFT, TOP, BOTTOM
	this.closebutton=false;//TRUE OR FALSE
	this.minbutton=false;//TRUE OR FALSE
	this.draggable=false;//TRUE OR FALSE
	this.borderstyle="";
	this.borderwidth="";
	this.bordercolor="";
	this.resize="";
	this.background="";
	this.chrometitlebar="";
	this.chrometitlebartagname="chrometitlebar";
	this.title="";
	
	this.state="EXPANDED";//COLLAPSED & CLOSED

	this.windowcontentcontainer="";
	
	this.expandedbuttonstyle="expandedbutton";
	this.expandedbuttontagname="";
	this.expandedbutton="";
	
	this.collapsedbuttonstyle="collapsedbutton";
	this.collapsedbuttontagname="";
	this.collapsedbutton="";
	
	this.closebuttonstyle="closebutton";
	this.closebuttontagname="";
	this.closebutton="";
	
	this.i5WindowPropList={
			"style":"style",
			"behavior":"behavior",
			"dock":"dock",
			"closebutton":"closebutton",
			"minbutton":"minbutton",
			"draggable":"draggable",
			"borderstyle":"borderstyle",
			"borderwidth":"borderwidth",
			"bordercolor":"bordercolor",
			"resize":"resize",
			"background":"background",
			"chrometitlebar":"chrometitlebar",
			"chrometitlebartagname":"chrometitlebartagname",
			"title":"title",
			"state":"state",
			"expandedbuttonstyle":"expandedbuttonstyle",
			"expandedbuttontagname":"expandedbuttonstagname",
			"expandedbutton":"expandedbutton",
			"collapsedbuttonstyle":"collapsedbuttonstyle",
			"collapsedbuttontagname":"collapsedbuttonstagname",
			"collapsedbutton":"collapsedbutton",
			"closebuttonstyle":"closebuttonstyle",
			"closebuttontagname":"closebuttonstagname",
			"closebutton":"closebutton",
	}
	

	this.fnInitFromJson=function(paramObject){
		i5UIObject.prototype.fnInitFromJson.call(this,paramObject); 

		for(key in paramObject){
			if (paramObject[key]!="")
				this[key]=paramObject[key];
		
		}
		this.fnCreateDiv();
		this.fnCreateWindow();
		
		
		
		this.divtag.ondragenter=methodizeevent(this.fnOnDragEnter,this);
		this.divtag.ondrop=methodizeevent(this.fnOnDrop,this);
		this.divtag.ondragover=methodizeevent(this.fnOnDragOver,this);

	}
	
	this.fnInitFromDiv=function(paramObject){

		i5UIObject.prototype.fnInitFromDiv.call(this,paramObject); 

			
			//set i5WindowPropList
			for(key in this.i5WindowPropList){
				if (this.divtag.getAttribute(key)){
					this[key]=this.divtag.getAttribute(key);
				}	
			}	
	}
	
	this.fnCreateDiv=function(){
		i5UIObject.prototype.fnCreateDiv.call(this); 
		
		//set i5WindowpropList
		for(key in this.i5WindowPropList){
			if (this.divtag.getAttribute(key)){
				this[key]=this.divtag.getAttribute(key);
			}	
		}	
		
	}
	
	this.fnCreateWindow=function(){
		
		if (this.style=="CHROME"){

			this.chromeTitleBar=document.createElement("div");
			this.chromeTitleBar.id="chrome" + this.divtagName;
			this.chromeTitleBar.className=this.chrometitlebartagname;
			this.chromeTitleBar.style.left=this.left;
			this.chromeTitleBar.style.top=this.top;
			this.chromeTitleBar.style="absolute";
			this.chromeTitleBar.zIndex=this.zIndex;
			this.chromeTitleBar.appendChild(document.createTextNode(this.title))
			this.divtag.appendChild(this.chromeTitleBar);
			
			if (this.minbutton==true){
				this.fnAddMinMaxButtons();
			}
			if (this.closebutton==true){

				var closeButton=document.createElement("div");	
				closeButton.className="closebutton";
				this.chromeTitleBar.appendChild(closeButton);
				this.chromeTitleBar.onmouseup=methodize(this.fnDoClose,this);
				
			}
		}

	/*	this.windowContent=document.createElement("div");
		this.windowContent.id= this.id + "content";
		this.windowContent.style.left=this.left;
		this.windowContent.style.top=this.top;
		this.windowContent.style.width=this.width;
		this.windowContent.style.height=this.height;
		this.windowContent.style="absolute";
		this.divtag.appendChild(this.windowContent);*/
		
		
		this.divtag.style.borderWidth=this.borderwidth + "px";
		this.divtag.style.borderStyle=this.borderstyle;
		this.divtag.style.borderColor=this.bordercolor;
		this.divtag.style.background=this.background;
		this.divtag.draggable=this.draggable;
		
		this.fnManageDocking();
		window.ARRAYOFWINDOWS.push(this);

	}

	
	
	
	this.fnAddMinMaxButtons=function(){
		
		this.expandedbutton=document.createElement("div");
		this.expandedbuttontagname="expandedbutton" + this.id
		this.expandedbutton.className=this.expandedbuttonstyle;
		this.divtag.appendChild(this.expandedbutton);
		this.expandedbutton.onmouseup=methodize(this.fnManageMinMax,this);
		
		this.collapsedbutton=document.createElement("div");
		this.collapsedbbuttontagname="collapsedbutton" + this.id;
		this.collapsedbutton.className=this.collapsedbuttonstyle;
		this.divtag.appendChild(this.collapsedbutton);
		this.collapsedbutton.onmouseup=methodize(this.fnManageMinMax,this);
		
		if(this.state=="EXPANDED"){
			this.expandedbutton.style.visibility="visible";
			this.collapsedbutton.style.visibility="hidden";
			
		}
		if(this.state=="COLLAPSED"){
			this.collapsedbutton.style.visibility="visible";
			this.expandedbutton.style.visibility="hidden";

		}
	}
	
	this.fnManageMinMax=function(){
		if (this.state=="EXPANDED"){
			document.getElementById(this.id + "content").style.visibility="hidden";
			var tempHeight=this.height;
			while(tempHeight>=30){
				tempHeight=tempHeight-1;
				this.divtag.style.height=tempHeight + "px";
			}
			this.state="COLLAPSED"
			this.expandedbutton.style.visibility="hidden";
			this.collapsedbutton.style.visibility="visible";
			
		}
		else{
			document.getElementById(this.id + "content").style.visibility="visible";
			this.fnManageDocking();
			this.state="EXPANDED"
			this.expandedbutton.style.visibility="visible";
			this.collapsedbutton.style.visibility="hidden";
		}
			
		
	}
	
	this.fnDoClose=function(){
		
	}


	
	this.fnResize=function(){

		this.fnManageDocking();
	}

	
	this.fnManageDocking=function(){

		if (this.dock=="FILL"){	
			//this.divtag.style.zoom="200%";

			this.divtag.style.left=(window.AVAILABLELEFT + window.PADDINGBETWEENWINDOWS) + "px";
			this.divtag.style.top=(window.AVAILABLETOP + window.PADDINGBETWEENWINDOWS) + "px";
			this.divtag.style.width=((((window.AVAILABLERIGHT - window.AVAILABLELEFT) - window.PADDINGBETWEENWINDOWS)/window.innerWidth) * 100)+ "%";
			this.divtag.style.height=((((window.AVAILABLEBOTTOM - window.AVAILABLETOP) - window.PADDINGBETWEENWINDOWS)/window.innerHeight) *100)+ "%";

		}
		if (this.dock=="RIGHT"){	
			this.divtag.style.left=(window.innerWidth-this.width) + "px";
			this.divtag.style.height=this.height + "%";
			window.AVAILABLERIGHT=((window.innerWidth-this.width)-window.PADDINGBETWEENWINDOWS);
			this.fnRedockFillWindow();
		}
		if (this.dock=="LEFT"){	
			this.divtag.style.left="0px";
			this.divtag.style.height=this.height + "%";
			window.AVAILABLELEFT= this.width+window.PADDINGBETWEENWINDOWS;
			this.fnRedockFillWindow();

			
		}
		
		if (this.dock=="TOP"){	
			this.divtag.style.left="0px";
			this.divtag.style.top="0px";
			this.divtag.style.width=this.width + "%";
			window.AVAILABLETOP= this.height+window.PADDINGBETWEENWINDOWS;
			this.fnRedockFillWindow();


		}
		if (this.dock=="BOTTOM"){	
			this.divtag.style.left="0px";
			this.divtag.style.top=(window.innerHeight-this.height) + "px";
			this.divtag.style.width=this.width + "%";
			
			window.AVAILABLEBOTTOM=((window.innerHeight-this.height)-window.PADDINGBETWEENWINDOWS);
			this.fnRedockFillWindow();

		}
		if (this.dock=="NONE"){	
			this.divtag.style.left=this.left;
			this.divtag.style.top=this.top;
			this.divtag.style.width=this.width;
			this.divtag.style.height=this.height;
			
		//	window.AVAILABLEBOTTOM=((window.innerHeight-this.height)-window.PADDINGBETWEENWINDOWS);
		//	this.fnRedockFillWindow();

		}
	}

	this.fnRedockFillWindow=function(){
		
		for (key in window.ARRAYOFWINDOWS){
			var tempObject=window.ARRAYOFWINDOWS[key];
			if (tempObject.dock=="FILL"){
				tempObject.divtag.style.left=(window.AVAILABLELEFT + window.PADDINGBETWEENWINDOWS) + "px";
				tempObject.divtag.style.top=(window.AVAILABLETOP + window.PADDINGBETWEENWINDOWS) + "px";
				tempObject.divtag.style.width=((((window.AVAILABLERIGHT - window.AVAILABLELEFT) - window.PADDINGBETWEENWINDOWS)/window.innerWidth) * 100)+ "%";
				tempObject.divtag.style.height=((((window.AVAILABLEBOTTOM - window.AVAILABLETOP) - window.PADDINGBETWEENWINDOWS)/window.innerHeight) *100)+ "%";
			}
		}
		
	}
	this.fnGetHtml5=function(){

		return (document.getElementById(this.id).innerHTML);
	}

	this.fnRemove=function(){

		i5UIObject.prototype.fnRemove.call(this); 

	}
	this.fnOnDrop=function(paramEvent){
		i5UIObject.prototype.fnOnDrop.call(this,paramEvent); 

		paramEvent.dataTransfer.effectAllowed="move";
		paramEvent.dataTransfer.dropEffect="move";
	}
	this.fnOnDragOver=function(paramEvent){
		i5UIObject.prototype.fnOnDragOver.call(this,paramEvent); 

		paramEvent.dataTransfer.effectAllowed="move";
		paramEvent.dataTransfer.dropEffect="move";

	}
	this.fnOnDragEnter=function(paramEvent){
		i5UIObject.prototype.fnOnDragEnter.call(this,paramEvent); 

		paramEvent.dataTransfer.effectAllowed="move";
		paramEvent.dataTransfer.dropEffect="move";

	}
	

}






