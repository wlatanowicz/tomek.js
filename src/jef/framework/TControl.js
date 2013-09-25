//= require CommonUtils
//= require TExpression

/**
 * Base control class
 * handles all common dependency and rendering routines
 */
var TControl = Base.extend( {
	
	/**
	 * Array of TControl
	 * Keeps all direct child controls
	 */
	_childControls : [],
	
	/**
	 * Hash of TControl
	 * Keeps track of child controls based on ID
	 */
	_childControlsHash : {},
	
	/**
	 * Boolean
	 * True when child controls have been initialized
	 * afer running createChildControls()
	 */
	_childControlsCreated : false,
	
	/**
	 * Hash of TControl
	 * Keeps track of controls initialized using XML template
	 */
	_templateControls : {},
	
	/**
	 * Array of DOMElement
	 * Keeps track of rendered DOMElements
	 * that should be removed on rerender
	 */
	_renderedNodes : [],
	
	/**
	 * DOMElement
	 * Control is rendered inside this element
	 */
	_placeholder : null,
	
	/**
	 * Node
	 * Keeps position of this control inside _placeholder
	 */
	_positionMarker : null,
	
	/**
	 * Default control constructor
	 * 
	 * @param options Hash of properties to be set
	 */
	constructor : function( options ){
		this._childControls = [];
		this._renderedNodes = [];
		this._childControlsHash = {};
		this._childControlsCreated = false;
		this._positionMarker = null;
		this._templateControls = {};
		
		this.registerPublicProperties();
		
		this._Visible = true;
		
		if ( options ){
			for ( var opt in options ){
				
				if ( opt.indexOf( '.' ) > -1 ){
					//handle nested properties like Attributes.Options.Color
					var opts = opt.split( '.' );
					
					var obj = this;
					var i;
					
					for ( i=0; i<(opts.length-1); i++ ){
						if ( ! obj[ opts[i] ] ){
							obj[ opts[i] ] = {};
						}
						obj = obj[ opts[i] ];
					}
					
					obj[ opts[i] ] = options[ opt ];
					
				}else{
					//handle simple properties
					this[opt] = options[ opt ];
				}
				
			}
		}
	},
	
	/**
	 * Setter for control ID
	 * 
	 * @param id String new control ID
	 */
	setID : function( id ){
		if ( this._ID != null ){
			throw new Exception( 'Cannot change ID' )
		}
		this._ID = id;
	},
	
	/**
	 * Defines list of public properties
	 * 
	 * @returns Array of String
	 */
	getPublicProperties : function(){
		return ['ID','Placeholder','Parent','Visible'];
	},
	
	/**
	 * Registers all public properties
	 * defined by getPublicProperties()
	 */
	registerPublicProperties : function(){
		var props = this.getPublicProperties();
		var i;
		for ( i=0; i<props.length; i++ ){
			this.registerPublicProperty( props[i] );
		}
	},
	
	/**
	 * Registers public property
	 * by creating object property,
	 * setter and getter functions if necessary
	 * 
	 * @param name String property name
	 */
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
	
	//@TODO TODEL
//	setAttribute : function( key, value ){
//		this[key] = value;
//	},
//
//	getAttribute : function( key ){
//		return this[key];
//	},
	
	
	/**
	 * Sets placholder for control
	 * to be rendered in
	 * 
	 * @param root_node String|DOMElement placeholder
	 */
	setPlaceholder : function( root_node ){
		if ( typeof root_node == 'string' ){
			root_node = document.getElementById( root_node );
		}
		if ( ! root_node ){
			throw new Exception( 'Invalid Placeholder' )
		}
		this._placeholder = root_node;
	},
	
	/**
	 * Returns placeholder for control
	 * fallbacks to parent control if required
	 * 
	 * @returns DOMElement node to render control in
	 */
	getPlaceholder : function(){
		return this._placeholder ? this._placeholder : ( this.getParent() ? this.getParent().getPlaceholder() : document.body );
	},
	
	/**
	 * Removes all DOMElements created while rendering the control
	 * before next render
	 */
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
	
	/**
	 * Initializes child controls if required
	 */
	ensureChildControls : function(){
		if ( ! this._childControlsCreated ){
			this.createChildControls();
			this._childControlsCreated = true;
		}
	},
	
	/**
	 * Initializes child controls
	 * should be overloaded
	 */
	createChildControls : function(){
		
	},
	
	/**
	 * Renders the control
	 * and all its child controls
	 */
	render : function(){
		this.ensureChildControls();
		this.preRenderCleanUp();
		if ( this._Visible ){
			this.renderContents( this.getPlaceholder() );
		}
	},
	
	/**
	 * Sets placeholder and renders contents of control
	 * Should not be called directly
	 */
	renderContentsInPlaceholder : function( placeholder ){
		this.setPlaceholder( placeholder );
		if ( this._Visible ){
			this.renderContents( placeholder );
		}
	},
	
	/**
	 * Renders contents of control
	 * Should not be called directly
	 */
	renderContents : function( placeholder ){
		this.ensureChildControls();
		this.renderChildControls( placeholder );
	},

	/**
	 * Renders contents of child controls
	 * Should not be called directly
	 */
	renderChildControls : function( placeholder ){
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[ i ].renderContentsInPlaceholder( placeholder );
		}
	},
	
	/**
	 * Appends DOMElement to control
	 * Used on render to add DOMElement to control's placeholder,
	 * keeps track it in _renderedNodes and adds position marker
	 * 
	 * @param el DOMElement element to be added
	 * @param root DOMElement optional, placeholder for element
	 */
	appendChild : function( el, root ){
		
		var ph = this.getPlaceholder();
		
		if ( ! root ){
			root = ph;
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
	
	/**
	 * Adds child control
	 * and sets relationship between controls
	 * 
	 * @param c TControl control
	 */
	addChildControl : function( c ){
		c.setParent( this );
		this._childControls.push( c );
		if ( c.getID() ){
			this._childControlsHash[ c.getID() ] = c;
		}
	},
	
	/**
	 * Adds child control defined in template
	 * sets relationship between controls and
	 * adds control to _templateControls hash
	 * 
	 * @param k String name of variable defined by template compiler
	 * @param c TControl control
	 */
	addTemplateChildControl : function( k, c ){
		this._templateControls[ k ] = c;
		this.addChildControl( c );
	},
	
	/**
	 * Returns direct child control by ID
	 * 
	 * @param i String control ID
	 * 
	 * @returns TControl|null child control with particualar ID if found or null if not found
	 */
	getChildControl : function( id ){
		return this._childControlsHash[ id ]
				? this._childControlsHash[ id ]
				: null;
	},
	
	/**
	 * Returns child control by ID
	 * searches recursively all child controls
	 * 
	 * @param i String control ID
	 * 
	 * @returns TControl|null child control with particualar ID if found or null if not found
	 */
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