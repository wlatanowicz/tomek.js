import BaseValidator from "@framework/WebControls/ValidationControls/BaseValidator";

/** section: WebControls_ValidationControls
 * class RegularExpressionValidator < BaseValidator
 *
 *
 **/
class RegularExpressionValidator extends BaseValidator {
  private _Pattern;

  private _Modifiers;


  get Pattern() {
    return this.converters.string(this._Pattern);
  }

  set Pattern(value) {
    this._Pattern = value;
  }

  get Modifiers() {
    return this.converters.string(this._Modifiers);
  }

  set Modifiers(value) {
    this._Modifiers = value;
  }

  //@Override
  performValidation() {
    return (new RegExp(this.Pattern, this.Modifiers)).test(this.ControlToValidate.Value);
  }

}
