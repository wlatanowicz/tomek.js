import TTemplateControl from "@framework/TTemplateControl";
import template from "@app/route_view/RouteView.tpl.ts";

export default class RouteView extends TTemplateControl
{
	template = template;

	tabBecameActive(sender, param){
		this.$( sender.ID + 'Button' ).addCssClass( 'current' );
	}
	
	tabBecameInactive(sender, param)
	{
		this.$( sender.ID + 'Button' ).removeCssClass( 'current' );
	}
}
