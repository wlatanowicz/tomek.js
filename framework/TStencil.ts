import TControl from "@framework/TControl";

/** section: Controls
 * class TStencil < TControl
 * 
 * Control used to render multiple times the same template
 * in repeater and similiar contexts
 * 
 **/
export default class TStencil extends TControl
{

	/**
	 * TStencil#DataItem -> Object
	 **/
	
	/**
	 * TStencil#Type -> String
     * 
     * i.e. one of: `Header`, `Item`, `Footer` or `Empty`
	 **/

	protected _DataItem;

	set DataItem(v)
    {
        this._DataItem = v;
    }

    get DataItem()
    {
        return this.converters.object(this._DataItem);
    }

	protected _Type;

	set Type(v)
    {
        this._Type = v;
    }

    get Type()
    {
        return this.converters.string(this._Type);
    }

    protected _Template = null;
	
	/**
	 * TStencil#useTemplate( template ) -> void
	 * - template (Function): template
	 * 
	 * Sets template function
	 * 
	 **/
	useTemplate(template)
    {
		this._Template = template;
	}

	createChildControls()
    {
        if (this._Template) {
            this._Template.call(this, this);
        }
    }
}
