export default class TextExpression {
	
	epression: string;

	constructor( expr: string ){
		this.epression = this.createExpressionString(expr);
	}

	createExpressionString( str:string ):string{
		var parts :string[] = [];
		var l = str.length;
		var i = 0;

		var part :string = "";
		var mode :string = "text";

		while ( i < (l+1) ){

			if (mode == "text" && ( i >= l || str.substring(i, i + 3) == "[%@" ) ){
				mode = "trans";
				i += 3;
				if (part.length > 0) {
					parts.push(JSON.stringify(part))
				}
				part = "";
			}

			if ( mode == "text" && ( i >= l || str.substring( i, i+3) == "[%=" ) ){
				mode = "expr";
				i += 3;
				if ( part.length > 0 ){
					parts.push( JSON.stringify( part ) )
				}
				part = "";
			}

			if ( mode == "trans" && ( i >= l || str.substring( i, i+2) == "%]" ) ){
				mode = "text";
				i += 2;
				if ( part.length > 0 ){
					//@TODO
					var translation = "";
					parts.push( JSON.stringify( translation ) )
				}
				part = "";
			}

			if ( mode == "expr" && ( i >= l || str.substring( i, i+2) == "%]" ) ){
				mode = "text";
				i += 2;
				if ( part.length > 0 ){
					//@TODO
					var expr_part = "( new TExpression( function(){ return (" + part + "); }.bind( ExpressionContext ) ) )";
					parts.push(expr_part)
				}
				part = "";
			}

			if ( i < l ){
				part += str.substring(i, i + 1);
			}

			i += 1;

		}

		if ( parts.length <= 0 ){
			parts.push( "" );
		}

		return parts.join( "+" );

	}

}