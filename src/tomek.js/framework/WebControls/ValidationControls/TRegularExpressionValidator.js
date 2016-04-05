//= require TBaseValidator

/** section: WebControls_ValidationControls
 * class TRegularExpressionValidator < TBaseValidator
 * 
 * 
 **/
klass( 'TRegularExpressionValidator', TBaseValidator, {
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'Pattern', 'Modifiers' );
		return arr;
	},
	
	//@Override
	performValidation : function(){
		return (new RegExp( this.getPattern(), this.getModifiers() )).test( this.getControlToValidate().getValue() );
	}	
	
});