import TStencil from "@framework/TStencil";

/** section: Controls
 * class TRepeaterItem < TStencil
 * 
 * Control used to render multiple times the same template
 * in repeater and similiar contexts
 * 
 **/
export default class TRepeaterItem extends TStencil
{

    /**
     * TRepeaterItem#ItemIndex -> int
     **/

    /**
     * TRepeaterItem#Repeater -> TRepeater
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
