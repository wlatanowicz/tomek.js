import TException from "@framework/TException";

/** section: Utilities
 * class TObject
 * 
 **/
export default class TObject
{
    
    klass = null;
    mixins = [];

    converters = {
    	"none": function (value: any): any {
			return value;
		},
    	"string": function(value: any): string {
			return value !== null && value !== undefined
					? value.toString()
					: '';
		},
		"boolean": function(value: any): boolean {
			return value === true
				|| value == 1
				|| value === 'true';
		},
		"int": function(value: any): number {
			return parseInt(value);
		},
		"float": function (value: any): number {
			return parseFloat(value);
		},
		"object": function(value: any): any {
			return value !== null && value !== undefined
				? value.valueOf()
				: null;
    	}
	};

	/**
	 *  new TObject([options])
	 *  - options (Hash): hash of properties to be set
	 * 
	 * Default object constructor
	 * 
	 **/
	constructor( options ){
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
					this[opt] = options[ opt ];
				}
			}
		}
	}
	
	/**
	 * TObject#isTypeOf( klass ) -> Boolean
	 * - klass (Object|String): class or class name
	 * 
	 * Checks if the object is a particular type
	 * 
	 **/
    isTypeOf( klass ){
		return this instanceof klass;
    }
    
	/** alias of: TObject#isTypeOf
	 * TObject#isMemberOf( klass ) -> Boolean
	 * - klass (Object|String): class or class name
	 * 
	 **/
    isMemberOf( klass ){
		return this instanceof klass;
    }
    
	/**
	 * TObject#isKindOf( klass ) -> Boolean
	 * - klass (Object|String): class or class name
	 * 
	 * Checks if the object is a particular type or
     * a subclass of if
	 * 
	 **/
    isKindOf( klass ){
    	return this instanceof klass;
    }
    
	/**
	 * TObject#includesMixin( mixin ) -> Boolean
	 * - mixin_name (Object|String): mixin or mixin name
	 * 
	 * Checks if the object includes a mixin
	 * 
	 **/
    includesMixin( mixin ){
		return this instanceof mixin;
    }
}
