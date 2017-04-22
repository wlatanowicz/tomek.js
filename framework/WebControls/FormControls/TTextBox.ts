import TWebControl from "@framework/WebControls/TWebControl";
import TEventResponderInterface from "@framework/TEventResponderInterface";
import TEventResponder from "@framework/TEventResponder";
import TValidatableInterface from "@framework/WebControls/ValidationControls/TValidatableInterface";
import TWebControlProperty from "@framework/WebControls/TWebControlProperty";

/** section: WebControls_FormControls
 * class TTextBox < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a text input
 * 
 * ##### Triggered events
 * 
 * `on:Change`
 * `on:KeyUp`
 * `on:KeyDown`
 * `on:Blur`
 * `on:Focus`
 * 
 **/
export default class TTextBox extends TWebControl implements TEventResponderInterface, TValidatableInterface
{
    //@Override
    _tagName = 'input';

    _singleLineTagName = 'input';
    _multiLineTagName = 'textarea';

    //@Override
    _rendersChildControls = false;

    public IsValid;

    private _event = null;

    get event():TEventResponder
    {
        if (this._event === null) {
            this._event = new TEventResponder(this, ['Change','KeyUp','KeyDown','Blur','Focus']);
        }
        return this._event;
    }

    get Value()
    {
        return this.Text;
    }

    set Value( v )
    {
        this.Text = v;
    }

    /**
     * TTextBox#Text -> String
     **/
    private _Text;

    set Text(value)
    {
        this._Text = value;
        this.applyProperty(this._renderedMainElement, 'Text');
    }
    
    get Text()
    {
        this.fetchProperty(this._renderedMainElement, 'Text');
        return this.converters.string(this._Text);
    }
    
    private _Rows;

    set Rows(value)
    {
        this._Rows = value;
    }

    get Rows()
    {
        return this.converters.int(this._Rows);   
    }

    private _Cols;

    set Cols(value)
    {
        this._Cols = value;
    }

    get Cols()
    {
        return this.converters.int(this._Cols);
    }

    private _Disabled: any = false;

    set Disabled(value: any)
    {
        this._Disabled = value;
        this.applyProperty(this._renderedMainElement, 'Disabled');
    }

    get Disabled()
    {
        return this.converters.boolean(this._Disabled);
    }

    private _Type;

    set Type(value)
    {
        this._Type = value;
        this.applyProperty(this._renderedMainElement, 'Type')
    }

    get Type()
    {
        return this.converters.string(this._Type);
    }

    getElementProperites()
    {
        var props = super.getElementProperites();
        props['Text'] = new TWebControlProperty("value", "_Text", this.converters.string, true);
        props['Type'] = new TWebControlProperty("type", "_Type", this.converters.string);
        props['Disabled'] = new TWebControlProperty("disabled", "_Disabled", this.converters.boolean);
        return props;
    }
    
    //@Override
    createMainElement()
    {

        var rows = this.Rows;
        var cols = this.Cols;

        if ( rows > 1 ){
            this._tagName = this._multiLineTagName;
        }else{
            this._tagName = this._singleLineTagName;
        }

        var d = super.createMainElement();

        if (rows > 1){
            if (cols > 0){
                d['cols'] = cols;
            }
            d['rows'] = rows;
            d.removeAttribute( 'type' );
        }else{
            if (cols > 0){
                d['size'] = cols;
            }
        }

        this.event.registerTriggerElement(d, 'change', 'Change');
        this.event.registerTriggerElement(d, 'keyup', 'KeyUp');
        this.event.registerTriggerElement(d, 'keydown', 'KeyDown');
        this.event.registerTriggerElement(d, 'blur', 'Blur');
        this.event.registerTriggerElement(d, 'focus', 'Focus');

        return d;
    }
}