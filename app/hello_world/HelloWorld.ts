import template from "@app/hello_world/HelloWorld.tpl.ts";
import TTemplateControl from "@framework/TTemplateControl";

export default class HelloWorld extends TTemplateControl {

	template = template;

	buttonClicked(sender, param){
		console.log(this);
		sender.Text = 'Hello world!';
	}
}
