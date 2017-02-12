//= require TPromise

/** section: Data
 * class THttpPromise
 * 
 * 
 **/
klass( 'THttpPromise', TPromise, {
	
	constructor : function(){
		this.base();
		this.wrapPromise();
	},
	
	getErrorStatuses : function(){
		return [
				400,401,402,403,404,406,409,412,415,
				500,503
				];
	},
	
	wrapPromise : function(){
		var promise = this;
		var statuses = this.getErrorStatuses();
		for ( var i=0; i<statuses.length; i++ ){
			var status = statuses[i];
			promise['http'+status] = function( status, fn ) {
				return promise.on( status, function(param) {
					fn( param.response, param.xhttp, param );
				});
			}.bind( this, status );
		}
		
		promise.done = function(fn) {
			return promise.on( 'done', function(param) {
				fn( param.response, param.xhttp, param );
			});
		};
		
		promise.error = function(fn) {
			return promise.on( 'error', function(param) {
				fn( param.response, param.xhttp, param );
			});
		};
		
		promise.start = function(fn){
			return promise.on( 'start', function(param) {
				fn( param.code, param.xhttp, param );
			});
		};
		
		promise.invalidPayload = function(fn){
			return promise.on( 'invalid-payload', function(param) {
				fn( param.xhttp, param );
			});
		};

	}
	
} );