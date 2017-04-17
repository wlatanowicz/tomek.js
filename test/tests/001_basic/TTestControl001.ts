import TTemplateControl from "@framework/TTemplateControl";
import template from "./TTestControl001.tpl";

export default class TTestControl001 extends TTemplateControl
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
