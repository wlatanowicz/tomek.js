//= require TWebControl

/** section: ValidationControls
 * class TBaseValidator < TControl
 * 
 * 
 **/
klass( 'TBaseValidator', TWebControl, {
	
	/**
	 * TBaseValidator.ControlToValidate -> TControl
	 **/
	
	/**
	 * TBaseValidator.ValidationGroup -> Array[String]|String
	 **/
	
	/**
	 * TBaseValidator.Enabled -> Boolean
	 **/
	
	//@Override
	constructor : function( options ){
		this.base( options );
		this.setEnabled( true );
		this.setVisible( false );
	},
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'ControlToValidate', 'ValidationGroup', 'Enabled' );
		return arr;
	},
	
	//@Override
	setParent : function( p ){
		this._Parent = p;
		
		var validatedForm = p;
		while ( validatedForm.getParent() && !validatedForm._isValidatedForm ){
			validatedForm = validatedForm.getParent();
		}

		if ( !validatedForm._isValidatedForm ){
			throw new TException( 'ControlToValidate not withing TValidatedForm' );
		}

		validatedForm.addValidator( this );
	},

	setControlToValidate : function( c ){
		if ( typeof c == 'string' ){
			this._ControlToValidateID = c;
		}else{
		
			if ( ! c._controlIsValidatable ){
				throw new TException( 'Control is not validatable' );
			}

			this._ControlToValidate = c;
		}
	},
	
	getControlToValidate : function(){
		if ( this._ControlToValidate == null
				&& this._ControlToValidateID != null ){
				
			var ctrl = this.findControlByID( this._ControlToValidateID );
			if ( ctrl == null ){
				throw new TException( 'Cannot find control: '+this._ControlToValidateID );
			}
			this.setControlToValidate( ctrl );
			
		}
		return this._ControlToValidate;
	},
	
	setValidationGroup : function( g ){
		if ( typeof g == 'string' ){
			g = g.split( ',' );
		}
		this._ValidationGroup = g;
	},
	
	/**
	 * TControl.isInValidationGroup() -> Boolean
	 * 
	 * Checks if validator belongs to validation group
	 * 
	 **/
	isInValidationGroup : function( g ){
		return this._ValidationGroup.in_array( g );
	},
	
	/**
	 * TControl.validate() -> void
	 * 
	 * Runs validation.
	 * Is called from TValidatedForm and SHOULD NOT be called directly.
	 * 
	 **/
	validate : function(){
		var valid = true;
		if ( this.getEnabled() ){
			valid = this.performValidation();
		}
		
		this.setVisible( ! valid );
		this.getControlToValidate().setIsValid( valid );
		
		this.render();
		
		return valid;
	},
	
	/**
	 * TControl.performValidation() -> void
	 * 
	 * Performs validation logic.
	 * Returns true when no errors occured.
	 * Should be overriden in validator implementations.
	 * 
	 **/
	performValidation : function(){
		return false;
	}
	
});