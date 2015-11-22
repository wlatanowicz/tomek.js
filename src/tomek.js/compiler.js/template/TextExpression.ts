import TranslationExpression from './TranslationExpression';
import DictionaryProvider from '../dictionary/DictionaryProvider';

export default class TextExpression {

	epression_parts;

	constructor( expr: string ){
		this.epression_parts = this.createExpressionString(expr);
	}

	getExpression( language:string = null ){
		var parts = [];
		var dp = new DictionaryProvider();
		var dict = dp.getDictionary( language );

		for ( var i = 0; i < this.epression_parts.length; i++ ){
			if ( this.epression_parts[i] instanceof TranslationExpression ){
				parts.push( dict.getTranslationExpression( this.epression_parts[i].text ) );
			}else{
				parts.push( this.epression_parts[i] );
			}
		}

		return parts.join( "+" );
	}

	getDescription(){
		var parts = [];
		for ( var i = 0; i < this.epression_parts.length; i++ ){
			if ( this.epression_parts[i] instanceof TranslationExpression ){
				parts.push( "@["+ JSON.stringify( this.epression_parts[i].text )+"]" );
			}else{
				parts.push( this.epression_parts[i] );
			}
		}
		return parts.join( "+" );
	}

	createExpressionString( str:string ){
		var parts = [];
		var l = str.length;
		var i = 0;

		var part :string = "";
		var mode :string = "text";

		while ( i < (l+1) ){

			if (mode == "text" && ( i >= l || str.substring(i, i + 3) == "[%@" ) ){
				mode = "trans";
				i += 3;
				if (part.length > 0) {
					parts.push( JSON.stringify( part ) );
				}
				part = "";
			}

			if ( mode == "text" && ( i >= l || str.substring( i, i+3) == "[%=" ) ){
				mode = "expr";
				i += 3;
				if ( part.length > 0 ){
					parts.push( JSON.stringify( part ) );
				}
				part = "";
			}

			if ( mode == "trans" && ( i >= l || str.substring( i, i+2) == "%]" ) ){
				mode = "text";
				i += 2;
				if ( part.length > 0 ){
					var translation = new TranslationExpression( part.trim() );
					parts.push( translation );
				}
				part = "";
			}

			if ( mode == "expr" && ( i >= l || str.substring( i, i+2) == "%]" ) ){
				mode = "text";
				i += 2;
				if ( part.length > 0 ){
					//@TODO //@DONE ?
					var expr_part = "( new TExpression( function(){ return (" + part + "); }.bind( ExpressionContext ) ) )";
					parts.push( expr_part );
				}
				part = "";
			}

			if ( i < l ){
				part += str.substring( i, i + 1 );
			}

			i += 1;

		}

		if ( parts.length <= 0 ){
			parts.push( '""' );
		}

		return parts;

	}

}