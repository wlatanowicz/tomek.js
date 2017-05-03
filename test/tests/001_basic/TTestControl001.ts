import TemplateControl from "@framework/TemplateControl";
import template from "./TTestControl001.tpl";

export default class TTestControl001 extends TemplateControl
{

    template = template;

	txt = null;
	
	setTestText(v)
    {
		this.txt = v;
	}
	
	getTestText()
    {
		return this.txt ? this.txt : 'Lorem ipsum'
	}
	
}
