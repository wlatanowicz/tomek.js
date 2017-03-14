import TWebControl from "@framework/WebControls/TWebControl";

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
		properties['Src'] = 'src';
		properties['Alt'] = 'alt';
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
