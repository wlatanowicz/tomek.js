
export default class DynamicDictionary {

	translateFunction: string = "( function(n){ return '@@'+n+'@@' } )";

	setTranslateFunction( fun: string ){
		this.translateFunction = fun;
	}

	getTranslationExpression( token: string ) {
		return this.translateFunction+"( "+JSON.stringify( token )+" )";
	}

}