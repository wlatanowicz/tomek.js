import TemplateControl from "@framework/TemplateControl";
import template from "@app/HelloWorld.tpl";

export default class HelloWorld extends TemplateControl {

  template = template;

  buttonClicked(sender, param) {
    console.log(this);
    sender.Text = 'Hello world!';
  }
}
