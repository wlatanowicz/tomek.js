import TemplateControl from "@framework/TemplateControl";
import template from "./RouteView.tpl";

export default class RouteView extends TemplateControl {
  template = template;

  tabBecameActive(sender, param) {
    this.$(sender.ID + 'Button').addCssClass('current');
  }

  tabBecameInactive(sender, param) {
    this.$(sender.ID + 'Button').removeCssClass('current');
  }
}
