//= require TBaseValidator

/** section: Validation
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