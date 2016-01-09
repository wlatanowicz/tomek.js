//= require Base

/** section: Utilities
 * klass( new_class_name ) -> void
 * klass( new_class_name, class_definition ) -> void
 * klass( new_class_name, extended_class, class_definition ) -> void
 * klass( new_class_name, extended_class, mixin_list, class_definition ) -> void
 * 
 * - new_class_name (String): name of a new class
 * - extended_class (Object): a class to be extended
 * - mixin_list (Array[Object]): list of mixins
 * - class_definition (Object): class body definition
 * 
 * Creates a new class
 * 
 **/
function klass( new_class_name, extended_class, mixin_list, class_definition ){
    
    if ( arguments.length === 1 ){
        extended_class = null;
        mixin_list = [];
        class_definition = {};
    }else
    if ( arguments.length === 2 ){
        class_definition = extended_class;
        extended_class = null;
        mixin_list = [];
    }else
    if ( arguments.length === 3 ){
        class_definition = mixin_list;
        mixin_list = [];
    }

    if ( extended_class === null ){
        extended_class = TObject;
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
    for ( i=0; i<extended_class.parent_klasses.length; i++ ){
        parent_klasses.push( extended_class.parent_klasses[i] );
        for( j=0; j<extended_class.mixins.length; j++ ){
            mixin_names.push( extended_class.mixins[j] );
        }
    }
    parent_klasses.push( extended_class );
    
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

    eval( new_class_name+' = nc;' );
}

/** section: Utilities
 * mixin( new_mixin_name, mixin_definition ) -> void
 * 
 * - new_mixin_name (String): name of a new mixin
 * - mixin_definition (Object): mixin body definition
 * 
 * Creates a new mixin
 * 
 **/
function mixin( new_mixin_name, mixin_definition ){
    var nm = mixin_definition;
    nm.mixin_name = new_mixin_name;
    eval( new_mixin_name+' = nm;' );
}

/** section: Utilities
 * class TObject
 * 
 **/
var TObject = Base.extend( {
    
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
	
},{
    klass_name : 'TObject',
    parent_klasses : [],
    mixins : []
});

TObject.prototype.klass = TObject;
