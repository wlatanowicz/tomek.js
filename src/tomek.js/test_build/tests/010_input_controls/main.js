/** section: Utilities
 * class Base
 * 
 * Base, version 1.0.2
 * 
 * Copyright 2006, Dean Edwards
 * 
 * License: [http://creativecommons.org/licenses/LGPL/2.1/](http://creativecommons.org/licenses/LGPL/2.1/)
 * 
 * [Original source](http://dean.edwards.name/weblog/2006/03/base/)
 * 
 **/

if ( !Base ){
	
var Base = function() {
	if (arguments.length) {
		if (this == window) { // cast an object to this class
			Base.prototype.extend.call(arguments[0], arguments.callee.prototype);
		} else {
			this.extend(arguments[0]);
		}
	}
};

Base.version = "1.0.2";

Base.prototype = {
	extend: function(source, value) {
		var extend = Base.prototype.extend;
		if (arguments.length == 2) {
			var ancestor = this[source];
			// overriding?
			if ((ancestor instanceof Function) && (value instanceof Function) &&
				ancestor.valueOf() != value.valueOf() && /\bbase\b/.test(value)) {
				var method = value;
			//	var _prototype = this.constructor.prototype;
			//	var fromPrototype = !Base._prototyping && _prototype[source] == ancestor;
				value = function() {
					var previous = this.base;
				//	this.base = fromPrototype ? _prototype[source] : ancestor;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function() {
					return method;
				};
				value.toString = function() {
					return String(method);
				};
			}
			return this[source] = value;
		} else if (source) {
			var _prototype = {toSource: null};
			// do the "toString" and other methods manually
			var _protected = ["toString", "valueOf"];
			// if we are prototyping then include the constructor
			if (Base._prototyping) _protected[2] = "constructor";
			var name;
			for (var i = 0; (name = _protected[i]); i++) {
				if (source[name] != _prototype[name]) {
					extend.call(this, name, source[name]);
				}
			}
			// copy each of the source object's properties to this object
			for (var name in source) {
				if (!_prototype[name]) {
					extend.call(this, name, source[name]);
				}
			}
		}
		return this;
	},

	base: function() {
		// call this method from any other method to invoke that method's ancestor
	}
};

Base.extend = function(_instance, _static) {
	var extend = Base.prototype.extend;
	if (!_instance) _instance = {};
	// build the prototype
	Base._prototyping = true;
	var _prototype = new this;
	extend.call(_prototype, _instance);
	var constructor = _prototype.constructor;
	_prototype.constructor = this;
	delete Base._prototyping;
	// create the wrapper for the constructor function
	var klass = function() {
		if (!Base._prototyping) constructor.apply(this, arguments);
		this.constructor = klass;
	};
	klass.prototype = _prototype;
	// build the class interface
	klass.extend = this.extend;
	klass.implement = this.implement;
	klass.toString = function() {
		return String(constructor);
	};
	extend.call(klass, _static);
	// single instance
	var object = constructor ? klass : _prototype;
	// class initialisation
	if (object.init instanceof Function) object.init();
	return object;
};

Base.implement = function(_interface) {
	if (_interface instanceof Function) _interface = _interface.prototype;
	this.prototype.extend(_interface);
};

}

/** section: Utilities
 * klass( new_class_name ) -> void
 * klass( new_class_name, class_definition ) -> void
 * klass( new_class_name, extended_class, class_definition ) -> void
 * klass( new_class_name, extended_class, mixin_list, class_definition ) -> void
 * 
 * - new_class_name (String): name of a new class
 * - extended_class (Object): a class to be extended, defaults to TObject
 * - mixin_list (Array[Object]): list of mixins, defaults to []
 * - class_definition (Object): class body definition, defaults to {}
 * 
 * Creates a new class
 * 
 **/
function klass( new_class_name, extended_class, mixin_list, class_definition ){
    
    if ( arguments.length === 1 ){
        extended_class = TObject;
        mixin_list = [];
        class_definition = {};
    }else
    if ( arguments.length === 2 ){
        class_definition = extended_class;
        extended_class = TObject;
        mixin_list = [];
    }else
    if ( arguments.length === 3 ){
        class_definition = mixin_list;
        mixin_list = [];
    }

    if ( extended_class === null ){
        extended_class = Base;
    }
    
    var mixin_names = [];
    var nc = extended_class;
    var i;
    var j;
    for ( i=0; i<mixin_list.length; i++ ){
        nc = nc.extend( mixin_list[i] );
        mixin_names.push( mixin_list[i].mixin );
    }
    
    var parent_klasses = [];
	if ( extended_class.parent_klasses ){
		for ( i=0; i<extended_class.parent_klasses.length; i++ ){
			parent_klasses.push( extended_class.parent_klasses[i] );
			for( j=0; j<extended_class.mixins.length; j++ ){
				mixin_names.push( extended_class.mixins[j] );
			}
		}
	    parent_klasses.push( extended_class );
	}
    
    class_definition.super = extended_class.prototype;
//    class_definition.parent_klasses = parent_klasses;
//    class_definition.mixins = mixin_names;
    
    var static_definition = {
            klass_name : new_class_name,
            parent_klasses : parent_klasses,
            mixins : mixin_names
    };
    
    nc = nc.extend( class_definition, static_definition );
    
    nc.prototype.klass = nc;

	var namespace = window;
	var name_array = new_class_name.split(".");
	while( name_array.length > 1 ){
		var sub_ns = name_array.shift();
		if ( ! namespace[sub_ns] ){
			namespace[sub_ns] = {};
		}
		namespace = sub_ns;
	}
	namespace[ name_array[0] ] = nc;
}

/** section: Utilities
 * mixin( new_mixin_name, mixin_definition ) -> void
 * 
 * - new_mixin_name (String): name of a new mixin
 * - mixin_definition (Object): mixin body definition, defaults to {}
 * 
 * Creates a new mixin
 * 
 **/
function mixin( new_mixin_name, mixin_definition ){
	if ( arguments.length === 1 ){
		mixin_definition = {};
	}
    var nm = mixin_definition;
    nm.mixin_name = new_mixin_name;
	
	var namespace = window;
	var name_array = new_mixin_name.split(".");
	while( name_array.length > 1 ){
		var sub_ns = name_array.shift();
		if ( ! namespace[sub_ns] ){
			namespace[sub_ns] = {};
		}
		namespace = sub_ns;
	}
	namespace[ name_array[0] ] = nm;
}


/** section: Utilities
 * class TObject
 * 
 **/
klass( 'TObject', null, {
    
    klass : null,
    super : null,
    
	/**
	 *  new TObject([options])
	 *  - options (Hash): hash of properties to be set
	 * 
	 * Default object constructor
	 * 
	 **/
	constructor : function( options ){
		
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
	
	/**
	 * TObject#isTypeOf( klass ) -> Boolean
	 * - klass (Object|String): class or class name
	 * 
	 * Checks if the object is a particular type
	 * 
	 **/
    isTypeOf : function( klass ){
        if ( klass.klass_name ){
            klass = klass.klass_name;
        }
        return this.klass.klass_name === klass;
    },
    
	/** alias of: TObject#isTypeOf
	 * TObject#isMemberOf( klass ) -> Boolean
	 * - klass (Object|String): class or class name
	 * 
	 **/
    isMemberOf : function( klass ){
        return this.isTypeOf( klass );
    },
    
	/**
	 * TObject#isKindOf( klass ) -> Boolean
	 * - klass (Object|String): class or class name
	 * 
	 * Checks if the object is a particular type or
     * a subclass of if
	 * 
	 **/
    isKindOf : function( klass ){
        if ( klass.klass_name ){
            klass = klass.klass_name;
        }
        if ( this.isTypeOf( klass ) ){
            return true;
        }
        var i;
        for( i=0; i<this.klass.parent_klasses.length; i++ ){
            if ( this.klass.parent_klasses[i].klass_name === klass ){
                return true;
            }
        }
        return false;
    },
    
	/**
	 * TObject#includesMixin( mixin ) -> Boolean
	 * - mixin_name (Object|String): mixin or mixin name
	 * 
	 * Checks if the object includes a mixin
	 * 
	 **/
    includesMixin : function( mixin ){
        if ( mixin.mixin_name ){
            mixin = mixin.mixin_name;
        }
        
        var i;
        for( i=0; i<this.mixins.length; i++ ){
            if ( this.mixins[i].mixin_name === mixin ){
                return true;
            }
        }
        return false;
    },
    
	/**
	 * TObject#getPublicProperties() -> Array@String
	 * 
	 * Defines list of public properties
	 * 
	 **/
	getPublicProperties : function(){
		return [];
	},
	
	/**
	 * TObject#registerPublicProperties() -> void
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
	 * TObject#registerPublicProperty( name ) -> void
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
        
        if ( typeof property === 'string' ){
			property = {
					name : property
				};
        }
		
		property.name = property.name;
		if ( typeof property.default == 'undefined' ){
			property.default = null;
		}
		if ( typeof property.type == 'undefined' ){
			// one of: int, integer, float, string, bool, boolean, object
			property.type = 'string';
		}
		if ( typeof property.settype == 'undefined' ){
			// one of: int, integer, float, string, bool, boolean, object
			property.settype = 'none';
		}
		
		this['_'+property.name] = property.default;
		
        var	getFn = null;
        var	setFn = null;
        
        if ( can_get ){
            if ( ! this['get'+property.name] ){
				this.createGetterFunction( property );
			}
            var onGet = this['get'+property.name];
            getFn = function () {
                        return onGet.apply( this );
                    };
        }
        
        if ( can_set ){
            if ( ! this['set'+property.name] ){
				this.createSetterFunction( property );
            }
    		var onSet = this['set'+property.name];
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
				Object.defineProperty( this, property.name, props );
			}catch( ex ){
				// IE8 fix
				// IE8 does not support Object.defineProperty for our objects :(
			}

		// Older Mozilla
		} else if ( this.__defineGetter__ ) {
            if ( getFn ){
    			this.__defineGetter__( property.name, getFn );
            }
            if ( setFn ){
                this.__defineSetter__( property.name, setFn );
            }
		}
		
	},
	
	createSetterFunction : function( property ){
		if ( property.settype === 'none' ){
			this['set'+property.name] = function( value ){
				this['_'+property.name] = value;
			};
		}else
		if ( property.settype === 'string' ){
			this['set'+property.name] = function( value ){
				this['_'+property.name] = value !== null
											&& value !== undefined
											? value.toString()
											: '';
			};
		}else
		if ( property.settype === 'int' || property.settype === 'integer' ){
			this['set'+property.name] = function( value ){
				this['_'+property.name] = parseInt( value );
			};
		}else
		if ( property.settype === 'float' ){
			this['set'+property.name] = function( value ){
				this['_'+property.name] = parseFloat( value );
			};
		}else
		if ( property.settype === 'bool' || property.settype === 'boolean' ){
			this['set'+property.name] = function( value ){
				this['_'+property.name] = parseBool( value.toString() );
			};
		}else
		if ( property.settype === 'object' || property.settype === 'obj' ){
			this['set'+property.name] = function( value ){
				this['_'+property.name] = value !== null
											&& value !== undefined
											? value.valueOf()
											: null;
			};
		}else
		{
			throw new TException( 'Bad setter type conversion: '+property.type );
		}
	},
	
	createGetterFunction : function( property ){
		if ( property.type === 'none' ){
			this['get'+property.name] = function(){
				return this['_'+property.name];
			};
		}else
		if ( property.type === 'string' ){
			this['get'+property.name] = function(){
				return this['_'+property.name] !== null
						&& this['_'+property.name] !== undefined
						? this['_'+property.name].toString()
						: '';
			};
		}else
		if ( property.type === 'int' || property.type === 'integer' ){
			this['get'+property.name] = function(){
				return parseInt( this['_'+property.name] );
			};
		}else
		if ( property.type === 'float' ){
			this['get'+property.name] = function(){
				return parseFloat( this['_'+property.name] );
			};
		}else
		if ( property.type === 'bool' || property.type === 'boolean' ){
			this['get'+property.name] = function(){
				return parseBool( this['_'+property.name] );
			};
		}else
		if ( property.type === 'object' || property.type === 'obj' ){
			this['get'+property.name] = function(){
				return this['_'+property.name] !== null
						&& this['_'+property.name] !== undefined
						? this['_'+property.name].valueOf()
						: null;
			};
		}else
		{
			throw new TException( 'Bad getter type conversion: '+property.type );
		}
	}
	
});



/** section: Utilities
 * class TException
 * 
 **/
klass( 'TException', {
	
	message : null,
	date : null,
	stack : [],
	
	constructor : function( message ){
		this.message = message;
		this.date = new Date();
		
		var err = new Error();
		var stack = err.stack.split("\n");
		this.stack = stack.splice( stack[0] == 'Error' ? 3 : 2 );
	},
	
	getMessage : function(){
		return this.message;
	},
	
	toString : function(){
		return 'TException: '+this.getMessage()+"\n\n<errorDescription>"+this.toJSON()+"</errorDescription>";
	},
	
	toDescriptionObject : function(){
		return { 'klass' : this.klass.klass_name, 'message' : this.getMessage(), stack:this.stack, 'timestamp' : this.date.getTime() };
	},
	
	toJSON : function(){
		return JSON.stringify( this.toDescriptionObject() );
	}
	
});
/** section: Utilities
 * parseBool( v ) -> Boolean
 * - v (Boolean|String|number): a value
 * 
 * Bolean equivalent of parseInt
 * 
 **/
if ( ! window.parseBool ){
	function parseBool( v ){
		return v === true
				|| v == 1
				|| v === 'true';
	}
}

if ( ! Array.prototype.in_array ){
	Array.prototype.in_array = function(p_val) {
		for(var i = 0, l = this.length; i < l; i++) {
			if(this[i] == p_val) {
				return true;
			}
		}
		return false;
	};
}

//fix for Safari
if ( ! String.trim ){
	String.trim = function( str ){
		return str.trim();
	};
}


/** section: Controls
 * class TExpression
 * 
 * Stores an expriession to be rendered
 * 
 **/
klass( 'TExpression', {
	
	/**
	 * TExpression#_expressionFunction -> Function
	 **/
	_expressionFunction : function(){return null},
	
	constructor : function( fun ){
		this._expressionFunction = fun;
	},
	
	valueOf : function(){
		var exp = this._expressionFunction();
		if ( exp == null ){
			return null;
		}
		return exp.valueOf();
	},
	
	toString : function(){
		var exp = this._expressionFunction();
		if ( exp == null ){
			return '!NULL!';
		}
		return exp.toString();
	}
	
});


/** section: Controls
 * class TControl
 * 
 * Base control class
 * handles all common dependency and rendering routines
 * 
 **/
klass( 'TControl', {
	
	/**
	 * TControl#_childControls -> Array@TControl
	 * 
	 * Keeps all direct child controls
	 * 
	 **/
	_childControls : [],
	
	/**
	 * TControl#_childControlsHash -> Hash@TControl
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
	 * TControl#_templateControls -> Hash@TControl
	 * 
	 * Keeps track of controls initialized using XML template
	 * 
	 **/
	_templateControls : {},
	
	/**
	 * TControl#_renderedNodes -> Array@DOMElement
	 * 
	 * Keeps track of rendered DOMElements
	 * that should be removed on rerender
	 * 
	 **/
	_renderedNodes : [],
	
	/**
	 * TControl#_Placeholder -> DOMElement
	 * 
	 * Control is rendered inside this element
	 * 
	 **/
	_Placeholder : null,
	
	/**
	 * TControl#_positionMarker -> DOMElement
	 * 
	 * Keeps position of this control inside _placeholder
	 * 
	 **/
	_positionMarker : null,
	
	/**
	 * TControl#_ignoreTemplate -> Boolean
	 * 
	 * Controls created in template are ignored if true.
	 * 
	 **/
	_ignoreTemplate : false,
	
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
		this._isRendered = false;
		this._childControlsHash = {};
		this._childControlsCreated = false;
		this._positionMarker = null;
		this._templateControls = {};
		
		this.base( options );
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
	 * TControl#getPublicProperties() -> Array@String
	 * 
	 * Defines list of public properties
	 * 
	 **/
	getPublicProperties : function(){
		return ['ID',
				'Id',
				{ name: 'Placeholder', type: 'object' },
				{ name: 'Parent', type: 'object' },
				{ name: 'CustomData', type: 'object' },
				{ name: 'Visible', type: 'bool', default: true }
				];
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
		for ( i=0; i<this._renderedNodes.length; i++ ){
			var n = this._renderedNodes[ i ];
			if ( n.parentNode ){
				n.parentNode.removeChild(n);
			}
		}
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
			this.preCreateChildControls();
			this.createChildControls();
			this._childControlsCreated = true;
			this.postCreateChildControls();
		}
	},
	
	/**
	 * TControl#preCreateChildControls() -> void
	 * 
	 * @TODO
	 * 
	 **/
	preCreateChildControls : function(){
		
	},
	
	/**
	 * TControl#postCreateChildControls() -> void
	 * 
	 * @TODO
	 * 
	 **/
	postCreateChildControls : function(){
		
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
		
		if ( this.getParent()
				&& this.getParent()._isRendered === false ){
			
			this.getParent().render();
			
		}else{
			
			this.ensureChildControls();
			this.removeRenderedNodes();
			this.ensurePositionMarker();
			this.preRender();
			this._isRendered = true;
			
			if ( this.getVisible() ){
				this.renderContents();
			}
			this.postRender();
			
		}
		
	},
	
	/**
	 * TControl#preRender() -> void
	 * 
	 * @TODO
	 * 
	 **/
	preRender : function(){
		
	},
	
	/**
	 * TControl#postRender() -> void
	 * 
	 * @TODO
	 * 
	 **/
	postRender : function(){
		
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
		this.render();
	},
	
	/**
	 * TControl#renderContents() -> void
	 * 
	 * Renders contents of control.
	 * Decides where to put child controls and runs renderChildControls();
	 * In most cases child controls are rendered in 'this'. This may be changed to
	 * a nested HTML element for controls like TWebControl.
	 * Should not be called directly. Should be called only from render().
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
	 * Render occurs in a specified placeholder. In most cases placeholder is the same as 'this'.
	 * In some cases (i.e. TWebControl) it may be a nested element.
	 * Should not be called directly. Should be called only from renderContents().
	 * 
	 **/
	renderChildControls : function( placeholder ){
		if ( !this._ignoreTemplate && this.renderTemplateChildControls ){
			this.renderTemplateChildControls( placeholder );
		}else{
			this.renderStandardChildControls( placeholder );
		}
	},

	/**
	 * TControl#renderTemplateChildControls( placeholder ) -> void
	 * - placeholder (DOMElement): a placeholder
	 * 
	 * Renders contents of child controls as defined in template.
	 * Method is created by compiler.
	 * 
	 * Should not be called directly.
	 * 
	 **/
	renderTemplateChildControls : null,
	
	/**
	 * TControl#renderStandardChildControls( placeholder ) -> void
	 * - placeholder (DOMElement): a placeholder
	 * 
	 * Renders contents of all child controls - one by one.
	 * Should not be called directly.
	 * 
	 **/
	renderStandardChildControls : function( placeholder ){
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
		this._renderedNodes.push( el );
		this.ensurePositionMarker();
		this._positionMarker.parentNode.insertBefore( el, this._positionMarker );
	},
	
	/**
	 * TControl#ensurePositionMarker() -> void
	 * 
	 * Ensures position marker exists.
	 * 
	 **/
	ensurePositionMarker : function(){
		var root = this._Placeholder
						? this._Placeholder
						: this.getParent()
							? this.getParent()
							: this.getPlaceholder();
		
		var markerNeedsRepositioning = false;
		
		if ( this._positionMarker === null ){
			
			if ( /**DEBUG_MARKER_ON**/ false ){
				/* debug, visible place holder: */
				var label = 'Marker for <'+this.klass.klass_name+'> ID=' + ( this.getID() ? this.getID() : '(none)' );
				this._positionMarker = document.createElement( "span" );
				this._positionMarker.appendChild( document.createTextNode( "⦿" ) );
				this._positionMarker.style.color = 'red';
				this._positionMarker.style.cursor = 'pointer';
				this._positionMarker.title = label;
			}else{
				/* normal place holder: */
				this._positionMarker = document.createComment( "-" );
			}
			
			this._positionMarker.positionMarkerForControl = this;
			this._positionMarker.parentControl = null;
			
			markerNeedsRepositioning = true;
			
		}
		
		if ( this._positionMarker.parentNode == null
			|| this._positionMarker.parentControl != root ){
			markerNeedsRepositioning = true;
		}
		
		if ( markerNeedsRepositioning ){
			this._positionMarker.parentControl = root;
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
			if ( this._positionMarker.parentNode ){
				this._positionMarker.parentNode.removeChild( this._positionMarker );
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
	 * TControl#findChildControlsByType( class_name ) -> Array@TControl
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
	 * TControl#findChildControlsByKind( class_name ) -> Array@TControl
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
	},

	/**
	 * TControl#findChildControlsByID( id ) -> Array@TControl
	 * - id (String): control ID
	 * 
	 * Returns array of child controls by ID
	 * and searches recursively all child controls.
	 * Returns child controls with particualar ID if found or empty array not found
	 * 
	 **/
	findChildControlsByID : function( id ){
		var i;
		var ret = [];
		
		this.ensureChildControls();
		
		if( this._childControlsHash[ id ]
			&& this._childControlsHash[ id ].getID() == id ){
			ret.push( this._childControlsHash[ id ] );
		}
		for ( i=0; i<this._childControls.length; i++ ){
			var ctrls = this._childControls[i].findChildControlsByID( id );
			var j;
			for ( j=0; j<ctrls.length; j++ ){
				ret.push( ctrls[j] );
			}
		}
		return ret;
	}

} );

TControl.prototype.$ = TControl.prototype.findChildControlByID;
TControl.prototype.$$ = TControl.prototype.findChildControlsByID;
TControl.prototype.$$type = TControl.prototype.findChildControlsByType;
TControl.prototype.$$kind = TControl.prototype.findChildControlsByKind;
TControl.prototype.setId = TControl.prototype.setID;
TControl.prototype.getId = TControl.prototype.getID;



/** section: Controls
 * class TContent < TControl
 * 
 * Dummy control designed as container
 * Should be be used as root control in templates
 * 
 **/
klass( 'TContent', TControl, {
	
});


/** section: WebControls
 * class TWebControl < TControl
 * 
 * Control dedicated to render single DOMElements
 * designed to be extended
 * 
 **/
klass( 'TWebControl', TControl, {

	/**
	 * TWebControl#_tagName -> String
	 * 
	 * DOMElement tag name
	 * 
	 **/
	_tagName : 'span',
	
	/**
	 * TWebControl#_rendersChildControls -> Boolean
	 * 
	 * True if there are child controls to render
	 * Should be true for all containers like paragraphs
	 * and false for controls like buttons
	 * 
	 **/
	_rendersChildControls : true,

	/**
	 * TWebControl#_renderedMainElement -> DOMElement
	 * 
	 * Keeps track of rendered control's root DOMElement
	 * 
	 **/
	_renderedMainElement : null,
	
	/**
	 * TWebControl#_renderedContentPlaceholder -> DOMElement
	 * 
	 * Placeholder for child elements. In most cases null which means that TWebControl#_renderedMainElement is used instead.
	 * 
	 **/
	_renderedContentPlaceholder : null,
	
	/**
	 * TWebControl#Attributes -> Hash@String
	 * 
	 * Stores additional HTML atributes to render
	 * 
	 **/
	
	/**
	 * TWebControl#CssClass -> String
	 * 
	 * CSS class of html tag
	 * 
	 **/
	
	/**
	 * TWebControl#HtmlID -> String
	 * 
	 * id of html tag
	 * 
	 **/
	
	getDefaultAttributes : function(){
		return {};
	},
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'CssClass', default: '', elementProperty: 'className' },
					{ name:'Style', default: {}, elementProperty: 'style', fetchFromElement: false, type: 'object' },
					{ name:'HtmlID', default: '', elementProperty: 'id' },
					{ name:'Attributes', type: 'none', default: this.getDefaultAttributes() },
					{ name:'Element', type: 'object' } );
		return arr;
	},
	
	constructor : function( options ){
		this._Style = {};
		this._renderedMainElement = null;
		this._renderedContentPlaceholder = null;
		this._rendersChildControls = true;
		this.base( options );
	},
	
	propFix : function( prop ){
		switch( prop ){
			case 'htmlFor': return 'for';
			case 'className' : return 'class';
		}
		return prop;
	},
	
	addCssClass : function( cls ){
		if ( ! this.hasCssClass( cls ) ){
			var classes = this.getCssClass();
			classes = (classes.length > 0) ? (classes+' '+cls) : cls;
			this.setCssClass(  classes );
		}
	},
	
	removeCssClass : function( cls ){
		var classes = this.getCssClass().split( ' ' );
		var new_classes = [];
		for ( var i=0; i<classes.length; i++ ){
			if ( classes[i] && classes[i] != cls ){
				new_classes.push( classes[i] );
			}
		}
		this.setCssClass( new_classes.join( ' ' ) );
	},
	
	hasCssClass : function( cls ){
		var classes = this.getCssClass().split( ' ' );
		for ( var i=0; i<classes.length; i++ ){
			if ( classes[i] && classes[i] == cls ){
				return true;
			}
		}
		return false;
	},
	
	setStyle : function( style ){
		var oldStyle = this._Style;
		this._Style = style;
		if ( this._renderedMainElement ){
			for ( var k in this._Style ){
				this._renderedMainElement.style[k] = this._Style[k];
			}
			for ( var k in oldStyle ){
				if ( this._Style[k] === undefined ){
					this._renderedMainElement.style[k] = "";
				}
			}
		}
	},
	
	ensureHtmlID : function(){
		if ( this._HtmlID == null
				|| this._HtmlID.length <= 0 ){
			if ( ! TWebControl.num ){
				TWebControl.num = 1;
			}
			if ( ! TWebControl.id_prefix ){
				TWebControl.id_prefix = 'tom_';
			}
			this.setHtmlID( TWebControl.id_prefix+(TWebControl.num++) );
		}
	},
	
    /**
	 * TWebControl#Element -> DOMElement
     * 
     **/
    getElement : function(){
        return this._renderedMainElement;
    },
    
	/**
	 * TWebControl#createMainElement() -> DOMElement
	 * 
	 * Creates control's root DOMElement.
	 * In most cases should be overloaded.
	 * 
	 **/
	createMainElement : function(){
		var d = document.createElement( this._tagName );
		
		var props = this.getPublicProperties();
		var i;
		for ( i=0; i<props.length; i++ ){
			if ( typeof( props[i] ) != 'string'
					&& typeof( props[i].elementProperty ) == 'string' ){
				
				var value = this['get'+props[i].name]();
                this.setAttribute( d, props[i], value );	
				
			}
		}
		
		for ( var k in this._Style ){
			d.style[k] = this._Style[k];
		}
			
		var attrs = this.getAttributes();
		
		for ( var attr in attrs ){
			if ( attr === 'style' ){
				//IE8 fix
				d.style.cssText = attrs[attr];
			}else{
				d.setAttribute( attr, attrs[attr] );
			}
		}
				
		return d;
	},

	appendMainElement : function( el ){
		this._renderedNodes.push( el );
		this.ensurePositionMarker();
		this._positionMarker.parentNode.insertBefore( el, this._positionMarker );
	},
	
	appendChild : function( el ){
		this._renderedMainElement.appendChild( el );
	},
	
	//@Override
	renderContents : function(){
		this._renderedContentPlaceholder = null;
		this._renderedMainElement = this.createMainElement();
		this._renderedMainElement.TomekControlObject = this;
		if ( this._rendersChildControls ){
			this.renderChildControls( this._renderedContentPlaceholder || this._renderedMainElement );
		}
		this.appendMainElement( this._renderedMainElement );
	},
	
	setAttribute : function( el, property, value ){
		if ( value ){
			el[ property.elementProperty ] = value;
		}else{
			el[ property.elementProperty ] = value;
			el.removeAttribute( this.propFix( property.elementProperty ) );
		}
	},
	
	getAttribute : function( el, property ){
		return el[ property.elementProperty ];
	},
	
	removeRenderedNodes : function(){
		this.removeMainElement();
		this.base();
	},
	
	removeMainElement : function(){
		var el = this._renderedMainElement;
		this._renderedMainElement = null;
		
		if ( el ){
			var props = this.getPublicProperties();
			var i;
			for ( i=0; i<props.length; i++ ){
				if ( typeof( props[i] ) != 'string'
						&& typeof( props[i].elementProperty ) == 'string'
						&& props[i].fetchFromElement ){

					this['set'+props[i].name]( this.getAttribute( el, props[i] ) );

				}
			}
		}
	},
	
	//@Override
	createSetterFunction : function( property ){
		if ( typeof ( property.elementProperty ) == 'undefined' ){
			this.base( property );
		}else{
			if ( property.settype === 'none' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = value;
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			if ( property.settype === 'string' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = value !== null && typeof( value ) != 'undefined' ? value.toString() : '';
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			if ( property.settype === 'int' || property.settype === 'integer' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = parseInt( value );
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			if ( property.settype === 'float' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = parseFloat( value );
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			if ( property.settype === 'bool' || property.settype === 'boolean' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = parseBool( value.toString() );
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			if ( property.settype === 'object' || property.settype === 'obj' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = value !== null && typeof( value ) != 'undefined' ? value.valueOf() : null;
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			{
				throw new TException( 'Bad setter type conversion: '+property.type );
			}
		}
	},
	
	//@Override
	createGetterFunction : function( property ){
		if ( typeof ( property.elementProperty ) == 'undefined' ){
			this.base( property );
		}else{
			if ( property.type === 'none' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return this['_'+property.name];
				};
			}else
			if ( property.type === 'string' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return this['_'+property.name] !== null && typeof ( this['_'+property.name] ) != 'undefined' ? this['_'+property.name].toString() : '';
				};
			}else
			if ( property.type === 'int' || property.type === 'integer' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return parseInt( this['_'+property.name] );
				};
			}else
			if ( property.type === 'float' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return parseFloat( this['_'+property.name] );
				};
			}else
			if ( property.type === 'bool' || property.type === 'boolean' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return parseBool( this['_'+property.name] );
				};
			}else
			if ( property.type === 'object' || property.type === 'obj' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return this['_'+property.name] !== null && typeof ( this['_'+property.name] ) != 'undefined' ? this['_'+property.name].valueOf() : null;
				};
			}else
			{
				throw new TException( 'Bad getter type conversion: '+property.type );
			}
		}
	}

});
/** section: Controls
 * mixin TEventResponderMixin
 * 
 * Mixin adding ability to handle events
 * 
 **/
mixin( 'TEventResponderMixin', {
	
	/**
	 * TEventResponderMixin#_triggersEvents -> Array@String
	 *
	 * List of events triggered by the control
	 * 
	 **/
	_triggersEvents : [],
	
	/**
	 * TEventResponderMixin#_eventResponders -> Hash@Array@Function
	 * 
	 * Keeps track of attached responder functions
	 * 
	 **/
	_eventResponders : {},
	
	/**
	 * TEventResponderMixin#_triggerElements -> Array@EventTrigger
	 * 
	 * Keeps track of DOMElements, DOMEevents and triggered events
	 * 
	 **/
	_triggerElements : [], 
	
	//@Override
	constructor : function( options ){
		this._eventResponders = {};
		this._triggerElements = []; 
		this.base( options );
	},
	
	/**
	 * TEventResponderMixin#triggersEvent( e ) -> Boolean
	 * - e (String): event name
	 * 
	 * Checks if the control triggers particular event
	 * 
	 **/
	triggersEvent : function( e ){
		return this._triggersEvents.indexOf( e ) >= 0
				? true
				: false;
	},
	
	/**
	 * TEventResponderMixin#respondsToEvent( e ) -> Boolean
	 * - e (String): event name
	 * 
	 * Checks if the control responds to particular event
	 * which means it triggers it and has a responder
	 * function attached
	 * 
	 **/
	respondsToEvent : function( e ){
		return this.triggersEvent( e )
				&& this._eventResponders[e]
				&& this._eventResponders[e].length > 0
				? true
				: false;
	},
	
	/**
	 * TEventResponderMixin#triggerEvent( e[, param] ) -> void
	 * - e (String): event name
	 * - param (EventParameter): event parameter
	 * 
	 * Triggers event
	 * and calls attached event responder functions
	 * 
	 **/
	triggerEvent : function( e, param ){
		var results = [];
		if ( this._eventResponders[e] ){
			for ( var i=0; i<this._eventResponders[e].length; i++ ){
				results.push( this._eventResponders[e][i]( this, param ) );
			}
		}
		return results;
	},
	
	/**
	 * TEventResponderMixin#triggerEventFromElement( e, dom_event ) -> void
	 * - e (String): event name
	 * - prevent_default (Boolean): will prevent deafult browser event if true
	 * - dom_event (DOMEvent): dom event
	 * 
	 * Serves as dom event listener and triggers proper event.
	 * Should not be called directly.
	 * 
	 **/
	triggerEventFromElement : function( e, prevent_default, dom_event ){
		if ( prevent_default ){
			dom_event.preventDefault();
		}
		var param = {
				'event' : e,
				'domEvent' : dom_event || window.event
			};
		return this.triggerEvent( e, param );
	},
	
	/**
	 * TEventResponderMixin#attachEvent( e, fun ) -> void
	 * - e (String): event name
	 * - fun (Function): event responder function. Should accept two parameters: a sender - triggering control and a param - stuff that control would like to tell you about the event.
	 * 
	 * Attaches event responder function
	 * 
	 **/
	attachEvent : function( e, fun ){
		
		if ( ! this.triggersEvent( e ) ){
			throw new TException( 'Control does not trigger event '+e );
		}
		
		if ( ! this._eventResponders[e] ){
			this._eventResponders[e] = [];
		}
		this._eventResponders[e].push( fun );
		
		for ( var e_rec_idx in this._triggerElements ){
			var e_rec = this._triggerElements[e_rec_idx];
			if ( e_rec.event == e ){
				this.addEventListener( e_rec.element, e_rec.domEvent, e_rec.boundFunction );
			}
		}
	},
	
	/**
	 * TEventResponderMixin#dettachEvent( e [, fun] ) -> void
	 * - e (String): event name
	 * - fun (Function): event responder function
	 * 
	 * Removes event responder function or all responder function if no one given
	 * 
	 **/
	dettachEvent : function( e, fun ){
		if ( ! fun ){
			this._eventResponders[e] = [];
		}else{
			var new_list = [];
			for ( var f in this._eventResponders[e] ){
				if ( f != fun ){
					new_list.push( f );
				}
			}
			this._eventResponders[e] = new_list;
		}
		
		if ( ! this.respondsToEvent( e ) ){
			for ( var e_rec_idx in this._triggerElements ){
				var e_rec = this._triggerElements[e_rec_idx];
				if ( e_rec.event == e ){
					this.removeEventListener( e_rec.element, e_rec.domEvent, e_rec.boundFunction );
				}
			}
		}
		
	},
	
	/**
	 * TEventResponderMixin#addEventListener( event_rec ) -> void
	 * - element (DOMElement): element
	 * - domEvent (String): name of HTML event
	 * - boundFunction (Function): a function
	 * 
	 * Attaches event listener to trigger DOMElement
	 * 
	 **/
	addEventListener : function( element, domEvent, boundFunction ){
		if ( element.addEventListener ){
			element.addEventListener( domEvent, boundFunction );
		}else
		if ( element.attachEvent ){
			//IE8 fix
			element.attachEvent( "on"+domEvent, boundFunction );
		}
	},
	
	/**
	 * TEventResponderMixin#removeEventListener( event_rec ) -> void
	 * - element (DOMElement): element
	 * - domEvent (String): name of HTML event
	 * - boundFunction (Function): a function
	 * 
	 * Removes event listener from trigger DOMElement
	 * 
	 **/
	removeEventListener : function( element, domEvent, boundFunction ){
		if ( element.removeEventListener ){
			element.removeEventListener( domEvent, boundFunction );
		}else
		if ( element.detachEvent ){
			//IE8 fix
			element.detachEvent( "on"+domEvent, boundFunction );
		}
	},
	
	/**
	 * TEventResponderMixin#registerTriggerElement( el, dom_event, tomek_event ) -> void
	 * - el (DOMElement): element to attach listener to
	 * - dom_event (String): DOMEvent name
	 * - tomek_event (String): event name
	 * - prevent_default (Boolean): will prevent deafult browser event if true (optional)
	 * 
	 * Registers DOMElement to trigger event on particular DOMEvent
	 * 
	 **/
	registerTriggerElement : function( el, dom_event, tomek_event, prevent_default ){
		var e = {
			'element' : el,
			'domEvent' : dom_event,
			'event' : tomek_event,
			'boundFunction' : this.triggerEventFromElement.bind( this, tomek_event, prevent_default )
		};
		this._triggerElements.push( e );
		if ( this.respondsToEvent( tomek_event ) ){
			this.addEventListener( e.element, e.domEvent, e.boundFunction );
		}
	}
	
});

/** section: Utilities
 * class EventTrigger
 *
 **/

/**
 * EventTrigger.element -> DOMElement
 **/

/**
 * EventTrigger.domEvent -> String
 **/

/**
 * EventTrigger.event -> String
 **/

/**
 * EventTrigger.boundFunction -> Function
 **/


/** section: Utilities
 * class EventParameter
 *
 **/

/**
 * EventParameter.domEvent -> DOMEvent
 **/

/**
 * EventParameter.event -> String
 **/

/** section: WebControls_ValidationControls
 * mixin TValidatableMixin
 * 
 * Mixin adding ability to be validated
 * 
 **/
mixin( 'TValidatableMixin', {
	
	_controlIsValidatable : true,// && (this.getValue ? true : false),
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'ErrorCssClass',
					{ name: 'IsValid', type: 'bool' }
				);
		return arr;
	},
	
	setIsValid : function( v ){
		this._IsValid = parseBool( v );
	},
	
	getIsValid : function(){
		return this._IsValid;
	}
	
});
/** section: Controls
 * class TTwoWayBindingModel < TObject
 * 
 * 
 **/
klass( 'TTwoWayBindingModel', {
	
	_object : null,
	_property : null,
	
	constructor: function( object, property ){
		this._object = object;
		this._property = property;
	},
	
	getObject : function(){
		return this._object;
	},
	
	setValue : function( value ){
		this._object[ this._property ] = value;
	},
	
	getValue : function(){
		return this._object[ this._property ];
	}
	
} );

/** section: Controls
 * mixin TTwoWayBindingMixin
 * 
 **/
mixin( 'TTwoWayBindingMixin', {
	
	_syncTriggerEvents : ['Change'],
	_syncControlProperty : 'Value',
	
	_syncEventsAttached : false,
	_Model : null,
	
	constructor : function(options){
		this._syncEventsAttached = false;
		this._Model = null;
		this.base(options);
	},
	
	setModel : function( model_object ){
		this._Model = model_object;
		this.attachSyncFormToModelEvents();
		this.attachModelToFormEvent();
		this.syncModelToForm();
	},
	
	getModel : function(){
		return this._Model;
	},
	
	attachSyncFormToModelEvents : function(){
		if ( ! this._syncEventsAttached ){
			for( var i=0; i< this._syncTriggerEvents.length; i++ ){
				this.attachEvent( this._syncTriggerEvents[i], this.syncFormToModel.bind( this ) );
			}
			this._syncEventsAttached = true;
		}
	},
	
	attachModelToFormEvent : function(){
		if ( Object.observe ){
			Object.observe( this.getModel().getObject(), this.syncModelToForm.bind( this ) );
		}else{
			console.log( 'Object.observe not found. Model-to-form binding will not work.' );
		}
	},
	
	syncFormToModel : function(){
		this.getModel().setValue( this[ 'get'+this._syncControlProperty ]() );
	},
	
	syncModelToForm : function(){
		this[ 'set'+this._syncControlProperty ]( this.getModel().getValue() );
	}
	
});

/** section: WebControls_FormControls
 * class TTextBox < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a text input
 * 
 * ##### Triggered events
 * 
 * `on:Change`
 * `on:KeyUp`
 * `on:KeyDown`
 * `on:Blur`
 * `on:Focus`
 * 
 **/
klass( 'TTextBox', TWebControl, [ TEventResponderMixin, TValidatableMixin, TTwoWayBindingMixin ], {
	
	//@Override
	_tagName : 'input',
	
	_singleLineTagName : 'input',
	_multiLineTagName : 'textarea',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Change','KeyUp','KeyDown','Blur','Focus'],
	
	_syncTriggerEvents : ['Change','KeyUp'],
	
	_syncControlProperty : 'Text',
	
	getValue : function(){
		return this.getText();
	},
	
	setValue : function( v ){
		this.setText( v );
	},
	
	/**
	 * TTextBox#Text -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'Text', elementProperty: 'value', fetchFromElement: true },
					'Value',
					{ name: 'Rows', type: 'int', default: 1 },
					{ name: 'Cols', type: 'int', default: 0 },
					{ name:'Disabled', type:'bool', elementProperty:'disabled' },
					{ name:'Type', elementProperty:'type', default: 'text' }
		);
		return arr;
	},

	//@Override
	createMainElement : function(){
		
		var rows = this.getRows();
		var cols = this.getCols();
		
		if ( rows > 1 ){
			this._tagName = this._multiLineTagName;
		}else{
			this._tagName = this._singleLineTagName;
		}
		
		var d = this.base();
		
		if ( rows > 1 ){
			if ( cols > 0 ){
				d.cols = cols;
			}
			d.rows = rows;
			d.removeAttribute( 'type' );
		}else{
			if ( cols > 0 ){
				d.size = cols;
			}
		}
		
		this.registerTriggerElement( d, 'change', 'Change' );
		this.registerTriggerElement( d, 'keyup', 'KeyUp' );
		this.registerTriggerElement( d, 'keydown', 'KeyDown' );
		this.registerTriggerElement( d, 'blur', 'Blur' );
		this.registerTriggerElement( d, 'focus', 'Focus' );
		
		return d;
	}
	
});





/** section: WebControls_FormControls
 * class TCheckBox < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a checkbox input
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * `on:Change`
 * 
 **/
klass( 'TCheckBox', TWebControl, [ TEventResponderMixin, TValidatableMixin, TTwoWayBindingMixin ], {
	
	//@Override
	_tagName : 'input',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Click','Change'],
	
	//@Override
	getDefaultAttributes : function(){
		return { type: 'checkbox' };
	},
	
	_syncTriggerEvents : ['Change'],
	
	_syncControlProperty : 'Checked',
	
	/**
	 * TCheckBox#Checked -> Boolean
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 
					{ name: 'Checked', type: 'bool', elementProperty: 'checked', fetchFromElement: true },
					{ name:'Disabled', type:'bool', elementProperty:'disabled' },
					{ name: 'Value', type:'bool' }
				);
		return arr;
	},

	getValue : function(){
		return this.getChecked();
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		this.registerTriggerElement( d, 'click', 'Click' );
		this.registerTriggerElement( d, 'change', 'Change' );
		
		return d;
	}
	
});





/** section: WebControls_FormControls
 * class TOption < TWebControl
 * 
 * Control renders an option for select
 * 
 **/
klass( 'TOption', TWebControl, {

	//@Override
	_tagName : 'option',
	
	//@Override
	_rendersChildControls : true,

	/**
	 * TOption#Text -> String
	 **/
	
	/**
	 * TOption#Value -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'Text', 
					{ name: 'Value', elementProperty: 'value' },
					{ name: 'Selected', 'type': 'bool', elementProperty: 'selected', fetchFromElement: true },
					{ name:'Disabled', type:'bool', elementProperty:'disabled' }
				);
		return arr;
	},
	
	//@Override
	createMainElement : function(){
		var d = this.base();
		
		if ( this.getText() ){
			var t = document.createTextNode( this.getText() );
			d.appendChild( t );
		}
		
		return d;
	}

});


/** section: WebControls_FormControls
 * class TDropDownList <  TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a select
 * 
 * ##### Triggered events
 * 
 * `on:Change`
 * 
 **/
klass( 'TDropDownList', TWebControl, [ TEventResponderMixin, TValidatableMixin, TTwoWayBindingMixin ], {
	
	//@Override
	_tagName : 'select',
	
	//@Override
	_rendersChildControls : true,
	
	//@Override
	_triggersEvents : ['Change'],
	
	_syncTriggerEvents : ['Change'],
	
	_syncControlProperty : 'SelectedValue',
	
	_ValueToSet : null,
	
	constructor : function( options ){
		this._ValueToSet = null;
		this.base( options );
	},
	
	/**
	 * TDropDownList#DataSource -> Array
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'Value',
					'SelectedValue',
					{ name: 'Options' },
					{ name: 'SelectedIndex', type: 'integer', default: 0, elementProperty: 'selectedIndex', fetchFromElement: true },
					{ name: 'DataSource', type:'object', default: [] },
					{ name: 'TextFieldName', default: 'text' },
					{ name: 'ValueFieldName', default: 'value' },
					{ name: 'DisabledFieldName', default: null },
					{ name: 'Disabled', type:'bool', elementProperty:'disabled' }
					);
		return arr;
	},
	
	setValue : function( v ){
		this.setSelectedValue( v );
	},
	
	getValue : function(){
		return this.getSelectedValue();
	},
	
	setSelectedValue : function( v ){
		var index_to_set = -1;
		var j;
		for ( j=0; j<this.getOptions().length; j++ ){
			var i = this.getOptions()[j];
			if ( i.getValue() == v.toString() ){
				index_to_set = j;
			}
		}
		if ( index_to_set >= 0 ){
			this.setSelectedIndex( index_to_set );
		}else{
			this._ValueToSet = v;
		}
	},
	
	getSelectedValue : function(){
		if ( this._ValueToSet !== null ){
			return this._ValueToSet.toString();
		}
		var idx = this.getSelectedIndex();
		if ( this.getOptions()[ idx ] && this.getOptions()[ idx ].getValue ){
			return this.getOptions()[ idx ].getValue();
		}else{
			return null;
		}
	},
	
	setSelectedIndex : function( value ){
		this._ValueToSet = null;
		this['_SelectedIndex'] = parseInt( value );
		if ( this._renderedMainElement ){
			this.setAttribute( this._renderedMainElement, { elementProperty: 'selectedIndex' }, this['_SelectedIndex'] );
		}
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		this.registerTriggerElement( d, 'change', 'Change' );
		
		return d;
	},
	
	setDataSource : function( ds ){
		this._DataSource = ds;
		
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[i].destroy();
		}

		this.removeRenderedNodes();
		
		this._childControlsCreated = false;
		this._childControls = [];
		this._childControlsHash = {};
	},
	
	/**
	 * TDropDownList#createChildControls() -> void
	 * 
	 * Creates child controls based on contents of DataSource
	 * 
	 **/
	//@Override
	createChildControls : function(){
		var data_source = this.getDataSource();
		for( var i =0; i<data_source.length; i++ ){
			var data_item = data_source[i];
			var opt = new TOption();
			opt.setText( data_item[ this.getTextFieldName() ] );
			opt.setValue( data_item[ this.getValueFieldName() ] );
			if ( this.getDisabledFieldName() ){
				opt.setDisabled( data_item[ this.getDisabledFieldName() ] );			
			}
			this.addChildControl( opt );
		}
	},
	
	preRender : function(){
		var selected_index = this.getSelectedIndex();
		var somethingSelected = false;
		var options = this.$$kind( 'TOption' );
		for( var i=0; i<options.length && !somethingSelected; i++ ){
			var selected = false;
			
			if ( ! somethingSelected ){
				
				if ( this._ValueToSet !== null
						&& this._ValueToSet.toString() == options[i].getValue() ){
					selected = true;
					this._SelectedIndex = i;
				}else
				if ( this._ValueToSet === null
						&& selected_index === i ){
					selected = true;
				}
				
				if ( selected ){
					options[i].setSelected( true );
				}

				somethingSelected = selected || somethingSelected;
			}
			
		}
		
	},
	
	getOptions: function(){
		return this.findChildControlsByKind( TOption );
	},
	
	renderContents : function(){
		var si = this.getSelectedIndex();
		this.base();
		this.setSelectedIndex( si );
	}

});




/** section: Controls
 * class TTemplateControl < TControl
 * 
 * Control which createChildControls() function
 * is generated by template compiler
 * 
 **/
klass( 'TTemplateControl', TControl, {

	//@Override
	createChildControls : function(){
		throw new TException( 'Template not loaded' );
	}
		
} );

klass( 'TTestControl010', TTemplateControl, {	
	
} );


TTestControl010.prototype.createChildControls = function(){
	var ExpressionContext = this;
	var SourceTemplateControl = this;
	var c96 = new TContent( [] );
	this.addTemplateChildControl( "c96", c96 );
	c96.renderTemplateChildControls = function( placeholder ){
		this._templateControls["c97"].renderContentsInPlaceholder( placeholder );
	};
	var c97 = new TContent( [] );
	c96.addTemplateChildControl( "c97", c97 );
	c97.renderTemplateChildControls = function( placeholder ){
		this._templateControls["c98"].renderContentsInPlaceholder( placeholder );
		this._templateControls["c99"].renderContentsInPlaceholder( placeholder );
		this._templateControls["c100"].renderContentsInPlaceholder( placeholder );
	};
	var c98 = new TTextBox( [] );
	c97.addTemplateChildControl( "c98", c98 );
	var c99 = new TCheckBox( [] );
	c97.addTemplateChildControl( "c99", c99 );
	var c100 = new TDropDownList( [] );
	c97.addTemplateChildControl( "c100", c100 );
	c100.renderTemplateChildControls = function( placeholder ){
		this._templateControls["c101"].renderContentsInPlaceholder( placeholder );
		this._templateControls["c102"].renderContentsInPlaceholder( placeholder );
		this._templateControls["c103"].renderContentsInPlaceholder( placeholder );
	};
	var c101 = new TOption(  {
					"Value" : "a"
					}  );
	c100.addTemplateChildControl( "c101", c101 );
	c101.renderTemplateChildControls = function( placeholder ){
		var t_c104 = document.createTextNode( "opt 1" );
		placeholder.appendChild( t_c104 );
	};
	var c102 = new TOption(  {
					"Value" : "b"
					}  );
	c100.addTemplateChildControl( "c102", c102 );
	c102.renderTemplateChildControls = function( placeholder ){
		var t_c105 = document.createTextNode( "opt 2" );
		placeholder.appendChild( t_c105 );
	};
	var c103 = new TOption(  {
					"Value" : "c"
					}  );
	c100.addTemplateChildControl( "c103", c103 );
	c103.renderTemplateChildControls = function( placeholder ){
		var t_c106 = document.createTextNode( "opt 3" );
		placeholder.appendChild( t_c106 );
	};
};

