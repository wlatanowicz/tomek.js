//= require Base

/** section: Utilities
 * class Exception
 * 
 **/
var Exception = Base.extend({
	
	message : null,
	
	constructor : function( message ){
		this.message = message;
	},
	
	getMessage : function(){
		return this.message;
	},
	
	toString : function(){
		return 'Exception: '+this.getMessage();
	}
	
});