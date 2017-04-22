import TWebControl from "@framework/WebControls/TWebControl";
import TExpression from "@framework/TExpression";
import TException from "@framework/TException";

/** section: WebControls
 * class TLabel <  TWebControl
 * 
 * Control renders a label for control
 * 
 **/
export default class TLabel extends TWebControl
{
    //@Override
    _tagName = 'label';

    /**
     * TButton#Text -> String
     **/

    /**
     * TButton#ForControl -> String
     **/

    private _Text;

    set Text(value)
    {
        this._Text = value;
    }

    get Text()
    {
        return this.converters.string(this._Text);
    }

    private _ForControl;

    set ForControl(value)
    {
        this._ForControl = value;
    }

    get ForControl()
    {
        var c = this._ForControl;
        if ( typeof( c ) == 'string' ){
            return this.findControlByID(this._ForControl);
        }
        if (c != null && c instanceof TWebControl){
            return c;
        }
        if (c != null && c instanceof TExpression){
            var c2 = c.valueOf();
            if (c2 != null && c2 instanceof TWebControl){
                return c2;
            }
        }
        if (c != null){
            throw new TException( 'Bad ForControl '+c );
        }
        return null;
    }

    get ForControlId()
    {
        var c = this.ForControl;
        if ( c != null ){
            c.ensureHtmlID();
            return c.HtmlID;
        }
        return null;
    }

    //@Override
    createMainElement()
    {
        var d = super.createMainElement();

        var for_id = this.ForControlId;
        if (for_id){
            d.setAttribute('for', for_id);
        }

        if (this.Text.length > 0){
            var t = document.createTextNode(this.Text);
            d.appendChild(t);
        }

        return d;
    }
}