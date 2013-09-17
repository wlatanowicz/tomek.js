//= require Base

var TExpression = Base.extend( {
	
	_expressionFunction : function(){return null},
	
	constructor : function( fun ){
		this._expressionFunction = fun;
	},
	
	valueOf : function(){
		return this._expressionFunction().valueOf();
	},
	
	toString : function(){
		return this._expressionFunction().toString();
	}
	
});
