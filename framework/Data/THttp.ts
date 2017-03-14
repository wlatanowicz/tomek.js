import THttpPromise from "@framework/Data/THttpPromise";
import TException from "@framework/TException";

/** section: Data
 * class THttp
 * 
 * 
 **/
export default class THttp
{
    public BaseUrl: string;

    constructor(baseUrl: string = null)
    {
        this.BaseUrl = baseUrl;
    }

	getHeaders()
    {
		return [];
	}
	
	getQueryParams()
    {
		return {};
	}
	
	applyDefaultResolvers(promise){}
	
	get(url, queryParams)
    {
		return this.performCallback('GET', url, undefined, queryParams);
	}

	put(url, body, queryParams)
    {
		return this.performCallback('PUT', url, body, queryParams);
	}
	
	post(url, body, queryParams)
    {
		return this.performCallback('POST', url, body, queryParams);
	}
	
	delete( url, queryParams )
    {
		return this.performCallback('DELETE', url, undefined, queryParams);
	}
	
	prepareAndSend(xhttp, body)
    {
		if ( body !== undefined ){
			if ( body instanceof FormData
				|| ( body.constructor && body.constructor.name === 'FormData' )
				|| ( body.toString && body.toString() === '[object FormData]' ) ){
				xhttp.send( body );
			}else{
				xhttp.setRequestHeader( "Content-type", "application/json" );
				xhttp.send( JSON.stringify( body ) );
			}
		}else{
			xhttp.send( null );
		}
	}

	processResponse( xhttp )
    {
		return JSON.parse( xhttp.responseText );
	}
	
	performCallback( method, url, body, queryParams )
    {
		queryParams = queryParams
							? queryParams
							: [];
		
		var promise = this.createPromise();

		var fullUrl = this.BaseUrl + url + this.prepareQuery( queryParams );
		var xhttp = new XMLHttpRequest();
		xhttp.open( method, fullUrl, true );
		xhttp.onreadystatechange = function (aEvt) {
				if ( xhttp.readyState == 4 ) {
					this.postCallbackProcessing( xhttp, promise );
				}
			}.bind(this);

		this.applyHeaders( xhttp );

		this.prepareAndSend( xhttp, body );

		promise.setState( 'start', {
			'xhttp' : xhttp
		});
		
		this.applyDefaultResolvers( promise );

		return promise;
	}
	
	createPromise()
    {
		return new THttpPromise();
	}
	
	postCallbackProcessing(xhttp, promise)
    {
		try{
			var response = null;
			try{
				response = this.processResponse( xhttp );
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
	}
	
	applyHeaders(xhttp)
    {
		var headers = this.getHeaders();
		for ( var i=0; i<headers.length; i++ ){
			var header = headers[i].split(":").map( function(e){ return e.trim(); } );
			xhttp.setRequestHeader( header[0], header.length > 1 ? header[1] : null );
		}
	}
	
	prepareQuery(queryParams)
    {
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
}