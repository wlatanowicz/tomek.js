import WebControl from "@framework/WebControls/WebControl";
import EventResponderInterface from "@framework/EventResponderInterface";
import EventResponder from "@framework/EventResponder";
import WebControlProperty from "@framework/WebControls/WebControlProperty";

/** section: WebControls_FormControls
 * class Button <  WebControl
 * includes EventResponderMixin
 * 
 * Control renders a button
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * 
 **/
export default class Button extends WebControl implements EventResponderInterface {

  //@Override
  _tagName = 'button';

  //@Override
  _rendersChildControls = true;

  //@Override
  _triggersEvents = ['Click'];

  _renderedTextNode = null;

  private _event = null;

  get event(): EventResponder {
    if (this._event === null) {
      this._event = new EventResponder(this, ['Click']);
    }
    return this._event;
  }

  /**
   * Button#Text -> String
   **/

  private _Text;

  set Text(value: any) {
    this._Text = value;
    if (this._renderedTextNode) {
      this._renderedTextNode.textContent = this.converters.string(value);
    }
  }

  get Text() {
    return this.converters.string(this._Text);
  }

  private _Disabled;

  set Disabled(value: any) {
    this._Disabled = value;
    this.applyProperty(this._renderedMainElement, 'Disabled');
  }

  get Disabled() {
    return this.converters.boolean(this._Disabled);
  }

  getElementProperites() {
    var props = super.getElementProperites();
    props['Disabled'] = new WebControlProperty("disabled", "_Disabled", "Disabled");
    return props;
  }

  //@Override
  createMainElement() {
    var d = super.createMainElement();

    var t = document.createTextNode(this.Text);
    d.appendChild(t);
    this._renderedTextNode = t;

    this.event.registerTriggerElement(d, 'click', 'Click');

    return d;
  }

}