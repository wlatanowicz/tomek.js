import template from "@app/HelloWorld.tpl.ts";
import TTemplateControl from "@framework/TTemplateControl";

export default class HelloWorld extends TTemplateControl {

	template = template;

	buttonClicked(sender, param){
		console.log(this);
		sender.Text = 'Hello world!';
	}
}
