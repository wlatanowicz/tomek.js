//= require TObject
//= require THttpPromise

klass( 'THttp', TObject, {

	getPreparedBody : function( body ){
		return JSON.stringify( body );
	},
	
	getProcessedResponse : function( xhttp ){
		return JSON.parse( xhttp.responseText );
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
		
		var promise = this.createPromise();

		var fullUrl = this.getBaseUrl() + url + this.prepareQuery( queryParams );
		var xhttp = new XMLHttpRequest();
		xhttp.open( method, fullUrl, true );
		xhttp.onreadystatechange = function (aEvt) {
				if ( xhttp.readyState == 4 ) {
					this.processResponse( xhttp, promise );
				}
			}.bind(this);

		this.applyHeaders( xhttp );

		if ( body !== undefined ){
			xhttp.setRequestHeader( "Content-type", this.getBodyContentType() );
			xhttp.send( this.getPreparedBody( body ) );
		}else{
			xhttp.send( null );
		}

		promise.setState( 'start', {
			'xhttp' : xhttp
		});
		
		this.applyDefaultResolvers( promise );

		return promise;
	},
	
	createPromise : function(){
		return new THttpPromise();
	},
	
	processResponse : function( xhttp, promise ){
		try{
			var response = null;
			try{
				response = this.getProcessedResponse( xhttp );
			}catch( ex ){
				promise.setState( 'invalid-payload', {
					'xhttp': xhttp 
				});
				throw new TException( 'Invalid payload' );
			}
			if( xhttp.status == 200 ){
				promise.setState( 'done', {
					'response': response,
					'xhttp': xhttp 
				});
			}else{
				promise.setState( xhttp.status, {
					'response': response,
					'xhttp': xhttp 
				});
				throw new TException( 'HTTP error' );
			}
		}catch( ex ){
			promise.setState( 'error', {
				'status' : xhttp.status,
				'xhttp': xhttp,
				'exception' : ex
			});
		}
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
			if ( typeof queryParams[k] !== 'function'
					&& typeof queryParams[k] !== 'undefined' ){
				parts.push( encodeURIComponent( k ) + '=' + encodeURIComponent( queryParams[k] ) );
			}
		}
		for ( var k in this.getQueryParams() ){
			if ( typeof queryParams[k] !== 'function'
					&& typeof queryParams[k] !== 'undefined' ){
				parts.push( encodeURIComponent( k ) + '=' + encodeURIComponent( queryParams[k] ) );
			}
		}
		return parts.length === 0
						? ''
						: '?'+parts.join( '&' );
	}

} );