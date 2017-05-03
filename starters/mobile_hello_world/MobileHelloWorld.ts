import TemplateControl from "@framework/TemplateControl";
import template from "./MobileHelloWorld.tpl";

export default class MobileHelloWorld extends TemplateControl
{
    template = template;

	buttonClicked(sender, param)
	{
		sender.Text = 'Hello world!';
	}
}
