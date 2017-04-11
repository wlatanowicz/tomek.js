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
		properties['Src'] = new TWebControlProperty("src", "_Src", this.converters.string);
		properties['Alt'] = new TWebControlProperty("alt", "_Alt", this.converters.string);
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
		this.fetchProperty(this._renderedMainElement, 'src');
		return this.converters.string(this._Src);
	}

	private _Alt = '';

	set Alt(value)
	{
		this._Src = value;
		this.applyProperty(this._renderedMainElement, 'alt');
	}

	get Alt(): string
	{
		this.fetchProperty(this._renderedMainElement, 'alt');
		return this.converters.string(this._Alt);
	}

}
