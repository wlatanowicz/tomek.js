//= require TBaseValidator

/** section: WebControls_ValidationControls
 * class TCustomValidator < TBaseValidator
 * 
 * Validates based on value of IsValid property
 * and results of event functions.
 * 
 * ##### Triggered events
 * 
 * `on:Validate`
 * 
 **/
klass( 'TCustomValidator', TBaseValidator, [ TEventResponderMixin ], {
		
	_triggersEvents : [ 'Validate' ],
	
	/**
	 * TButton#IsValid -> Boolean
	 **/
	
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
		var valid = true;
		var i = 0;
		for ( i=0; i<results.length; i++ ){
			valid = valid && results[i];
		}
		return valid;
	}
	
});