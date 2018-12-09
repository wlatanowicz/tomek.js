import EventResponder from "@framework/EventResponder";
import TouchScrollView from "@framework/WebControls/Mobile/TouchScrollView";

export default class TouchScrollViewEventResponder extends EventResponder {
  _refreshResponderAttached = false;

  attach(e, fun) {
    super.attach(e, fun);
    if (e == 'Refresh'
      && !this._refreshResponderAttached
      && this.control instanceof TouchScrollView) {
      this.attach('Scroll', this.control.scrolled.bind(this.control));
      this._refreshResponderAttached = true;
    }
  }
}
