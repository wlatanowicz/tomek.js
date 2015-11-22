import DictionaryInterface from  './DictionaryInterface';

export default class Dictionary extends DictionaryInterface{
	
	items;

	constructor( ){
		super();
		this.items = {};
	}

	setTranslation( token: string, phrase: string ){
		this.items[token] = phrase;
	}

	getTranslationExpression( token:string ){
		if ( this.items[ token ] ){
			return JSON.stringify( this.items[token] );
		}

		return JSON.stringify( token );
	}

}