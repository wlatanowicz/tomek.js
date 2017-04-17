import template from "./MainApp.tpl";
import TTemplateControl from "@framework/TTemplateControl";

export default class MainApp extends TTemplateControl {

    template = template;

    constructor(placeholder)
    {
        super();
        this.Placeholder = placeholder;
    }
}
