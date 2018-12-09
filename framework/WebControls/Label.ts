import WebControl from "@framework/WebControls/WebControl";
import Expression from "@framework/Expression";
import Exception from "@framework/Exception";

/** section: WebControls
 * class Label <  WebControl
 * 
 * Control renders a label for control
 * 
 **/
export default class Label extends WebControl {
  //@Override
  _tagName = 'label';

  /**
   * Button#Text -> String
   **/

  /**
   * Button#ForControl -> String
   **/

  private _Text;

  set Text(value) {
    this._Text = value;
  }

  get Text() {
    return this.converters.string(this._Text);
  }

  private _ForControl;

  set ForControl(value) {
    this._ForControl = value;
  }

  get ForControl() {
    var c = this._ForControl;
    if (typeof (c) == 'string') {
      return this.findControlByID(this._ForControl);
    }
    if (c != null && c instanceof WebControl) {
      return c;
    }
    if (c != null && c instanceof Expression) {
      var c2 = c.valueOf();
      if (c2 != null && c2 instanceof WebControl) {
        return c2;
      }
    }
    if (c != null) {
      throw new Exception('Bad ForControl ' + c);
    }
    return null;
  }

  get ForControlId() {
    var c = this.ForControl;
    if (c != null) {
      c.ensureHtmlID();
      return c.HtmlID;
    }
    return null;
  }

  //@Override
  createMainElement() {
    var d = super.createMainElement();

    var for_id = this.ForControlId;
    if (for_id) {
      d.setAttribute('for', for_id);
    }

    if (this.Text.length > 0) {
      var t = document.createTextNode(this.Text);
      d.appendChild(t);
    }

    return d;
  }
}
