import template from "./DependencyInjection.tpl";
import TemplateControl from "@framework/TemplateControl";
import GreetingsProvider from "@app/dependency_injection/GreetingsProvider";

export default class DependencyInjection extends TemplateControl {

	template = template;

	greetingsProvider: GreetingsProvider;

    constructor(greetingsProvider: GreetingsProvider)
    {
        super();
        this.greetingsProvider = greetingsProvider;
    }

    buttonClicked(sender, param){
		console.log(this);
		sender.Text = this.greetingsProvider.Greetings;
	}
}
