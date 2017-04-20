import TWebControl from "@framework/WebControls/TWebControl";
import TEventResponderInterface from "@framework/TEventResponderInterface";
import TValidatableInterface from "@framework/WebControls/ValidationControls/TValidatableInterface";
import TEventResponder from "@framework/TEventResponder";
import TWebControlProperty from "@framework/WebControls/TWebControlProperty";
/** section: WebControls_FormControls
 * class TFileUpload < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a file input
 * 
 * ##### Triggered events
 * 
 * `on:Change`
 * 
 **/
export default class TFileUpload extends TWebControl implements TEventResponderInterface, TValidatableInterface
{
	
	//@Override
	_tagName = 'input';
	
	//@Override
	_rendersChildControls = false;

	private _event = null;

	get event():TEventResponder {
		if (this._event === null) {
			this._event = new TEventResponder(this, ['Change']);
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
        this.fetchProperty(this._renderedMainElement, 'Disabled');
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
        props['Multiple'] = new TWebControlProperty("multiple", "_Multiple", this.converters.boolean);
        props['Disabled'] = new TWebControlProperty("disabled", "_Disabled", this.converters.boolean);
        props['Value'] = new TWebControlProperty("disabled", "_Disabled", this.converters.string, true, false);
        props['Files'] = new TWebControlProperty("disabled", "_Disabled", this.converters.none, true, false);
        props['File'] = new TWebControlProperty("disabled", "_Disabled", this.converters.none, true, false);
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
