import DictionaryInterface from  './DictionaryInterface';

export default class DynamicDictionary extends DictionaryInterface{

	translateFunction: string = "( function(n){ return '@@'+n+'@@' } )";

	setTranslateFunction( fun: string ){
		this.translateFunction = fun;
	}

	getTranslationExpression( token: string ) {
		return this.translateFunction+"( "+JSON.stringify( token )+" )";
	}

}