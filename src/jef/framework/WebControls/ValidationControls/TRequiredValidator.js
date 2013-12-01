//= require TBaseValidator

/** section: ValidationControls
 * class TRequiredValidator < TBaseValidator
 * 
 * 
 **/
var TRequiredValidator = TBaseValidator.extend( {
	
	//@Override
	performValidation : function(){
		return this.getControlToValidate().getValue() ? true : false;
	}
	
});