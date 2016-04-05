//= require TBaseValidator

/** section: WebControls_ValidationControls
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