import TemplateControl from "@framework/TemplateControl";
import template from "./TTestControl015.tpl";

export default class TTestControl015 extends TemplateControl
{
    template = template;

	tabTwoBecameActive(sender, param)
    {
		this.$('OptionL').Text = param.newParams.option;
	}
}
