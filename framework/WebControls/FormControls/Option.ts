import WebControl from "@framework/WebControls/WebControl";
import WebControlProperty from "@framework/WebControls/WebControlProperty";

/** section: WebControls_FormControls
 * class Option < WebControl
 * 
 * Control renders an option for select
 * 
 **/
export default class Option extends WebControl {

  //@Override
  _tagName = 'option';

  //@Override
  _rendersChildControls = true;

  /**
   * Option#Text -> String
   **/

  private _Text;

  set Text(value) {
    this._Text = value;
  }

  get Text() {
    return this.converters.string(this._Text);
  }

  private _Value;

  set Value(value) {
    this._Value = value;
    this.applyProperty(this._renderedMainElement, 'Value');
  }

  get Value() {
    return this.converters.string(this._Value);
  }

  private _Selected;

  set Selected(value) {
    this._Selected = value;
    this.applyProperty(this._renderedMainElement, 'Selected');
  }

  get Selected() {
    this.fetchProperty(this._renderedMainElement, 'Selected');
    return this.converters.boolean(this._Selected);
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
    props['Value'] = new WebControlProperty("value", "_Value", "Value");
    props['Selected'] = new WebControlProperty("selected", "_Selected", this.converters.int, true);
    props['Disabled'] = new WebControlProperty("disabled", "_Disabled", "Disabled");
    return props;
  }

  //@Override
  createMainElement() {
    var d = super.createMainElement();

    if (this.Text) {
      var t = document.createTextNode(this.Text);
      d.appendChild(t);
    }

    return d;
  }
}
