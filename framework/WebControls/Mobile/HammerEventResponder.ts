import EventResponder from "@framework/EventResponder";

export default class HammerEventResponder extends EventResponder
{
    protected _hammerEvents;

    constructor(control, events, hammerEvent) {
        super(control, events);
        this._hammerEvents = hammerEvent;
    }

    addEventListener( element, domEvent, boundFunction )
    {
        if ( element.touchAction && this._hammerEvents.indexOf(domEvent) >= 0 ){
            //hammer.js
            element.get( domEvent ).set({ enable: true });
            element.on( domEvent, boundFunction );
        }else
        {
            super.addEventListener( element, domEvent, boundFunction );
        }
    }
}
