//= require TBaseValidator

/** section: ValidationControls
 * class TRequiredValidator < TBaseValidator
 * 
 * 
 **/
klass( 'TRequiredValidator', TBaseValidator, {
	
	//@Override
	performValidation : function(){
		return this.getControlToValidate().getValue() ? true : false;
	}
	
});