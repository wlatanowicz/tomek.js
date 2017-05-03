import WebControl from "@framework/WebControls/WebControl";
import WebControlProperty from "@framework/WebControls/WebControlProperty";

/** section: WebControls
 * class Image < WebControl
 * 
 * Control renders an image
 * 
 **/
export default class Image extends WebControl {
    _tagName = 'img';

     _rendersChildControls = false;

     getElementProperites(): any
    {
        let properties = super.getElementProperites();
        properties['Src'] = new WebControlProperty("src", "_Src", 'Src');
        properties['Alt'] = new WebControlProperty("alt", "_Alt", 'Alt');
        return properties;
    }

    private _Src = '';

    set Src(value)
    {
        this._Src = value;
        this.applyProperty(this._renderedMainElement, 'src');
    }

    get Src(): string
    {
        return this.converters.string(this._Src);
    }

    private _Alt = '';

    set Alt(value)
    {
        this._Alt = value;
        this.applyProperty(this._renderedMainElement, 'alt');
    }

    get Alt(): string
    {
        return this.converters.string(this._Alt);
    }

}
