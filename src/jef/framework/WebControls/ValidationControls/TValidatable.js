/** section: ValidationControls
 * mixin TValidatableMixin
 * 
 * Mixin adding ability to be validated
 * 
 **/
var TValidatableMixin = {
	
	_controlIsValidatable : true,// && (this.getValue ? true : false),
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'ErrorCssClass', 'IsValid' );
		return arr;
	},
	
	setIsValid : function( v ){
		this._IsValid = parseBool( v );
	},
	
	getIsValid : function(){
		return this._IsValid;
	}
	
};