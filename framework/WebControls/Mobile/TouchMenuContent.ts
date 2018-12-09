import Panel from "@framework/WebControls/Panel";

export default class TouchMenuContent extends Panel {
  setAdditionalCssClasses(class_string: string): string {
    var class_a = class_string.split(' ');

    if (class_a.indexOf('content') == -1) {
      class_a.push('content');
    }

    if (class_a.indexOf('menu-content') == -1) {
      class_a.push('menu-content');
    }

    if (class_a.indexOf('menu-animated') == -1) {
      class_a.push('menu-animated');
    }

    return class_a.join(' ');
  }

  get CssClass() {
    var cssClass = this.converters.string(this._CssClass);
    return this.setAdditionalCssClasses(cssClass);
  }

  set CssClass(value: any) {
    this._CssClass = value;
    this.applyProperty(this._renderedMainElement, 'CssClass');
  }
}
