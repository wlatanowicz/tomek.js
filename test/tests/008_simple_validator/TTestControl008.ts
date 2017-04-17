import TTemplateControl from "@framework/TTemplateControl";
import template from "./TTestControl008.tpl";

export default class TTestControl008 extends TTemplateControl
{
    template = template;

	validationResult = null;
	
	buttonClicked( sender, param ){
		this.validationResult = sender.findControlByID( 'Form' ).validate() ? 'OK' : 'ERR';
	}
}