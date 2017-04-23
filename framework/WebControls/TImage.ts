import TWebControl from "@framework/WebControls/TWebControl";
import TWebControlProperty from "@framework/WebControls/TWebControlProperty";

/** section: WebControls
 * class TImage < TWebControl
 * 
 * Control renders an image
 * 
 **/
export default class TImage extends TWebControl {
    _tagName = 'img';

     _rendersChildControls = false;

     getElementProperites(): any
    {
        let properties = super.getElementProperites();
        properties['Src'] = new TWebControlProperty("src", "_Src", 'Src');
        properties['Alt'] = new TWebControlProperty("alt", "_Alt", 'Alt');
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
