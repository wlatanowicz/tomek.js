import WebControl from "@framework/WebControls/WebControl";
import WebControlProperty from "@framework/WebControls/WebControlProperty";

//= require WebControl
//= require EventResponder

/** section: WebControls
 * class Link <  WebControl
 * 
 * Control renders a link
 * 
 **/
export default class Link extends WebControl {

  //@Override
  _tagName = 'a';

  /**
   * Link#Text -> String
   **/

  /**
   * Link#Href -> String
   **/

  /**
   * Link#Target -> String
   **/

  private _Text;

  set Text(value) {
    this._Text = value;
  }

  get Text() {
    return this.converters.string(this._Text);
  }

  private _Href: any = '#';

  set Href(value: any) {
    this._Href = value;
    this.applyProperty(this._renderedMainElement, 'Href');
  }

  get Href() {
    return this.converters.string(this._Href);
  }

  private _Target: any = '_self';

  set Target(value) {
    this._Target = value;
    this.applyProperty(this._renderedMainElement, 'Target');
  }

  get Target() {
    return this.converters.string(this._Target);
  }

  getElementProperites(): any {
    let properties = super.getElementProperites();
    properties['Href'] = new WebControlProperty("href", "_Href", 'Href');
    properties['Target'] = new WebControlProperty("target", "_Target", 'Target');
    return properties;
  }

  //@Override
  createMainElement() {
    var d = super.createMainElement();

    if (this.Text.length > 0) {
      var t = document.createTextNode(this.Text);
      d.appendChild(t);
    }

    return d;
  }
}