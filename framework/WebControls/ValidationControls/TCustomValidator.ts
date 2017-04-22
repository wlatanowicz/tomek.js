import TBaseValidator from "@framework/WebControls/ValidationControls/TBaseValidator";
import TEventResponderInterface from "@framework/TEventResponderInterface";
import TEventResponder from "@framework/TEventResponder";

/** section: WebControls_ValidationControls
 * class TCustomValidator < TBaseValidator
 * 
 * Validates based on value of IsValid property
 * and results of event functions.
 * 
 * ##### Triggered events
 * 
 * `on:Validate`
 * 
 **/
export default class TCustomValidator extends TBaseValidator implements TEventResponderInterface
{
    private _event = null;

    get event():TEventResponder
    {
        if (this._event === null) {
            this._event = new TEventResponder(this, ['Validate']);
        }
        return this._event;
    }

    //@Override
    performValidation()
    {
        var results = this.event.trigger('Validate', null);
        var valid = true;
        var i = 0;
        for ( i=0; i<results.length; i++ ){
            valid = valid && results[i];
        }
        return valid;
    }
}