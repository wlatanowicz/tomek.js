import WebControl from "@framework/WebControls/WebControl";
import EventResponderInterface from "@framework/EventResponderInterface";
import EventResponder from "@framework/EventResponder";
import WebControlProperty from "@framework/WebControls/WebControlProperty";

/** section: WebControls_FormControls
 * class RadioButton < WebControl
 * includes EventResponderMixin
 * 
 * Control renders a radio button input
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * `on:Change`
 * 
 **/
class RadioButton extends WebControl implements EventResponderInterface {
  //@Override
  _tagName = 'input';

  //@Override
  _rendersChildControls = false;

  private _event = null;

  get event(): EventResponder {
    if (this._event === null) {
      this._event = new EventResponder(this, ['Click', 'Change']);
    }
    return this._event;
  }

  //@Override
  getDefaultAttributes() {
    return { type: 'radio' };
  }

  /**
   * RadioButton#Checked -> Boolean
   **/

  private _Checked: any = false;

  set Checked(v) {
    this._Checked = v;
    this.applyProperty(this._renderedMainElement, 'Checked');
  }

  get Checked() {
    this.fetchProperty(this._renderedMainElement, 'Checked');
    return this.converters.boolean(this._Checked);
  }

  set Value(v) {
    this.Checked = v;
  }

  get Value() {
    return this.Checked;
  }

  /**
   * RadioButton#Group -> String
   **/

  private _Group;

  set Group(v) {
    this._Group = v;
    this.applyProperty(this._renderedMainElement, 'Group')
  }

  get Group() {
    return this.converters.string(this._Group);
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
    props['Group'] = new WebControlProperty("name", "_Group", "Group");
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
