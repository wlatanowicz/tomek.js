//= require TObject

/** section: Utilities
 * class TException
 * 
 **/
klass( 'TException', {
	
	message : null,
	
	constructor : function( message ){
		this.message = message;
	},
	
	getMessage : function(){
		return this.message;
	},
	
	toString : function(){
		return 'TException: '+this.getMessage();
	}
	
});