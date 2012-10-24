var TControl = Base.extend( {
	
	_childControls : [],
	_renderedNodes : [],
	_childControlsCreated : false,
	
	Parent : null,
	RootNode : null,
	
	constructor : function( options ){
		this._childControls = [];
		this._renderedNodes = [];
		this.RootNode = null;
		this.Parent = null;
		this._childControlsCreated = false;
		if ( options ){
			for ( var opt in options ){
				this[ opt ] = options[ opt ];
			}
		}
		if ( typeof this.RootNode == "string" ){
			this.RootNode = document.getElementById( this.RootNode );
		}
	},
	
	getRootNode : function(){
		return this.RootNode ? this.RootNode : ( this.Parent ? this.Parent.getRootNode() : document.body );
	},
	
	preRenderCleanUp : function(){
		var x_el = document.createElement( "div" );
		for ( var i=0; i<this._renderedNodes.length; i++ ){
			var n = this._renderedNodes[ i ];
			if ( n.remove ){
				n.remove();
			}else{
				x_el.appendChild( n );
			}
		}
		x_el = null;
		this._renderedNodes = [];
	},
	
	ensureChildControls : function(){
		if ( ! this._childControlsCreated ){
			this.createChildControls();
			this._childControlsCreated = true;
		}
	},
	
	createChildControls : function(){
		
	},
	
	render : function(){
		this.ensureChildControls();
		this.preRenderCleanUp();
		this.renderContents( this );
	},
	
	renderContents : function( placeholder ){
		this.renderChildControls( placeholder );		
	},

	renderChildControls : function( placeholder ){
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[ i ].renderContents( placeholder );
		}
	},
	
	renderChildControl : function( c, placeholder ){
		c.renderContents( placeholder );	
	},
	
	appendChild : function( el ){
		this._renderedNodes.push( el );
		this.getRootNode().appendChild( el );
	},
	
	addChildControl : function( i, c ){
		c.Parent = this;
		if ( i ){
			this._childControls[ i ] = c;
		}else{
			this._childControls.push( c );
		}
	},
	
	getChildControl : function( i ){
		return this._childControls[ i ];
	}
	
} );