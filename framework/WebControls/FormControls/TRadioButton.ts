import TWebControl from "@framework/WebControls/TWebControl";
import TEventResponderInterface from "@framework/TEventResponderInterface";
import TEventResponder from "@framework/TEventResponder";
import TWebControlProperty from "@framework/WebControls/TWebControlProperty";

/** section: WebControls_FormControls
 * class TRadioButton < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a radio button input
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * `on:Change`
 * 
 **/
class TRadioButton extends TWebControl implements TEventResponderInterface
{
    //@Override
    _tagName = 'input';

    //@Override
    _rendersChildControls = false;

    private _event = null;

    get event():TEventResponder
    {
        if (this._event === null) {
            this._event = new TEventResponder(this, ['Click', 'Change']);
        }
        return this._event;
    }

    //@Override
    getDefaultAttributes()
    {
        return { type: 'radio' };
    }

    /**
     * TRadioButton#Checked -> Boolean
     **/

    private _Checked:any = false;

    set Checked(v)
    {
        this._Checked = v;
        this.applyProperty(this._renderedMainElement, 'Checked');
    }

    get Checked(){
        this.fetchProperty(this._renderedMainElement, 'Checked');
        return this.converters.boolean(this._Checked);
    }

    set Value(v)
    {
        this.Checked = v;
    }

    get Value()
    {
        return this.Checked;
    }

    /**
     * TRadioButton#Group -> String
     **/

    private _Group;

    set Group(v)
    {
        this._Group = v;
        this.applyProperty(this._renderedMainElement, 'Group')
    }

    get Group()
    {
        return this.converters.string(this._Group);
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
        props['Checked'] = new TWebControlProperty("checked", "_Checked", this.converters.boolean, true);
        props['Disabled'] = new TWebControlProperty("disabled", "_Disabled", "Disabled");
        props['Group'] = new TWebControlProperty("name", "_Group", "Group");
        return props;
    }

    //@Override
    createMainElement()
    {
        var d = super.createMainElement();

        this.event.registerTriggerElement( d, 'click', 'Click' );
        this.event.registerTriggerElement( d, 'change', 'Change' );

        return d;
    }
}