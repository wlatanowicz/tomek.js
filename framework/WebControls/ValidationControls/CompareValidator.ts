import BaseValidator from "@framework/WebControls/ValidationControls/BaseValidator";
import Exception from "@framework/Exception";

/** section: WebControls_ValidationControls
 * class CompareValidator < BaseValidator
 * 
 * 
 **/
export default class CompareValidator extends BaseValidator {

  private _ControlToCompareID;
  private _ControlToCompare = null;

  set ControlToCompare(c) {
    if (typeof c == 'string') {
      this._ControlToCompareID = c;
    } else {
      this._ControlToCompare = c;
    }
  }

  get ControlToCompare() {
    if (this._ControlToCompare === null
      && this._ControlToCompareID !== null
      && this._ControlToCompareID !== undefined) {

      var ctrl = this.ValidatedForm.findChildControlByID(this._ControlToCompareID);
      if (ctrl === null) {
        throw new Exception('Cannot find control: ' + this._ControlToCompareID);
      }
      this.ControlToCompare = ctrl;
    }
    return this._ControlToCompare;
  }

  private _ValueToCompare;

  set ValueToCompare(v) {
    this._ValueToCompare = v;
  }

  get ValueToCompare() {
    return this.converters.object(this._ValueToCompare);
  }

  private _Operator;

  set Operator(v) {
    this._Operator = v;
  }

  get Operator() {
    return this.converters.string(this._Operator);
  }

  //@Override
  performValidation() {

    var leftValue = this.ControlToValidate.Value;

    var rightValue = null;

    if (this.ControlToCompare !== null) {
      rightValue = this.ControlToCompare.Value;
    } else {
      rightValue = this.ValueToCompare;
    }

    switch (this.Operator.toLowerCase().replace("-", "")) {

      case 'equals':
      case 'equal':
        return leftValue == rightValue;

      case 'notequals':
      case 'notequal':
      case 'differ':
      case 'differs':
        return leftValue != rightValue;

      case 'greater':
      case 'greaterthan':
        return leftValue > rightValue;

      case 'less':
      case 'lessthan':
        return leftValue < rightValue;

    }
    return false;
  }

}