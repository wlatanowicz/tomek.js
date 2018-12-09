import WebControl from "@framework/WebControls/WebControl";
import WebControlProperty from "@framework/WebControls/WebControlProperty";

/** section: WebControls
 * class RawHtmlPanel < WebControl
 * 
 * Control returns the HTML content
 * 
 **/
class RawHtmlPanel extends WebControl {
  //@Override
  _tagName = 'div';

  private _RawHTML;

  set RawHTML(value) {
    this._RawHTML = value;
    this.applyProperty(this._renderedMainElement, 'RawHTML')
  }

  get RawHTML() {
    return this.converters.string(this._RawHTML);
  }

  getElementProperites(): any {
    let properties = super.getElementProperites();
    properties['RawHTML'] = new WebControlProperty("innerHtml", "_RawHTML", 'RawHTML');
    return properties;
  }
}
