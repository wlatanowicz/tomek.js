import EventResponderInterface from "@framework/EventResponderInterface";
import Link from "@framework/WebControls/Link";
import EventResponder from "@framework/EventResponder";

/** section: WebControls_FormControls
 * class LinkButton <  Link
 * includes EventResponderMixin
 * 
 * Control renders a button based on a link
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * 
 **/
export default class LinkButton extends Link implements EventResponderInterface {

  //@Override
  _triggersEvents = ['Click'];

  private _event = null;

  get event(): EventResponder {
    if (this._event === null) {
      this._event = new EventResponder(this, this._triggersEvents);
    }
    return this._event;
  }

  //@Override
  createMainElement() {
    var d = super.createMainElement();

    this.event.registerTriggerElement(d, 'click', 'Click', true);

    return d;
  }
}
