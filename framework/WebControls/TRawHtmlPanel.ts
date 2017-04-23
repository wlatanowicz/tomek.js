import TWebControl from "@framework/WebControls/TWebControl";
import TWebControlProperty from "@framework/WebControls/TWebControlProperty";

/** section: WebControls
 * class TRawHtmlPanel < TWebControl
 * 
 * Control returns the HTML content
 * 
 **/
class TRawHtmlPanel extends TWebControl
{
    //@Override
    _tagName = 'div';

    private _RawHTML;

    set RawHTML(value)
    {
        this._RawHTML = value;
        this.applyProperty(this._renderedMainElement, 'RawHTML')
    }

    get RawHTML()
    {
        return this.converters.string(this._RawHTML);
    }

    getElementProperites(): any
    {
        let properties = super.getElementProperites();
        properties['RawHTML'] = new TWebControlProperty("innerHtml", "_RawHTML", 'RawHTML');
        return properties;
    }
}
