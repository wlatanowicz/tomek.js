import Control from "@framework/Control";

/** section: WebControls_ValidationControls
 * class ValidatedForm < Control
 * 
 * 
 **/
export default class ValidatedForm extends Control {

  _isValidatedForm = true;

  /**
   * ValidatedForm#_validators -> Array@BaseValidator
   *
   * List of all validators within this form
   *
   **/
  _validators = [];

  //@Override
  constructor() {
    super();
    this._validators = [];
  }

  addValidator(v) {
    this._validators.push(v);
  }

  validate(g) {
    var i;
    var all_valid = true;
    for (i = 0; i < this._validators.length; i++) {
      var validator = this._validators[i];
      if ((!g)
        ||
        (g && validator.isInValidationGroup(g))) {
        var one_valid = validator.validate();
        all_valid = all_valid && one_valid;
      }
    }
    return all_valid;
  }

}