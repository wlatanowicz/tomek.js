/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//= require TObject
//= require TEventResponder

klass( 'TErrorRouter', TObject, [TEventResponderMixin], {
	
	_handlers : [],
	
	constructor : function(){
		this.base();
		this._handlers = [];
	},
	
	register : function(){
		this.addEventListener( window, 'error', this.errorOccured.bind( this ) );
	},
	
	addHandler : function( handler ){
		this._handlers.push( handler );
	},
	
	errorOccured : function ( e ){
		e.preventDefault();
		
		var line = e.lineno;
		var column = e.colno;
		var file = e.filename;
		var message = e.message;

		var error = this.extractErrorFromDescription( message );
				
		for ( var i=0; i<this._handlers.length; i++ ){
			if ( error ){
				this._handlers[i].handleError( file, line, column, error.klass, error.message, error.stack, error, e );
			}else{
				this._handlers[i].handleOtherError( file, line, column, message, e );
			}
		}
	},
	
	extractErrorFromDescription : function( str ){
		var start = str.indexOf( "<errorDescription>" );
		var end = str.indexOf( "</errorDescription>" );
		if ( start < 0 || end < 0 ){
			return null;
		}
		
		start += "<errorDescription>".length;
		
		var obj = null;
		try{
			obj = JSON.parse( str.substr( start, end-start ) )
		}catch(ex){}
		
		return obj;
	}
	
});

TErrorRouter._Instance = null;
TErrorRouter.getInstance = function(){
	if ( TErrorRouter._Instance === null ){
		TErrorRouter._Instance = new TErrorRouter();
	}
	return TErrorRouter._Instance;
};
TErrorRouter.register = function(){
	TErrorRouter.getInstance().register();
};
TErrorRouter.addHandler = function( handler ){
	TErrorRouter.getInstance().addHandler( handler );
};