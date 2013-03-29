//= require Base

var TControl = Base.extend( {
	
	_childControls : [],
	_childControlsHash : {},
	_renderedNodes : [],
	_childControlsCreated : false,
	_positionMarker : null,
	
	constructor : function( options ){
		this._childControls = [];
		this._renderedNodes = [];
		this._childControlsCreated = false;
		this._positionMarker = null;
		
		this.registerPublicProperties();
		
		if ( options ){
			for ( var opt in options ){
				this[opt] = options[ opt ];
			}
		}
	},
	
	setID : function( id ){
		if ( this._ID != null ){
			throw new Exception( 'Cannot change ID' )
		}
		this._ID = id;
	},
	
	getPublicProperties : function(){
		return ['ID','RootNode','Parent'];
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
		var i;
		for ( i=0; i<this._childControls.length; i++ ){
			this._childControls[i].preRenderCleanUp();
		}
		var x_el = document.createElement( "div" );
		for ( i=0; i<this._renderedNodes.length; i++ ){
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
		this.renderContents( this.getParent() );
	},
	
	renderContents : function( placeholder ){
		this.renderChildControls();
	},

	renderChildControls : function( placeholder ){
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[ i ].renderContents( this );
		}
	},
	
	appendChild : function( el ){
		this._renderedNodes.push( el );
		
		var root = this.getRootNode();
		
		if ( this._positionMarker == null || this._positionMarker.parentNode != root ){
			this._positionMarker = document.createComment( "-" );
			root.appendChild( this._positionMarker );
		}
		
		root.insertBefore( el, this._positionMarker );
		
	},
	
	addChildControl : function( c ){
		c.setParent( this );
		this._childControls.push( c );
		if ( c.getID() ){
			this._childControlsHash[ c.getID() ] = c;
		}
	},
	
	getChildControl : function( i ){
		return this._childControlsHash[ i ];
	},
	
	findChildControlByID : function( id ){
		var i;
		if( this._childControlsHash[ id ]
			&& this._childControlsHash[ id ].getID() == id ){
			return this._childControlsHash[ id ];
		}
		for ( i=0; i<this._childControls.length; i++ ){
			var ctrl = this._childControls[i].findChildControlByID( id );
			if( ctrl != null ){
				return ctrl;
			}
		}
		return null;
	}
	
} );