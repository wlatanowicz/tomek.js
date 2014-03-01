//= require TBaseValidator

/** section: ValidationControls
 * class TCompareValidator < TBaseValidator
 * 
 * 
 **/
klass( 'TCompareValidator', TBaseValidator, {
	
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