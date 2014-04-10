//= require TBaseValidator

/** section: ValidationControls
 * class TCustomValidator < TBaseValidator
 * 
 * 
 **/
klass( 'TCustomValidator', TBaseValidator, [ TEventResponderMixin ], {
		
	_triggersEvents : [ 'Validate' ],
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 
					{ name: 'IsValid', type: 'bool', default: true }
				);
		return arr;
	},
	
	//@Override
	performValidation : function(){
		var results = this.triggerEvent( 'Validate', null );
		var valid = getIsValid();
		var i = 0;
		for ( i=0; i<results.length; i++ ){
			valid = valid && results[i];
		}
		return valid;
	}
	
});