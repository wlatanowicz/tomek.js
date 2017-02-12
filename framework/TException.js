//= require TObject

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