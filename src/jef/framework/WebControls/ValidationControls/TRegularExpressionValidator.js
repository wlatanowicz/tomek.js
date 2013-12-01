//= require TBaseValidator

/** section: ValidationControls
 * class TRegularExpressionValidator < TBaseValidator
 * 
 * 
 **/
var TRegularExpressionValidator = TBaseValidator.extend( {
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Pattern', 'Modifiers' );
		return arr;
	},
	
	//@Override
	performValidation : function(){
		return (new RegExp( this.getPattern(), this.getModifiers() )).test( this.getControlToValidate().getValue() );
	}	
	
});