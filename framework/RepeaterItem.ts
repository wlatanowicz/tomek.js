import Stencil from "@framework/Stencil";

/** section: Controls
 * class RepeaterItem < Stencil
 * 
 * Control used to render multiple times the same template
 * in repeater and similiar contexts
 * 
 **/
export default class RepeaterItem extends Stencil
{

    /**
     * RepeaterItem#ItemIndex -> int
     **/

    /**
     * RepeaterItem#Repeater -> Repeater
     **/

    protected _ItemIndex;

    set ItemIndex(v)
    {
        this._ItemIndex = v;
    }

    get ItemIndex()
    {
        return this.converters.int(this._ItemIndex);
    }

    protected _Repeater;

    set Repeater(v)
    {
        this._Repeater = v;
    }

    get Repeater()
    {
        return this.converters.object(this._Repeater);
    }
}
