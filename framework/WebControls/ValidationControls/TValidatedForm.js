//= require TControl

/** section: WebControls_ValidationControls
 * class TValidatedForm < TControl
 * 
 * 
 **/
klass( 'TValidatedForm', TControl, {
	
	_isValidatedForm : true,
	
	/**
	 * TValidatedForm#_validators -> Array@TBaseValidator
	 * 
	 * List of all validators within this form
	 * 
	 **/
	_validators : [],
	
	//@Override
	constructor : function( options ){
		this.base( options );
		this._validators = []; 
	},
	
	addValidator : function( v ){
		this._validators.push( v );
	},
	
	validate : function( g ){
		var i;
		var all_valid = true;
		for ( i=0; i<this._validators.length; i++ ){
			var validator = this._validators[i];
			if ( ( !g )
					||
				 ( g && validator.isInValidationGroup( g ) ) ){
				var one_valid = validator.validate();
				all_valid = all_valid && one_valid;
			}
		}
		return all_valid;
	}
	
});