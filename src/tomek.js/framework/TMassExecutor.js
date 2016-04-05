//= require TObject

/** section: Utilities
 * class TMassExecutor
 * 
 * Object executes method on all objects in the given array
 * 
 **/
klass( 'TMassExecutor', {
	
	___array : [],
	
	constructor : function( array ){
		this.___array = [];
		if ( array ){
			var i;
			for( i=0; i<array.length; i++ ){
				this.___addObject( array[i] );
			}
		}
	},
	
	___addObject : function( object ){
		this.___array.push( object );
		for ( var methodName in object ){
			try {
			  if (typeof(object[methodName]) == "function") {
				  this[methodName] = this.___invokeMethod.bind( this, methodName );
			  }
			} catch (err) {
			}
		}
	},
	
	___invokeMethod : function( methodName ){
		var methodArgs = [];
		var i;
		for ( i=1; i<arguments.length; i++ ){
			methodArgs.push( arguments[i] );
		}
		for ( i=0; i<this.___array.length; i++ ){
			if ( typeof(this.___array[i][methodName]) == "function" ){
				this.___array[i][methodName].apply( this.___array[i], methodArgs );
			}
		}
	}
	
});