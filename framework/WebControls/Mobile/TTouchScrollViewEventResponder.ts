import TEventResponder from "@framework/TEventResponder";
import TTouchScrollView from "@framework/WebControls/Mobile/TTouchScrollView";

export default class TTouchScrollViewEventResponder extends TEventResponder
{
    _refreshResponderAttached = false;

    attach(e, fun)
    {
        super.attach(e, fun);
        if (e == 'Refresh'
            && !this._refreshResponderAttached
            && this.control instanceof TTouchScrollView) {
            this.attach('Scroll', this.control.scrolled.bind(this.control));
            this._refreshResponderAttached = true;
        }
    }
}
