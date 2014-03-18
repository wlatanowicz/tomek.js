//= require Base

/** section: Controls
 * class TExpression
 * 
 * Stores an expriession to be rendered
 * 
 **/
klass( 'TExpression', {
	
	/**
	 * TExpression#_expressionFunction -> Function
	 **/
	_expressionFunction : function(){return null},
	
	constructor : function( fun ){
		this._expressionFunction = fun;
	},
	
	valueOf : function(){
		var exp = this._expressionFunction();
		if ( exp == null ){
			return null;
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
