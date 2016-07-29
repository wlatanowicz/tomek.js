//= require TObject
//= require THttpActiveRecord
//= require THttpActiveRecordPromise

/** section: Data_ActiveRecords
 * class THttpActiveRecordQuery <  TObject
 * 
 * Base active record query object.
 * Implemments all basic methods and communication.
 * Musts be extended to match system configuration.
 * 
 **/
klass( 'THttpActiveRecordQuery', {
	
	get : '',
	post : '',
	put : '',
	delete : '',
	
	new : {},
	
	getHttp : function(){
		return new THttp();
	},
	
	getPromise : function(){
		return new THttpActiveRecordPromise();		
	},
	
	getActiveRecord : function(){
		return new THttpActiveRecord();		
	},
	
	pathWithParamsForMethod : function( method, params ){
		return this[method].replace( /{[a-z]+}/g, function( m ){
			if ( typeof params === 'number' || typeof params === 'string' ){
				return params;
			}
			return params[ m.substr( 1, m.length-2 ) ];
		});
	},
	
	unwrapPayload : function( payload ){
		return payload;
	},
	
	wrapPayload : function( data ){
		return data;
	},
	
	create : function(){
		var active = this.makeActiveRecord( this.new );
		active.__status = 'new';
		active.__query = this;
		return active;
	},
	
	recreate : function( active ){
		this.updateActiveRecord( active, this.new );
		active.__status = 'new';
		return active;
	},
	
	load : function( params, query_params ){
		var http = this.getHttp();
		var promise = this.getPromise();
		http.get( this.pathWithParamsForMethod( 'get', params ), query_params )
				.start( function(){
					promise.setState( 'start', null );
				})
				.done( function(payload){
					var active = this.makeActiveRecord( this.unwrapPayload( payload ) );
					active.__status = 'loaded';
					promise.setState( 'done', active );
				}.bind(this) )
				.error( function(){
					promise.setState( 'error' );
				});
		return promise;
	},
	
	loadInto : function( active, params, query_params ){
		var http = this.getHttp();
		var promise = this.getPromise();
		http.get( this.pathWithParamsForMethod( 'get', params ), query_params )
				.start( function(){
					promise.setState( 'start', null );
				})
				.done( function(payload){
					this.updateActiveRecord( active, this.unwrapPayload( payload ) );
					active.__status = 'loaded';
					promise.setState( 'done', active );
				}.bind(this) )
				.error( function(){
					promise.setState( 'error' );
				});
		return promise;
	},
	
	save : function( active, query_params ){
		var http = this.getHttp();
		var promise = this.getPromise();
		var method = active.__status === 'new' ? 'post' : 'put';
		var payload = this.wrapPayload( this.activeRecordToObject( active ) );
		http[method]( this.pathWithParamsForMethod( method, active ), payload, query_params )
				.start( function(){
					promise.setState( 'start', null );
				})
				.done( function( payload ){
					active.__status = 'saved';
					this.updateActiveRecord( active, this.unwrapPayload( payload ) );
					promise.setState( 'done', active );
				}.bind(this) )
				.error( function(){
					promise.setState( 'error' );
				});
		return promise;
	},
	
	remove : function( active, query_params ){
		var http = this.getHttp();
		var promise = this.getPromise();
		http.delete( this.pathWithParamsForMethod( 'delete', active ), query_params )
				.start( function(){
					promise.setState( 'start', null );
				})
				.done( function(){
					active.__status = 'deleted';
					promise.setState( 'done', active );
				}.bind(this) )
				.error( function(){
					promise.setState( 'error' );
				});
		return promise;
	},
		
	activeRecordToObject : function( active ){
		var obj = {};
		this.deepCopy( active, obj );
		var protectedFields = [ '__status', '__query', 'super' ];
		for ( var i=0; i<protectedFields.length; i++){
			delete obj[protectedFields[i]];
		}
		return obj;
	},
	
	deepCopy : function( src, dst ){
		for ( var k in src ){
			var t = typeof src[k];
			if ( src[k] === null ){
				dst[k] = null;
			}else
			if ( t === 'string' || t === 'number' || t === 'boolean'
					|| src[k] === null || src[k] === undefined ){
				dst[k] = src[k];
			}else
			if ( t === 'object' ){
				if ( typeof dst[k] !== 'object' ){
					dst[k] = src[k] instanceof Array ? [] : {};
				}
				this.deepCopy( src[k], dst[k] );
			}
		}
	},
	
	makeActiveRecord : function( data ){
		var active = this.getActiveRecord();
		this.deepCopy( data, active );
		return active;
	},
	
	updateActiveRecord : function( active, data ){
		this.deepCopy( data, active );
		return active;
	}
	
});