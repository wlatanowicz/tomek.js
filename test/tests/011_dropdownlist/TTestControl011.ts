import TTemplateControl from "@framework/TTemplateControl";
import template from "./TTestControl011.tpl";

export default class TTestControl011 extends TTemplateControl
{
    template = template;
	
	getDdlOptions()
    {
		return [
			{ value: 'a', text: 'AA' },
			{ value: 'b', text: 'BB' },
			{ value: 'c', text: 'CC', 'disabled' : true },
			{ value: 'd', text: 'DD' }
		];
	}
}
