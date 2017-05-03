import Control from "@framework/Control";

/** section: Controls
 * class Literal < Control
 * 
 * Simple control rendering text
 * 
 **/
export default class Literal extends Control {

    _textNode = null;

    constructor()
    {
        super();
        this._textNode = null;
    };

    /**
     * Literal#Text -> String
     **/

    private _Text;

    set Text(value)
    {
        this._Text = value;
        if (this._textNode){
            this._textNode.textContent = this.Text;
        }
    }

    get Text(): string
    {
        return this.converters.string(this._Text);
    }

    //@Override
    renderContents(){
        var t = document.createTextNode( this.Text );
        this._textNode = t;
        this.appendChild( t );
    }
}