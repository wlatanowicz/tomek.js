import template from "./DependencyInjection.tpl";
import TTemplateControl from "@framework/TTemplateControl";
import GreetingsProvider from "@app/dependency_injection/GreetingsProvider";

export default class DependencyInjection extends TTemplateControl {

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
