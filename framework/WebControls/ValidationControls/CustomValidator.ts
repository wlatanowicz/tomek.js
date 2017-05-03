import BaseValidator from "@framework/WebControls/ValidationControls/BaseValidator";
import EventResponderInterface from "@framework/EventResponderInterface";
import EventResponder from "@framework/EventResponder";

/** section: WebControls_ValidationControls
 * class CustomValidator < BaseValidator
 * 
 * Validates based on value of IsValid property
 * and results of event functions.
 * 
 * ##### Triggered events
 * 
 * `on:Validate`
 * 
 **/
export default class CustomValidator extends BaseValidator implements EventResponderInterface
{
    private _event = null;

    get event():EventResponder
    {
        if (this._event === null) {
            this._event = new EventResponder(this, ['Validate']);
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