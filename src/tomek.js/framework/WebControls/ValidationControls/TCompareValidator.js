//= require TBaseValidator

/** section: ValidationControls
 * class TCompareValidator < TBaseValidator
 * 
 * 
 **/
klass( 'TCompareValidator', TBaseValidator, {
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'ControlToCompare', type: 'object' },
					{ name: 'ValueToCompare', type: 'none' },
					'Operator' );
		return arr;
	},
	
	//@Override
	performValidation : function(){
		return false;
	}
	
});