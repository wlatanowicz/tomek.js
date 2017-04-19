import TTemplateControl from "@framework/TTemplateControl";
import template from "./TTestControl015.tpl";

export default class TTestControl015 extends TTemplateControl
{
    template = template;

	tabTwoBecameActive(sender, param)
    {
		this.$('OptionL').Text = param.newParams.option;
	}
}
