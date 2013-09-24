//= require Base

/**
 * Stores an expriession to be rendered
 */
var TExpression = Base.extend( {
	
	/**
	 * Function
	 */
	_expressionFunction : function(){return null},
	
	constructor : function( fun ){
		this._expressionFunction = fun;
	},
	
	valueOf : function(){
		var exp = this._expressionFunction();
		if ( exp == null ){
			return '!NULL!';
		}
		return exp.valueOf();
	},
	
	toString : function(){
		var exp = this._expressionFunction();
		if ( exp == null ){
			return '!NULL!';
		}
		return exp.toString();
	}
	
});
