import TEventResponderInterface from "@framework/TEventResponderInterface";
import TLink from "@framework/WebControls/TLink";
import TEventResponder from "@framework/TEventResponder";

/** section: WebControls_FormControls
 * class TLinkButton <  TLink
 * includes TEventResponderMixin
 * 
 * Control renders a button based on a link
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * 
 **/
export default class TLinkButton extends TLink implements TEventResponderInterface{

	private _event = null;

	get event():TEventResponder
	{
		if (this._event === null) {
			this._event = new TEventResponder(this, ['Click']);
		}
		return this._event;
	}
	
	//@Override
	createMainElement()
	{
		var d = super.createMainElement();

		this.event.registerTriggerElement( d, 'click', 'Click', true );
		
		return d;
	}
}
