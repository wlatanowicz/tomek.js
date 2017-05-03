import WebControl from "@framework/WebControls/WebControl";
import EventResponderInterface from "@framework/EventResponderInterface";
import ValidatableInterface from "@framework/WebControls/ValidationControls/ValidatableInterface";
import EventResponder from "@framework/EventResponder";
import WebControlProperty from "@framework/WebControls/WebControlProperty";
/** section: WebControls_FormControls
 * class FileUpload < WebControl
 * includes EventResponderMixin
 * 
 * Control renders a file input
 * 
 * ##### Triggered events
 * 
 * `on:Change`
 * 
 **/
export default class FileUpload extends WebControl implements EventResponderInterface, ValidatableInterface
{

    //@Override
    _tagName = 'input';

    //@Override
    _rendersChildControls = false;

    private _event = null;

    get event():EventResponder {
        if (this._event === null) {
            this._event = new EventResponder(this, ['Change']);
        }
        return this._event;
    }

    public IsValid;

    //@Override
    getDefaultAttributes()
    {
        return { type: 'file' };
    }

    private _Disabled = false;

    set Disabled(value: any)
    {
        this._Disabled = value;
        this.applyProperty(this._renderedMainElement, 'Disabled');
    }

    get Disabled()
    {
        return this.converters.boolean(this._Disabled);
    }

    private _Multiple = false;

    set Multiple(value: any)
    {
        this._Disabled = value;
        this.applyProperty(this._renderedMainElement, 'Multiple');
    }

    get Multiple()
    {
        this.fetchProperty(this._renderedMainElement, 'Multiple');
        return this.converters.boolean(this._Multiple);
    }

    private _Value;

    get Value()
    {
        this.fetchProperty(this._renderedMainElement, 'Value');
        return this.converters.string(this._Value);
    }

    private _File;

    get File()
    {
        this.fetchProperty(this._renderedMainElement, 'File');
        return this.converters.string(this._File);
    }

    private _Files;

    get Files()
    {
        this.fetchProperty(this._renderedMainElement, 'Files');
        return this.converters.string(this._Files);
    }

    getElementProperites()
    {
        var props = super.getElementProperites();
        props['Multiple'] = new WebControlProperty("multiple", "_Multiple", this.converters.boolean);
        props['Disabled'] = new WebControlProperty("disabled", "_Disabled", "Disabled");
        props['Value'] = new WebControlProperty("value", "_Value", this.converters.string, true, false);
        props['Files'] = new WebControlProperty("files", "_Files", this.converters.none, true, false);
        props['File'] = new WebControlProperty("file", "_File", this.converters.none, true, false);
        return props;
    }

    //@Override
    createMainElement()
    {
        var d = super.createMainElement();

        this.event.registerTriggerElement( d, 'change', 'Change' );

        return d;
    }
}
