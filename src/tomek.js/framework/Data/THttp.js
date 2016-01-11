//= require TObject

klass( 'THttp', TObject, {

	getPreparedBody : function( body ){
		return JSON.stringify( body );
	},
	
	getProcessesedResponse : function( xhttp ){
		return JSON.parse( xhttp.response );
	},
	
	getBodyContentType : function(){
		return 'application/json';
	},
	
	getPublicProperties : function(){
		return [
			'BaseUrl'
		];
	},

	getHeaders : function(){
		return [];
	},
	
	getQueryParams : function(){
		return {};
	},
	
	applyDefaultResolvers : function( promise ){
		
	},
	
	getErrorStatuses : function(){
		return [401,403,404,500];
	},
	
	get : function( url, queryParams ){
		return this.performCallback( 'GET', url, undefined, queryParams );
	},

	put : function( url, body, queryParams ){
		return this.performCallback( 'PUT', url, body, queryParams );
	},
	
	post : function( url, body, queryParams ){
		return this.performCallback( 'POST', url, body, queryParams );
	},
	
	delete : function( url, queryParams ){
		return this.performCallback( 'DELETE', url, undefined, queryParams );
	},
	
	performCallback : function( method, url, body, queryParams ){
		queryParams = queryParams
							? queryParams
							: [];
		
		var promise = new Promise( function( resolve, reject ){
				var fullUrl = this.getBaseUrl() + url + this.prepareQuery( queryParams );
				var xhttp = new XMLHttpRequest();
				xhttp.open( method, fullUrl, true );
				xhttp.onreadystatechange = function (aEvt) {
					if ( xhttp.readyState == 4 ) {
						if( xhttp.status == 200 ){
							resolve( xhttp );
						}else{
							reject( xhttp );
						}
					}
				};

				this.applyHeaders( xhttp );

				if ( body !== undefined ){
					xhttp.setRequestHeader( "Content-type", this.getBodyContentType() );
					xhttp.send( this.getPreparedBody( body ) );
				}else{
					xhttp.send( null );
				}

			}.bind( this ));
		
		this.wrapPromise( promise );
		this.applyDefaultResolvers( promise );

		return promise;
	},
	
	applyHeaders : function( xhttp ){
		var headers = this.getHeaders();
		for ( var i=0; i<headers.length; i++ ){
			var header = headers[i].split(":").map( String.trim );
			xhttp.setRequestHeader( header[0], header.length > 1 ? header[1] : null );
		}
	},
	
	prepareQuery : function( queryParams ){
		var parts = [];
		for ( var k in queryParams ){
			parts.push( encodeURIComponent( k ) + '=' + encodeURIComponent( queryParams[k] ) );
		}
		for ( var k in this.getQueryParams() ){
			parts.push( encodeURIComponent( k ) + '=' + encodeURIComponent( queryParams[k] ) );
		}
		return parts.length === 0
						? ''
						: '?'+parts.join( '&' );
	},

	wrapPromise : function( promise ){
		var that = this;
		var statuses = this.getErrorStatuses();
		for ( var i=0; i<statuses.length; i++ ){
			var status = statuses[i];
			promise['on'+status] = function(fn) {
				promise.catch(function(xhttp) {
					if ( xhttp.status == status ){
						fn( xhttp, that.getProcessesedResponse( xhttp ) );
					}
				});
				return promise;
			};
		}
		promise.success = function(fn) {
			promise.then(function(xhttp) {
				fn( xhttp, that.getProcessesedResponse( xhttp ) );
			});
			return promise;
		};
		promise.error = function(fn) {
			promise.catch(function(xhttp) {
				fn( xhttp );
			});
			return promise;
		};
	}

} );