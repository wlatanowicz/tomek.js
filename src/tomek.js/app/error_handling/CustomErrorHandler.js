//= require TErrorHandler


klass( 'CustomErrorHandler', TErrorHandler, {
	
	handleError : function( file, line, column, klass, message, stack, exception_description_object, raw_error_event ){
		var stack_txt = stack.map( function(e){ return "\t\t"+e+"\n" } ).join('');
		alert( "Error occured:\n\t"+klass+": "+message+"\n\tfile: "+file+" line: "+line+" column: "+column+"\n\tstack trace:\n"+stack_txt );
	},

	handleOtherError : function( file, line, column, message, raw_error_event ){
		alert( "Error occured:\n\t"+message+"\n\tfile: "+file+" line: "+line+" column: "+column );
	}	
	
});