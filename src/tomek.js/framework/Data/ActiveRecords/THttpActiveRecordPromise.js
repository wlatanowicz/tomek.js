//= require TObject
//= require TPromise

/** section: Data_ActiveRecords
 * class THttpActiveRecordPromise <  TPromise
 * 
 * Promise for active record query.
 * 
 **/
klass( 'THttpActiveRecordPromise', TPromise, {
	
	constructor : function(){
		this.base();
		this.wrapPromise();
	},
	
	wrapPromise : function(){
		var promise = this;
		
		promise.done = function(fn) {
			return promise.on( 'done', function(data) {
				fn(data);
			});
		};
		
		promise.error = function(fn) {
			return promise.on( 'error', function(data) {
				fn(data);
			});
		};
		
		promise.start = function(fn){
			return promise.on( 'start', function() {
				fn();
			});
		};
		
	}
	
});