
export default class Dictionary {
	
	items;
	language: string;
	strict: boolean;

	constructor( language:string, strict:boolean ){
		this.items = {};
		this.language = language;
		this.strict = strict;
	}

	setTranslation( token: string, phrase: string ){
		this.items[token] = phrase;
	}

	getTranslationExpression( token:string ){
		if ( this.items[ token ] ){
			return JSON.stringify( this.items[token] );
		}
		if ( this.strict ){
			throw "No translation for " + JSON.stringify( token ) + " language: "+this.language;
		}
		return JSON.stringify( token );
	}

}