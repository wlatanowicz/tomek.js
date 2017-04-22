import TTemplateControl from "@framework/TTemplateControl";
import template from "./MobileHelloWorld.tpl";

export default class MobileHelloWorld extends TTemplateControl
{
    template = template;

	buttonClicked(sender, param)
	{
		sender.Text = 'Hello world!';
	}
}
