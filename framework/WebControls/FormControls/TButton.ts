import TWebControl from "@framework/WebControls/TWebControl";
import TEventResponderInterface from "@framework/TEventResponderInterface";
import TEventResponder from "@framework/TEventResponder";
import TWebControlProperty from "@framework/WebControls/TWebControlProperty";

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
            this._event = new TEventResponder(this, ['Click']);
        }
        return this._event;
    }

    /**
     * TButton#Text -> String
     **/

    private _Text;

    set Text(value:any)
    {
        this._Text = value;
        if ( this._renderedTextNode ){
            this._renderedTextNode.textContent = this.converters.string(value);
        }
    }

    get Text()
    {
        return this.converters.string(this._Text);
    }

    private _Disabled;

    set Disabled(value: any)
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
        props['Disabled'] = new TWebControlProperty("disabled", "_Disabled", "Disabled");
        return props;
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