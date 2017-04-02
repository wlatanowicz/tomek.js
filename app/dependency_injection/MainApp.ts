import template from "@app/dependency_injection/MainApp.tpl.ts";
import TTemplateControl from "@framework/TTemplateControl";

export default class MainApp extends TTemplateControl {

    template = template;

    constructor(placeholder)
    {
        super();
        this.Placeholder = placeholder;
    }
}
