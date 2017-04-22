import TControl from "@framework/TControl";

/** section: Controls
 * class TCase < TControl
 * 
 * Subview of [[TSwitchView]]
 * 
 **/
export default class TCase extends TControl
{

    /**
     * TCase#Condition -> bool
     **/

    private _Condition = true;

    set Condition(value:any)
    {
        this._Condition = value;
    }

    get Condition()
    {
        return this.converters.boolean(this._Condition);
    }
}