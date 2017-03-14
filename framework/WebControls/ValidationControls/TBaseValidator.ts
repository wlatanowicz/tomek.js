import TWebControl from "@framework/WebControls/TWebControl";
import TException from "@framework/TException";
import TValidatableInterface from "@framework/WebControls/ValidationControls/TValidatableInterface";

/** section: WebControls_ValidationControls
 * class TBaseValidator < TControl
 * 
 * 
 **/
export default class TBaseValidator extends TWebControl
{
	
	/**
	 * TBaseValidator#ControlToValidate -> TControl
	 **/
	
	/**
	 * TBaseValidator#ValidationGroup -> Array@String|String
	 **/
	
	/**
	 * TBaseValidator#Enabled -> Boolean
	 **/
	
	//@Override
	constructor()
    {
		super();
		this.Visible = false;
	};

	private _ControlToValidate;
	private _ControlToValidateID;

    set ControlToValidate(c)
    {
        if ( typeof c == 'string' ){
            this._ControlToValidateID = c;
        }else{

            // if ( ! c instanceof TValidatableInterface){
            //     throw new TException( 'Control is not validatable' );
            // }

            this._ControlToValidate = c;
        }
    }

    get ControlToValidate()
    {
        if ( this._ControlToValidate == null
            && this._ControlToValidateID != null ){

            var ctrl = this.ValidatedForm.findChildControlByID(this._ControlToValidateID);
            if ( ctrl == null ){
                throw new TException( 'Cannot find control: '+this._ControlToValidateID );
            }
            this.ControlToValidate = ctrl;

        }
        return this._ControlToValidate;
    }

    private _ValidationGroup;

    set ValidationGroup(v:any)
    {
        if ( typeof v == 'string' ){
            v = v.split( ',' );
        }
        this._ValidationGroup = v;
    }

    get ValidationGroup()
    {
        return this.converters.string(this._ValidationGroup);
    }

    private _Enabled = true;

    set Enabled(v)
    {
        this._Enabled = v;
    }

    get Enabled()
    {
        return this.converters.boolean(this._Enabled);
    }

    private _ValidatedForm;

    get ValidatedForm()
    {
        return this._ValidatedForm;
    }

	//@Override
	set Parent( p )
    {
		this._Parent = p;
		
		var validatedForm = p;
		while ( validatedForm.Parent && !validatedForm._isValidatedForm ){
			validatedForm = validatedForm.Parent;
		}

		if ( !validatedForm._isValidatedForm ){
			throw new TException( 'ControlToValidate not withing TValidatedForm' );
		}

		validatedForm.addValidator( this );
		this._ValidatedForm = validatedForm;
	}

	get Parent()
    {
        return this._Parent;
    }

	/**
	 * TBaseValidator#isInValidationGroup() -> Boolean
	 * 
	 * Checks if validator belongs to validation group
	 * 
	 **/
	isInValidationGroup(g)
    {
		return this._ValidationGroup.in_array(g);
	}
	
	/**
	 * TBaseValidator#validate() -> void
	 * 
	 * Runs validation.
	 * Is called from TValidatedForm and SHOULD NOT be called directly.
	 * 
	 **/
	validate()
    {
		var valid = true;
		if (this.Enabled){
			valid = this.performValidation();
		}
		
		this.Visible = !valid;
		this.ControlToValidate.IsValid = valid;
		
		this.render();
		
		return valid;
	}
	
	/**
	 * TBaseValidator#performValidation() -> void
	 * 
	 * Performs validation logic.
	 * Returns true when no errors occured.
	 * Should be overriden in validator implementations.
	 * 
	 **/
	performValidation()
    {
		return false;
	}
}