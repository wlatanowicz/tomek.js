import TWebControl from "../TWebControl";
import TEventResponderInterface from "../../TEventResponderInterface";
import TEventResponder from "../../TEventResponder";

//= require TWebControl
//= require TEventResponder

/** section: WebControls_FormControls
 * class TButton <  TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a button
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * 
 **/
export default class TButton extends TWebControl implements TEventResponderInterface
{
	
	//@Override
	_tagName = 'button';
	
	//@Override
	_rendersChildControls = true;
	
	//@Override
	_triggersEvents = ['Click'];
	
	_renderedTextNode = null;
	
	private _event = null;

	get event():TEventResponder
	{
		if (this._event === null) {
			this._event = new TEventResponder(this, ['Click'])
		}
		return this._event;
	}

	/**
	 * TButton#Text -> String
	 **/
	
	private _Text;

	set Text( value )
	{
		this._Text = value;
		if ( this._renderedTextNode ){
			this._renderedTextNode.textContent = this.converters.string(value);
		}
	}

	get Text(): string
	{
		return this.converters.string(this._Text);
	}

	private _Disabled;

	set Disabled(value)
	{
		this._Disabled = value;
		this.applyProperty(this._renderedMainElement, 'Disabled');
	}

	get Disabled(): boolean
	{
		this.fetchProperty(this._renderedMainElement, 'Disabled');
		return this.converters.boolean(this._Disabled);
	}


	//@Override
	createMainElement()
	{
		var d = super.createMainElement();
		
		var t = document.createTextNode( this.Text );
		d.appendChild( t );
		this._renderedTextNode = t;

		this.event.registerTriggerElement( d, 'click', 'Click' );
		
		return d;
	}
	
}