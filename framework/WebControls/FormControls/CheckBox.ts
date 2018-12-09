import WebControl from "@framework/WebControls/WebControl";
import ValidatableInterface from "@framework/WebControls/ValidationControls/ValidatableInterface";
import TEventReposnderInterface from "@framework/EventResponderInterface";
import EventResponder from "@framework/EventResponder";
import WebControlProperty from "@framework/WebControls/WebControlProperty";

//= require EventResponder
//= require TValidatable
//= require TTwoWayBinding

/** section: WebControls_FormControls
 * class CheckBox < WebControl
 * includes EventResponderMixin
 * 
 * Control renders a checkbox input
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * `on:Change`
 * 
 **/
export default class CheckBox extends WebControl implements ValidatableInterface, TEventReposnderInterface {

  //@Override
  _tagName = 'input';

  //@Override
  _rendersChildControls = false;

  private _event = null;

  get event(): EventResponder {
    if (this._event === null) {
      this._event = new EventResponder(this, ['Click', 'Change'])
    }
    return this._event;
  }

  ErrorCssClas = "error";

  IsValid;

  get Value() {
    return this.Checked;
  }

  //@Override
  getDefaultAttributes() {
    return { type: 'checkbox' };
  }

  /**
   * CheckBox#Checked -> Boolean
   **/

  private _Checked;

  set Checked(value: any) {
    this._Checked = value;
    this.applyProperty(this._renderedMainElement, 'Checked');
  }

  get Checked(): any {
    this.fetchProperty(this._renderedMainElement, 'Checked');
    return this.converters.boolean(this._Checked);
  }

  private _Disabled;

  set Disabled(value) {
    this._Disabled = value;
    this.applyProperty(this._renderedMainElement, 'Disabled');
  }

  get Disabled() {
    return this.converters.boolean(this._Disabled);
  }

  getElementProperites() {
    var props = super.getElementProperites();
    props['Checked'] = new WebControlProperty("checked", "_Checked", this.converters.boolean, true);
    props['Disabled'] = new WebControlProperty("disabled", "_Disabled", "Disabled");
    return props;
  }

  //@Override
  createMainElement() {
    var d = super.createMainElement();

    this.event.registerTriggerElement(d, 'click', 'Click');
    this.event.registerTriggerElement(d, 'change', 'Change');

    return d;
  }
}