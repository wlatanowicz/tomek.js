//= require TObject
//= require TException
//= require CommonUtils
//= require TExpression

/** section: Controls
 * class TControl
 * 
 * Base control class
 * handles all common dependency and rendering routines
 * 
 **/
klass( 'TControl', {
	
	/**
	 * TControl#_childControls -> Array[TControl]
	 * 
	 * Keeps all direct child controls
	 * 
	 **/
	_childControls : [],
	
	/**
	 * TControl#_childControlsHash -> Hash[TControl]
	 * 
 	 * Keeps track of child controls based on ID
	 * 
	 **/
	_childControlsHash : {},
	
	/**
	 * TControl#_childControlsCreated -> Boolean
	 * 
	 * True when child controls have been initialized
	 * afer running createChildControls()
	 * 
	 **/
	_childControlsCreated : false,
	
	/**
	 * TControl#_templateControls -> Hash[TControl]
	 * 
	 * Keeps track of controls initialized using XML template
	 * 
	 **/
	_templateControls : {},
	
	/**
	 * TControl#_renderedNodes -> Array[DOMElement]
	 * 
	 * Keeps track of rendered DOMElements
	 * that should be removed on rerender
	 * 
	 **/
	_renderedNodes : [],
	
	/**
	 * TControl#_placeholder -> DOMElement
	 * 
	 * Control is rendered inside this element
	 * 
	 **/
	_placeholder : null,
	
	/**
	 * TControl#_positionMarker -> DOMElement
	 * 
	 * Keeps position of this control inside _placeholder
	 * 
	 **/
	_positionMarker : null,
	
	/**
	 *  new TControl([options])
	 *  - options (Hash): hash of properties to be set
	 * 
	 * Default control constructor
	 * 
	 **/
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
				
				if ( opt.indexOf( '.' ) > -1 ){
					//handle nested properties like Attributes.Options.Color
					var opts = opt.split( '.' );
					
					var obj = this;
					var i;
					
					for ( i=0; i<(opts.length-1); i++ ){
						
						if ( obj["get"+opts[i]] ){
							//use getter if available //IE8 fix
							var next_obj = obj["get"+opts[i]]();
							if ( ! next_obj ){
								obj["set"+opts[i]]( {} );
								next_obj = obj["get"+opts[i]]();
							}
							obj = next_obj;
						}else{
							//direct read
							if ( ! obj[ opts[i] ] ){
								obj[ opts[i] ] = {};
							}
							obj = obj[ opts[i] ];
						}
					
					}
					
					if ( obj[ "set"+opts[i] ] ){
						//use setter if available //IE8 fix
						obj[ "set"+opts[i] ]( options[ opt ] );
					}else{
						//direct assignment
						obj[ opts[i] ] = options[ opt ];
					}
					
				}else{
					//handle simple properties
					if ( this["set"+opt] ){
						//use setter if available
						this["set"+opt]( options[ opt ] );
					}else{
						//direct assignment
						this[opt] = options[ opt ];
					}
				}
				
			}
		}
	},
	
	setID : function( id ){
		if ( this._ID !== null ){
			throw new TException( 'Cannot change ID' )
		}
		this._ID = id;
		if ( this.getParent() ){
			this.getParent()._childControlsHash[ this._ID ] = this;
		}
	},
    
    setId : function( id ){
        this.setID( id );
    },
    
    getId : function(){
        return this.getID();
    },
	
	/**
	 * TControl#ID -> String
	 **/
	
	/**
	 * TControl#Id -> String
     * 
     * An alias for TControl#ID
     * 
	 **/
	
	/**
	 * TControl#Placeholder -> DOMElement
	 **/
	
	/**
	 * TControl#Parent -> TControl
	 **/
	
	/**
	 * TControl#Visible -> Boolean
	 **/
	
	/**
	 * TControl#getPublicProperties() -> Array[String]
	 * 
	 * Defines list of public properties
	 * 
	 **/
	getPublicProperties : function(){
		return ['ID',
				'Id',
				{ name: 'Placeholder', type: 'object' },
				{ name: 'Parent', type: 'object' },
				{ name: 'Visible', type: 'bool', default: true }
				];
	},
	
	/**
	 * TControl#registerPublicProperties() -> void
	 * 
	 * Registers all public properties
	 * defined by getPublicProperties()
	 * 
	 **/
	registerPublicProperties : function(){
		var props = this.getPublicProperties();
		var i;
		for ( i=0; i<props.length; i++ ){
			this.registerPublicProperty( props[i] );
		}
	},
	
	/**
	 * TControl#registerPublicProperty( name ) -> void
	 * - property (String): property name
	 * 
	 * Registers public property
	 * by creating object property,
	 * setter and getter functions if necessary.
	 * Automated call of setter and getter when accessing property
	 * does not work in IE8.
	 * 
	 **/
	registerPublicProperty : function( property ){
		//http://johndyer.name/native-browser-get-set-properties-in-javascript/
		
        var name = '';
        var can_get = true;
        var can_set = true;
        var default_value = null;
		var setConversion = 'none';
		var getConversion = 'string';
        
        if ( typeof property === 'string' ){
            name = property;
        }else{
            name = property.name;
            if ( typeof property.default !== 'undefined' ){
                default_value = property.default;
                //@TODO optional setter and getter
            }
            if ( typeof property.type !== 'undefined' ){
				// one of: int, integer, float, string, bool, boolean, object
				getConversion = property.type.toLowerCase();
			}
            if ( typeof property.settype !== 'undefined' ){
				// one of: int, integer, float, string, bool, boolean, object
				setConversion = property.settype.toLowerCase();
			}
        }
        
		this['_'+name] = default_value;
		
        var	getFn = null;
        var	setFn = null;
        
        if ( can_get ){
            if ( ! this['get'+name] ){
				if ( getConversion === 'none' ){
					this['get'+name] = function(){
						return this['_'+name];
					};
				}else
				if ( getConversion === 'string' ){
					this['get'+name] = function(){
						return this['_'+name] !== null ? this['_'+name].toString() : '';
					};
				}else
				if ( getConversion === 'int' || getConversion === 'integer' ){
					this['get'+name] = function(){
						return parseInt( this['_'+name] );
					};
				}else
				if ( getConversion === 'float' ){
					this['get'+name] = function(){
						return parseFloat( this['_'+name] );
					};
				}else
				if ( getConversion === 'bool' || getConversion === 'boolean' ){
					this['get'+name] = function(){
						return parseBool( this['_'+name] );
					};
				}else
				if ( getConversion === 'object' || getConversion === 'obj' ){
					this['get'+name] = function(){
						return this['_'+name] !== null ? this['_'+name].valueOf() : null;
					};
				}else
				{
					throw new TException( 'Bad getter type conversion: '+getConversion );
				}
			}
            var onGet = this['get'+name];
            getFn = function () {
                        return onGet.apply( this );
                    };
        }
        
        if ( can_set ){
            if ( ! this['set'+name] ){
				if ( setConversion === 'none' ){
					this['set'+name] = function( value ){
						this['_'+name] = value;
					};
				}else
				if ( setConversion === 'string' ){
					this['set'+name] = function( value ){
						this['_'+name] = value !== null ? value.toString() : '';
					};
				}else
				if ( setConversion === 'int' || setConversion === 'integer' ){
					this['set'+name] = function( value ){
						this['_'+name] = parseInt( value );
					};
				}else
				if ( setConversion === 'float' ){
					this['set'+name] = function( value ){
						this['_'+name] = parseFloat( value );
					};
				}else
				if ( setConversion === 'bool' || setConversion === 'boolean' ){
					this['set'+name] = function( value ){
						this['_'+name] = parseBool( value.toString() );
					};
				}else
				if ( setConversion === 'object' || setConversion === 'obj' ){
					this['set'+name] = function( value ){
						this['_'+name] = value !== null ? value.valueOf() : null;
					};
				}else
				{
					throw new TException( 'Bad setter type conversion: '+getConversion );
				}
			
            }
    		var onSet = this['set'+name];
    		setFn = function (newValue) {
    					return onSet.apply( this, [newValue]);
        			};
        }
        
        // Modern browsers, IE9+, and IE8 (must be a DOM object),
		if ( Object.defineProperty ) {
			
			var props = {};
            
            if ( getFn ){
                props['get'] = getFn;
            }
            
            if ( setFn ){
                props['set'] = setFn;
            }
			
			try{
				Object.defineProperty( this, name, props );
			}catch( ex ){
				// IE8 fix
				// IE8 does not support Object.defineProperty for our objects :(
			}

		// Older Mozilla
		} else if ( this.__defineGetter__ ) {
            if ( getFn ){
    			this.__defineGetter__( name, getFn );
            }
            if ( setFn ){
                this.__defineSetter__( name, setFn );
            }
		}
		
	},
	
	/**
	 * TControl#setPlaceholder( placeholder ) -> void
	 * - placeholder (String|DOMElement|TControl|null): a placeholder
	 * 
	 * Sets placholder for control
	 * to be rendered in
	 * 
	 **/
	setPlaceholder : function( root_node ){
		if ( ! root_node ){
			this._Placeholder = null;
		}else
		if ( typeof root_node == 'string' ){
			this._Placeholder = document.getElementById( root_node );
		}else
		if ( root_node.nodeType
				&& root_node.nodeType == Node.ELEMENT_NODE ){
			this._Placeholder = root_node;
		}else
		if ( root_node.getPlaceholder ){
			this._Placeholder = null;
		}else
		{
			throw new TException( 'Invalid Placeholder' )
		}
	},
	
	/**
	 * TControl#getPlaceholder() -> DOMElement
	 * 
	 * Returns placeholder for control (a node to render control in)
	 * fallbacks to parent control if required
	 * 
	 **/
	getPlaceholder : function(){
		return this._Placeholder
			? this._Placeholder
			: ( this.getParent()
				? this.getParent().getPlaceholder()
				: document.body );
	},
	
	getVisible : function(){
		return parseBool( this._Visible ) && ( this.getParent() === null || this.getParent().getVisible() );
	},
	
	/**
	 * TControl#removeRenderedNodes() -> void
	 * 
	 * Removes all DOMElements created while rendering the control
	 * before next render
	 * 
	 **/
	removeRenderedNodes : function(){
		var i;
		for ( i=0; i<this._childControls.length; i++ ){
			this._childControls[i].removeRenderedNodes();
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
	 * TControl#ensureChildControls() -> void
	 * 
	 * Initializes child controls if required.
	 * 
	 **/
	ensureChildControls : function(){
		if ( ! this._childControlsCreated ){
			this.createChildControls();
			this._childControlsCreated = true;
		}
	},
	
	/**
	 * TControl#createChildControls() -> void
	 * 
	 * Initializes child controls.
	 * Should be overloaded.
	 * 
	 **/
	createChildControls : function(){
		
	},
	
	/**
	 * TControl#render() -> void
	 * 
	 * Renders the control
	 * and all its child controls.
	 * 
	 **/
	render : function(){
		this.ensureChildControls();
		this.removeRenderedNodes();
		if ( this.getVisible() ){
			this.renderContents();
		}else{
			this.ensurePositionMarker();
		}
	},
	
	/**
	 * TControl#renderContentsInPlaceholder( placeholder ) -> void
	 * - placeholder (String|DOMElement|TControl|null): a placeholder
	 * 
	 * Sets placeholder and renders contents of control.
	 * Should not be called directly.
	 * 
	 **/
	renderContentsInPlaceholder : function( placeholder ){
		this.setPlaceholder( placeholder );
		
		this.ensureChildControls();
		if ( this.getVisible() ){
			this.renderContents();
		}else{
			this.ensurePositionMarker();
		}

	},
	
	/**
	 * TControl#renderContents() -> void
	 * 
	 * Renders contents of control.
	 * Should not be called directly.
	 * 
	 **/
	renderContents : function(){
		this.renderChildControls( this );
	},

	/**
	 * TControl#renderChildControls( placeholder ) -> void
	 * - placeholder (DOMElement): a placeholder
	 * 
	 * Renders contents of child controls.
	 * Should not be called directly.
	 * 
	 **/
	renderChildControls : function( placeholder ){
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[ i ].renderContentsInPlaceholder( placeholder );
		}
	},
	
	/**
	 * TControl#appendChild( el ) -> void
	 * - el (DOMElement): element to be added
	 * 
	 * Appends DOMElement to control.
	 * Used on render to add DOMElement to control's placeholder,
	 * keeps track it in _renderedNodes and adds position marker.
	 * 
	 **/
	appendChild : function( el ){
		
		var root = this.getPlaceholder();
		
		this._renderedNodes.push( el );
		
		this.ensurePositionMarker();
		
		root.insertBefore( el, this._positionMarker );
		
	},
	
	/**
	 * TControl#ensurePositionMarker() -> void
	 * 
	 * Ensures position marker exists.
	 * 
	 **/
	ensurePositionMarker : function(){
		var root = this.getPlaceholder();
		
		if ( this._positionMarker == null || this._positionMarker.parentNode != root ){
			
			/* normal place holder: */
			this._positionMarker = document.createComment( "-" );
			
			/* debug, visible place holder: */
			//this._positionMarker = document.createElement( "span" );
			//this._positionMarker.appendChild( document.createTextNode("x"));
			//this._positionMarker.style.color = 'red';
			
			this._positionMarker.positionMarkerForControl = this;
			root.appendChild( this._positionMarker );
		}
	},
	
	/**
	 * TControl#addChildControl( c ) -> void
	 * - c (TControl): control
	 * 
	 * Adds child control
	 * and sets relationship between controls.
	 * 
	 **/
	addChildControl : function( c ){
		c.setParent( this );
		this._childControls.push( c );
		if ( c.getID() ){
			this._childControlsHash[ c.getID() ] = c;
		}
	},
	
	/**
	 * TControl#addTemplateChildControl( k, c ) -> void
	 * - k (String): name of variable defined by template compiler
	 * - c (TControl): control
	 * 
	 * Adds child control defined in template
	 * sets relationship between controls and
	 * adds control to _templateControls hash
	 * 
	 **/
	addTemplateChildControl : function( k, c ){
		this._templateControls[ k ] = c;
		this.addChildControl( c );
	},
	
	/**
	 * TControl#removeChildControl( c ) -> void
	 * - c (TControl): control to be removed
	 * 
	 * Removes child control
	 * 
	 **/
	removeChildControl : function( c ){
		var idx = this._childControls.indexOf( c );
		
		if ( idx > -1 ){
			
			this._childControls.splice( idx, 1 );
			
			var id = c.getID();
			if ( id ){
				delete this._childControlsHash[ id ];
			}
			
		}else{
			throw new TException( 'No such control' );
		}
		
	},
	
	/**
	 * TControl#removePositionMarker() -> void
	 * 
	 * Removes position marker
	 * from document tree
	 * 
	 **/
	removePositionMarker : function(){
		if ( this._positionMarker ){
			if ( this._positionMarker.remove ){
				this._positionMarker.remove();
			}else{
				var x_el = document.createElement( "div" );
				x_el.appendChild( this._positionMarker );
				x_el = null;
			}
			this._positionMarker = null;
		}
	},
	
	/**
	 * TControl#destroy() -> void
	 * 
	 * Destroys control
	 * and cleans up
	 * 
	 **/
	destroy : function(){
		
		if ( this.getParent() ){
			this.getParent().removeChildControl( this );
		}
		
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[i].destroy();
		}
		
		this.removeRenderedNodes();
		this.removePositionMarker();
		
	},
	
	/**
	 * TControl#getChildControl( id ) -> TControl|null
	 * - i (String): control ID
	 * 
	 * Returns direct child control by ID
	 * if found or null if not found.
	 * 
	 **/
	getChildControl : function( id ){
		this.ensureChildControls();
		
		return this._childControlsHash[ id ]
				? this._childControlsHash[ id ]
				: null;
	},
	
	/**
	 * TControl#findChildControlByID( id ) -> TControl|null
	 * - id (String): control ID
	 * 
	 * Returns child control by ID
	 * and searches recursively all child controls.
	 * Returns child control with particualar ID if found or null if not found
	 * 
	 **/
	findChildControlByID : function( id ){
		var i;
		
		this.ensureChildControls();
		
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
	},
	
	/**
	 * TControl#findControlByID( id ) -> TControl|null
	 * - id (String): control ID
	 * 
	 * Returns a control by ID in current control tree
	 * Function goes to the root parent
	 * and searches recursively all child controls.
	 * Returns control with particualar ID if found or null if not found
	 * 
	 **/
	findControlByID : function( id ){
		var c;
		if ( this.getParent() ){
			c = this.getParent().findControlByID( id );
		}else{
			c = this.findChildControlByID( id );
		}
		return c;
	},
	
	/**
	 * TControl#findChildControlsByType( class_name ) -> Array[TControl]
	 * - class_name (String): control ID
	 * 
	 * Returns child control by type (excatly, excluding subclasses)
	 * and searches recursively all child controls.
	 * Returns an array of child controls with particualar type
	 * 
	 **/
	findChildControlsByType : function( class_name ){
		var i;
        var j;
      
		var ret = [];
        
		this.ensureChildControls();
		
		for ( i=0; i<this._childControls.length; i++ ){
			var ctrl = this._childControls[i];
            if ( ctrl.isTypeOf( class_name ) ){
                ret.push( ctrl );
            }
			var ctrls = ctrl.findChildControlsByType( class_name );
            for( j=0; j<ctrls.length; j++ ){
                ret.push( ctrls[j] );
            }
		}
		return ret;
	},

	/**
	 * TControl#findChildControlsByKind( class_name ) -> Array[TControl]
	 * - class_name (String): control ID
	 * 
	 * Returns child control by type (including subclassed)
	 * and searches recursively all child controls.
	 * Returns an array of child controls with particualar type
	 * 
	 **/
	findChildControlsByKind : function( class_name ){
		var i;
        var j;
      
		var ret = [];
        
		this.ensureChildControls();
		
		for ( i=0; i<this._childControls.length; i++ ){
			var ctrl = this._childControls[i];
            if ( ctrl.isKindOf( class_name ) ){
                ret.push( ctrl );
            }
			var ctrls = ctrl.findChildControlsByKind( class_name );
            for( j=0; j<ctrls.length; j++ ){
                ret.push( ctrls[j] );
            }
		}
		return ret;
	}

} );