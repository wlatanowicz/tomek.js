import TCase from "@framework/TCase";
import TException from "@framework/TException"

/** section: Controls
 * class TSwitchView < TCase
 * 
 * Switch view. Renders only one of it's [[TCase]] subviews.
 * 
 **/
export default class TSwitchView extends TCase
{
	setupVisibility()
    {
		this.ensureChildControls();
		var visible_set = false;
		var i;
		for ( i=0; i<this._childControls.length; i++ ){
			var c = this._childControls[i];
			if ( !visible_set
					&& c.Condition ){
				visible_set = true;
				c.Visible = true;
			}else{
				c.Visible = false;
			}
		}
	}

	addChildControl(c)
    {
		if ( ! c.isKindOf( TCase ) ){
			throw new TException( 'TSwitchView can accept only TCase' );
		}
		super.addChildControl(c);
	}
	
	render()
    {
		this.setupVisibility();
		super.render();
	}
	
	renderContentsInPlaceholder(placeholder)
    {
		this.setupVisibility();
		super.renderContentsInPlaceholder(placeholder);
	}
}
