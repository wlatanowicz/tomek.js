//= require TBaseValidator

/** section: ValidationControls
 * class TCompareValidator < TBaseValidator
 * 
 * 
 **/
var TCompareValidator = TBaseValidator.extend( {
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'ControlToCompare', 'ValueToCompare', 'Operator' );
		return arr;
	},
	
	//@Override
	performValidation : function(){
		return false;
	}
	
});