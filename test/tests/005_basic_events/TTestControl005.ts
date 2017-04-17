import TTemplateControl from "@framework/TTemplateControl";
import template from "./TTestControl005.tpl";

export default class TTestControl005 extends TTemplateControl
{
	template = template;

	clicks = 0;
	lastSender = null;
	
	buttonClicked( sender, param ){
		this.lastSender = sender;
		this.clicks++;
	}
	
}
