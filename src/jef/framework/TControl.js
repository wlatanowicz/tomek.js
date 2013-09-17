//= require Base
//= require TExpression

var TControl = Base.extend( {
	
	_childControls : [],
	_childControlsHash : {},
	_childControlsCreated : false,
	_templateControls : {},
	
	_renderedNodes : [],
	
	/**
	 * Element
	 * Control is rendered inside this element
	 */
	_placeholder : null,
	
	/**
	 * Node
	 * Keeps position of this control inside _placeholder
	 */
	_positionMarker : null,
	
	
	constructor : function( options ){
		this._childControls = [];
		this._renderedNodes = [];
		this._childControlsHash = {};
		this._childControlsCreated = false;
		this._positionMarker = null;
		this._templateControls = {};

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
		return ['ID','Placeholder','Parent'];
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
	
	setPlaceholder : function( root_node ){
		if ( typeof root_node == 'string' ){
			root_node = document.getElementById( root_node );
		}
		if ( ! root_node ){
			throw new Exception( 'Invalid Placeholder' )
		}
		this._placeholder = root_node;
	},
	
	getPlaceholder : function(){
		return this._placeholder ? this._placeholder : ( this.getParent() ? this.getParent().getPlaceholder() : document.body );
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
		this.renderContents( this.getPlaceholder() );
	},
	
	renderContentsInPlaceholder : function( placeholder ){
		this.setPlaceholder( placeholder );
		this.renderContents( placeholder );
	},
	
	renderContents : function( placeholder ){
		this.renderChildControls( placeholder );
	},

	renderChildControls : function( placeholder ){
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[ i ].renderContentsInPlaceholder( placeholder );
		}
	},
	
	appendChild : function( el, root ){
		
		var ph = this.getPlaceholder();
		
		if ( ! root ){
			root = ph;
			el = arg2;
		}
		
		this._renderedNodes.push( el );
		
		if ( root == ph ){
		
			if ( this._positionMarker == null || this._positionMarker.parentNode != root ){
				this._positionMarker = document.createComment( "-" );
				//this._positionMarker = document.createElement( "span" );
				root.appendChild( this._positionMarker );
			}

			root.insertBefore( el, this._positionMarker );
		}else{
			root.appendChild( el );
		}
		
	},
	
	addChildControl : function( c ){
		c.setParent( this );
		this._childControls.push( c );
		if ( c.getID() ){
			this._childControlsHash[ c.getID() ] = c;
		}
	},
	
	addTemplateChildControl : function( k, c ){
		this._templateControls[ k ] = c;
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