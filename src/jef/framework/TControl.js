//= require Base

var TControl = Base.extend( {
	
	_childControls : [],
	_childControlsHash : {},
	_renderedNodes : [],
	_childControlsCreated : false,
	
	constructor : function( options ){
		this._childControls = [];
		this._renderedNodes = [];
		this._childControlsCreated = false;
		
		this.registerPublicProperties();
		
		if ( options ){
			for ( var opt in options ){
				this[opt] = options[ opt ];
			}
		}
	},
	
	getPublicProperties : function(){
		return ['RootNode','Parent'];
	},
	
	registerPublicProperties : function(){
		var props = this.getPublicProperties();
		var i;
		for ( i=0; i<props.length; i++ ){
			this.registerPublicProperty( props[i] );
		}
	},
	
	registerPublicProperty : function( name ){
		//http://johndyer.name/native-browser-get-set-properties-in-javascript/
		
		this['_'+name] = null;
		
		if ( ! this['set'+name] ){
			this['set'+name] = function( value ){
				this['_'+name] = value;
			}
		}
		
		if ( ! this['get'+name] ){
			this['get'+name] = function(){
				return this['_'+name];
			}
		}
		
		var onSet = this['set'+name];
		var onGet = this['get'+name];
		
		var	getFn = function () {
					return onGet.apply( this );
				};
		
		var	setFn = function (newValue) {
					return onSet.apply( this, [newValue]);
				};


		// Modern browsers, IE9+, and IE8 (must be a DOM object),
		if ( Object.defineProperty ) {
			
			var props = {
				get : getFn,
				set : setFn
			};
			Object.defineProperty( this, name, props );

		// Older Mozilla
		} else if ( this.__defineGetter__ ) {
			this.__defineGetter__( name, getFn );
			this.__defineSetter__( name, setFn );
		}
		
	},
	
	setAttribute : function( key, value ){
		this[key] = value;
	},

	getAttribute : function( key ){
		return this[key];
	},
	
	setRootNode : function( root_node ){
		if ( typeof root_node == 'string' ){
			root_node = document.getElementById( root_node );
		}
		if ( ! root_node ){
			throw new Exception( 'Invalid RootNode' )
		}
		this._RootNode = root_node;
	},
	
	getRootNode : function(){
		return this._RootNode ? this._RootNode : ( this.getParent() ? this.getParent().getRootNode() : document.body );
	},
	
	preRenderCleanUp : function(){
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[i].preRenderCleanUp();
		}
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
		this._childControls.push( c );
		if ( i ){
			this._childControlsHash[ i ] = c;
		}
	},
	
	getChildControl : function( i ){
		return this._childControlsHash[ i ];
	}
	
} );