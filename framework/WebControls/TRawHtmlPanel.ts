import TWebControl from "@framework/WebControls/TWebControl";

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
	}

	get RawHTML()
	{
		this.fetchProperty(this._renderedMainElement, 'RawHTML');
		return this.converters.string(this._RawHTML);
	}

	getElementProperites(): any
	{
		let properties = super.getElementProperites();
		properties['RawHTML'] = 'innerHTML';
		return properties;
	}
}
