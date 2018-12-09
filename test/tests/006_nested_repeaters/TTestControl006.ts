import TemplateControl from "@framework/TemplateControl";
import template from "./TTestControl006.tpl";

export default class TTestControl006 extends TemplateControl {
  template = template;

  itemCreated(sender, param) {
    var r = param.item.findChildControlByID('InnerRep');
    r.DataSource = param.dataItem;
  }

}
