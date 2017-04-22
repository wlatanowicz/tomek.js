import TPanel from "@framework/WebControls/TPanel";
import TEventResponderInterface from "@framework/TEventResponderInterface";
import THammerEventResponder from "@framework/WebControls/Mobile/THammerEventResponder";
import TEventResponder from "@framework/TEventResponder";

var Hammer = require("hammerjs");

export default class TGesturePanel extends TPanel implements TEventResponderInterface {

    _hammer: Hammer = null;
    _hammerEvents = ['tap', 'doubletap', 'press', 'pan', 'swipe', 'pinch', 'rotate'];

    _triggersEvents = ['Tap', 'DoubleTap', 'Press', 'Pan', 'Swipe', 'Pinch', 'Rotate'];


    private _event = null;

    get event(): TEventResponder {
        if (this._event === null) {
            this._event = new THammerEventResponder(this, this._triggersEvents, this._hammerEvents);
        }
        return this._event;
    }

    private _Options: any = {};

    get Options(): any {
        return this.converters.object(this._Options);
    }

    set Options(value: any) {
        this._Options = value;
    }

    createMainElement() {
        var d = super.createMainElement();
        this._hammer = new Hammer(d);

        this.setHammerOptions(this._hammer);

        this.event.registerTriggerElement(this._hammer, 'tap', 'Tap');
        this.event.registerTriggerElement(this._hammer, 'doubletap', 'DoubleTap');
        this.event.registerTriggerElement(this._hammer, 'press', 'Press');
        this.event.registerTriggerElement(this._hammer, 'pan', 'Pan');
        this.event.registerTriggerElement(this._hammer, 'swipe', 'Swipe');
        this.event.registerTriggerElement(this._hammer, 'pinch', 'Pinch');
        this.event.registerTriggerElement(this._hammer, 'rotate', 'Rotate');

        return d;
    }

    setHammerOptions(h) {
        var options = this.Options;
        for (var e in options) {
            h.get(e).set(options[e]);
        }
    }
}
