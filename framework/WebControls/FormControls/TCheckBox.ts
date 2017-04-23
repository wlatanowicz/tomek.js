import TWebControl from "@framework/WebControls/TWebControl";
import TValidatableInterface from "@framework/WebControls/ValidationControls/TValidatableInterface";
import TEventReposnderInterface from "@framework/TEventResponderInterface";
import TEventResponder from "@framework/TEventResponder";
import TWebControlProperty from "@framework/WebControls/TWebControlProperty";

//= require TEventResponder
//= require TValidatable
//= require TTwoWayBinding

/** section: WebControls_FormControls
 * class TCheckBox < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a checkbox input
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * `on:Change`
 * 
 **/
export default class TCheckBox extends TWebControl implements TValidatableInterface, TEventReposnderInterface
{

    //@Override
    _tagName = 'input';

    //@Override
    _rendersChildControls = false;

    private _event = null;

    get event():TEventResponder
    {
        if (this._event === null) {
            this._event = new TEventResponder(this, ['Click', 'Change'])
        }
        return this._event;
    }

    ErrorCssClas = "error";

    IsValid;

    get Value()
    {
        return this.Checked;
    }

    //@Override
    getDefaultAttributes()
    {
        return { type: 'checkbox' };
    }

    /**
     * TCheckBox#Checked -> Boolean
     **/

    private _Checked;

    set Checked(value: any)
    {
        this._Checked = value;
        this.applyProperty(this._renderedMainElement, 'Checked');
    }

    get Checked(): any
    {
        this.fetchProperty(this._renderedMainElement, 'Checked');
        return this.converters.boolean(this._Checked);
    }

    private _Disabled;

    set Disabled(value)
    {
        this._Disabled = value;
        this.applyProperty(this._renderedMainElement, 'Disabled');
    }

    get Disabled()
    {
        return this.converters.boolean(this._Disabled);
    }

    getElementProperites()
    {
        var props = super.getElementProperites();
        props['Checked'] =  new TWebControlProperty("checked", "_Checked", this.converters.boolean, true);
        props['Disabled'] =  new TWebControlProperty("disabled", "_Disabled", "Disabled");
        return props;
    }

    //@Override
    createMainElement(){
        var d = super.createMainElement();

        this.event.registerTriggerElement( d, 'click', 'Click' );
        this.event.registerTriggerElement( d, 'change', 'Change' );

        return d;
    }
}