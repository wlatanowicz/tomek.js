import WebControl from "@framework/WebControls/WebControl";
import Exception from "@framework/Exception";
import ValidatableInterface from "@framework/WebControls/ValidationControls/ValidatableInterface";

/** section: WebControls_ValidationControls
 * class BaseValidator < Control
 * 
 * 
 **/
export default class BaseValidator extends WebControl {

  /**
   * BaseValidator#ControlToValidate -> Control
   **/

  /**
   * BaseValidator#ValidationGroup -> Array@String|String
   **/

  /**
   * BaseValidator#Enabled -> Boolean
   **/

  //@Override
  constructor() {
    super();
    this.Visible = false;
  };

  private _ControlToValidate;
  private _ControlToValidateID;

  set ControlToValidate(c) {
    if (typeof c == 'string') {
      this._ControlToValidateID = c;
    } else {

      // if ( ! c instanceof ValidatableInterface){
      //     throw new Exception( 'Control is not validatable' );
      // }

      this._ControlToValidate = c;
    }
  }

  get ControlToValidate() {
    if (this._ControlToValidate == null
      && this._ControlToValidateID != null) {

      var ctrl = this.ValidatedForm.findChildControlByID(this._ControlToValidateID);
      if (ctrl == null) {
        throw new Exception('Cannot find control: ' + this._ControlToValidateID);
      }
      this.ControlToValidate = ctrl;

    }
    return this._ControlToValidate;
  }

  private _ValidationGroup;

  set ValidationGroup(v: any) {
    if (typeof v == 'string') {
      v = v.split(',');
    }
    this._ValidationGroup = v;
  }

  get ValidationGroup() {
    return this.converters.string(this._ValidationGroup);
  }

  private _Enabled = true;

  set Enabled(v) {
    this._Enabled = v;
  }

  get Enabled() {
    return this.converters.boolean(this._Enabled);
  }

  private _ValidatedForm;

  get ValidatedForm() {
    return this._ValidatedForm;
  }

  //@Override
  set Parent(p) {
    this._Parent = p;

    var validatedForm = p;
    while (validatedForm.Parent && !validatedForm._isValidatedForm) {
      validatedForm = validatedForm.Parent;
    }

    if (!validatedForm._isValidatedForm) {
      throw new Exception('ControlToValidate not withing ValidatedForm');
    }

    validatedForm.addValidator(this);
    this._ValidatedForm = validatedForm;
  }

  get Parent() {
    return this._Parent;
  }

  /**
   * BaseValidator#isInValidationGroup() -> Boolean
   *
   * Checks if validator belongs to validation group
   *
   **/
  isInValidationGroup(g) {
    return this._ValidationGroup.in_array(g);
  }

  /**
   * BaseValidator#validate() -> void
   *
   * Runs validation.
   * Is called from ValidatedForm and SHOULD NOT be called directly.
   *
   **/
  validate() {
    var valid = true;
    if (this.Enabled) {
      valid = this.performValidation();
    }

    this.Visible = !valid;
    this.ControlToValidate.IsValid = valid;

    this.render();

    return valid;
  }

  /**
   * BaseValidator#performValidation() -> void
   *
   * Performs validation logic.
   * Returns true when no errors occured.
   * Should be overriden in validator implementations.
   *
   **/
  performValidation() {
    return false;
  }
}