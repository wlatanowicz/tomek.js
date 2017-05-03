import template from "./HelloWorld.tpl";
import TemplateControl from "@framework/TemplateControl";

export default class HelloWorld extends TemplateControl {

	template = template;

	buttonClicked(sender, param){
		console.log(this);
		sender.Text = 'Hello world!';
	}
}
