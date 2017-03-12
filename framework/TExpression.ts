/** section: Controls
 * class TExpression
 *
 * Stores an expriession to be rendered
 *
 **/
export default class TExpression
{

	/**
	 * TExpression#_expressionFunction -> Function
	 **/
	_expressionFunction = function(){return null;};

	constructor( fun ){
		this._expressionFunction = fun;
	}

	valueOf(){
		var exp = this._expressionFunction();
		if ( exp == null ){
			return null;
		}
		return exp.valueOf();
	}

	toString(){
		var exp = this._expressionFunction();
		if ( exp == null ){
			return '!NULL!';
		}
		return exp.toString();
	}

}
