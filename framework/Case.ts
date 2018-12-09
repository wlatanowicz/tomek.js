import Control from "@framework/Control";

/** section: Controls
 * class Case < Control
 * 
 * Subview of [[SwitchView]]
 * 
 **/
export default class Case extends Control {

  /**
   * Case#Condition -> bool
   **/

  private _Condition = true;

  set Condition(value: any) {
    this._Condition = value;
  }

  get Condition() {
    return this.converters.boolean(this._Condition);
  }
}
