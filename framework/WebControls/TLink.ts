import TWebControl from "@framework/WebControls/TWebControl";

//= require TWebControl
//= require TEventResponder

/** section: WebControls
 * class TLink <  TWebControl
 * 
 * Control renders a link
 * 
 **/
export default class TLink extends TWebControl
{

	//@Override
	_tagName = 'a';

	/**
	 * TLink#Text -> String
	 **/

	/**
	 * TLink#Href -> String
	 **/

	/**
	 * TLink#Target -> String
	 **/

	private _Text;

	set Text(value)
	{
		this._Text = value;
	}

	get Text()
	{
		return this.converters.string(this._Text);
	}

	private _Href:any = '#';

	set Href(value)
	{
		this.applyProperty(this._renderedMainElement, 'Href');
		this._Href = value;
	}

	get Href()
	{
		this.fetchProperty(this._renderedMainElement, 'Href');
		return this.converters.string(this._Href);
	}

	private _Target:any = '_self';

	set Target(value)
	{
		this._Target = value;
	}

	get Target()
	{
		this.fetchProperty(this._renderedMainElement, 'Target');
		return this.converters.string(this._Target);
	}

	getElementProperites(): any
	{
		let properties = super.getElementProperites();
		properties['Href'] = 'href';
		properties['Target'] = 'target';
		return properties;
	}

	//@Override
	createMainElement()
	{
		var d = super.createMainElement();

		if (this.Text.length > 0) {
			var t = document.createTextNode(this.Text);
			d.appendChild(t);
		}

		return d;
	}
}