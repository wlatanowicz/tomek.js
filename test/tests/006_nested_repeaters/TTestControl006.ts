import TTemplateControl from "@framework/TTemplateControl";
import template from "./TTestControl006.tpl";

export default class TTestControl006 extends TTemplateControl
{
	template = template;

	itemCreated( sender, param )
	{
		var r = param.item.findChildControlByID( 'InnerRep' );
		r.DataSource = param.dataItem;
	}
	
}
