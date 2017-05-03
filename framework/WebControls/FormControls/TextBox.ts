import WebControl from "@framework/WebControls/WebControl";
import EventResponderInterface from "@framework/EventResponderInterface";
import EventResponder from "@framework/EventResponder";
import ValidatableInterface from "@framework/WebControls/ValidationControls/ValidatableInterface";
import WebControlProperty from "@framework/WebControls/WebControlProperty";

/** section: WebControls_FormControls
 * class TextBox < WebControl
 * includes EventResponderMixin
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
export default class TextBox extends WebControl implements EventResponderInterface, ValidatableInterface
{
    //@Override
    _tagName = 'input';

    _singleLineTagName = 'input';
    _multiLineTagName = 'textarea';

    //@Override
    _rendersChildControls = false;

    public IsValid;

    private _event = null;

    get event():EventResponder
    {
        if (this._event === null) {
            this._event = new EventResponder(this, ['Change','KeyUp','KeyDown','Blur','Focus']);
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
     * TextBox#Text -> String
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
        props['Text'] = new WebControlProperty("value", "_Text", this.converters.string, true);
        props['Type'] = new WebControlProperty("type", "_Type", "Type");
        props['Disabled'] = new WebControlProperty("disabled", "_Disabled", "Disabled");
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