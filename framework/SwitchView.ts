import Case from "@framework/Case";
import Exception from "@framework/Exception"

/** section: Controls
 * class SwitchView < Case
 * 
 * Switch view. Renders only one of it's [[Case]] subviews.
 * 
 **/
export default class SwitchView extends Case {
  setupVisibility() {
    this.ensureChildControls();
    var visible_set = false;
    var i;
    for (i = 0; i < this._childControls.length; i++) {
      var c = this._childControls[i];
      if (!visible_set
        && c.Condition) {
        visible_set = true;
        c.Visible = true;
      } else {
        c.Visible = false;
      }
    }
  }

  addChildControl(c) {
    if (!c.isKindOf(Case)) {
      throw new Exception('SwitchView can accept only Case');
    }
    super.addChildControl(c);
  }

  render() {
    this.setupVisibility();
    super.render();
  }

  renderContentsInPlaceholder(placeholder) {
    this.setupVisibility();
    super.renderContentsInPlaceholder(placeholder);
  }
}
