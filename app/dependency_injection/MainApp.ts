import template from "./MainApp.tpl";
import TemplateControl from "@framework/TemplateControl";

export default class MainApp extends TemplateControl {

  template = template;

  constructor(placeholder) {
    super();
    this.Placeholder = placeholder;
  }
}
