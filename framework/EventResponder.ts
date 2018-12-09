import Exception from "@framework/Exception";

//@TODO split to common TEventHandler and TDomElementEventHandler

/** section: Controls
 * mixin EventResponderMixin
 * 
 * Mixin adding ability to handle events
 * 
 **/
export default class EventResponder {

  /**
   * EventResponderMixin#_triggersEvents -> Array@String
   *
   * List of events triggered by the control
   *
   **/
  _triggersEvents = [];

  /**
   * EventResponderMixin#_eventResponders -> Hash@Array@Function
   *
   * Keeps track of attached responder functions
   *
   **/
  _eventResponders = {};

  control = null;

  /**
   * EventResponderMixin#_triggerElements -> Array@EventTrigger
   *
   * Keeps track of DOMElements, DOMEevents and triggered events
   *
   **/
  _triggerElements = [];

  //@Override
  constructor(control, events) {
    this.control = control;
    this._triggersEvents = events;
    this._eventResponders = {};
    this._triggerElements = [];
  }

  /**
   * EventResponderMixin#triggersEvent( e ) -> Boolean
   * - e (String): event name
   *
   * Checks if the control triggers particular event
   *
   **/
  triggers(e): boolean {
    return this._triggersEvents.indexOf(e) >= 0;
  }

  /**
   * EventResponderMixin#respondsToEvent( e ) -> Boolean
   * - e (String): event name
   *
   * Checks if the control responds to particular event
   * which means it triggers it and has a responder
   * function attached
   *
   **/
  respondsTo(e): boolean {
    return this.triggers(e)
      && this._eventResponders[e]
      && this._eventResponders[e].length > 0;
  }

  /**
   * EventResponderMixin#triggerEvent( e[, param] ) -> void
   * - e (String): event name
   * - param (EventParameter): event parameter
   *
   * Triggers event
   * and calls attached event responder functions
   *
   **/
  trigger(e, param) {
    var results = [];
    if (this._eventResponders[e]) {
      for (var i = 0; i < this._eventResponders[e].length; i++) {
        results.push(this._eventResponders[e][i](this.control, param));
      }
    }
    return results;
  }

  /**
   * EventResponderMixin#triggerEventFromElement( e, dom_event ) -> void
   * - e (String): event name
   * - prevent_default (Boolean): will prevent deafult browser event if true
   * - dom_event (DOMEvent): dom event
   *
   * Serves as dom event listener and triggers proper event.
   * Should not be called directly.
   *
   **/
  triggerFromElement(e, prevent_default, dom_event) {
    if (prevent_default) {
      dom_event.preventDefault();
    }
    var param = {
      'event': e,
      'domEvent': dom_event || window.event
    };
    return this.trigger(e, param);
  }

  /**
   * EventResponderMixin#attachEvent( e, fun ) -> void
   * - e (String): event name
   * - fun (Function): event responder function. Should accept two parameters: a sender - triggering control and a param - stuff that control would like to tell you about the event.
   *
   * Attaches event responder function
   *
   **/
  attach(e, fun) {

    if (!this.triggers(e)) {
      throw new Exception('Control does not trigger event ' + e);
    }

    if (!this._eventResponders[e]) {
      this._eventResponders[e] = [];
    }
    this._eventResponders[e].push(fun);

    for (var e_rec_idx in this._triggerElements) {
      var e_rec = this._triggerElements[e_rec_idx];
      if (e_rec.event == e) {
        this.addEventListener(e_rec.element, e_rec.domEvent, e_rec.boundFunction);
      }
    }
  }

  /**
   * EventResponderMixin#dettachEvent( e [, fun] ) -> void
   * - e (String): event name
   * - fun (Function): event responder function
   *
   * Removes event responder function or all responder function if no one given
   *
   **/
  dettach(e, fun) {
    if (!fun) {
      this._eventResponders[e] = [];
    } else {
      var new_list = [];
      for (var f in this._eventResponders[e]) {
        if (f != fun) {
          new_list.push(f);
        }
      }
      this._eventResponders[e] = new_list;
    }

    if (!this.respondsTo(e)) {
      for (var e_rec_idx in this._triggerElements) {
        var e_rec = this._triggerElements[e_rec_idx];
        if (e_rec.event == e) {
          this.removeEventListener(e_rec.element, e_rec.domEvent, e_rec.boundFunction);
        }
      }
    }

  }

  /**
   * EventResponderMixin#addEventListener( event_rec ) -> void
   * - element (DOMElement): element
   * - domEvent (String): name of HTML event
   * - boundFunction (Function): a function
   *
   * Attaches event listener to trigger DOMElement
   *
   **/
  addEventListener(element, domEvent, boundFunction) {
    element.addEventListener(domEvent, boundFunction);
  }

  /**
   * EventResponderMixin#removeEventListener( event_rec ) -> void
   * - element (DOMElement): element
   * - domEvent (String): name of HTML event
   * - boundFunction (Function): a function
   *
   * Removes event listener from trigger DOMElement
   *
   **/
  removeEventListener(element, domEvent, boundFunction) {
    element.removeEventListener(domEvent, boundFunction);
  }

  /**
   * EventResponderMixin#registerTriggerElement( el, dom_event, tomek_event ) -> void
   * - el (DOMElement): element to attach listener to
   * - dom_event (String): DOMEvent name
   * - tomek_event (String): event name
   * - prevent_default (Boolean): will prevent deafult browser event if true (optional)
   *
   * Registers DOMElement to trigger event on particular DOMEvent
   *
   **/
  registerTriggerElement(el, dom_event: string, tomek_event: string, prevent_default: boolean = false) {
    var e = {
      'element': el,
      'domEvent': dom_event,
      'event': tomek_event,
      'boundFunction': this.triggerFromElement.bind(this, tomek_event, prevent_default)
    };
    this._triggerElements.push(e);
    if (this.respondsTo(tomek_event)) {
      this.addEventListener(e.element, e.domEvent, e.boundFunction);
    }
  }

}

/** section: Utilities
 * class EventTrigger
 *
 **/

/**
 * EventTrigger.element -> DOMElement
 **/

/**
 * EventTrigger.domEvent -> String
 **/

/**
 * EventTrigger.event -> String
 **/

/**
 * EventTrigger.boundFunction -> Function
 **/


/** section: Utilities
 * class EventParameter
 *
 **/

/**
 * EventParameter.domEvent -> DOMEvent
 **/

/**
 * EventParameter.event -> String
 **/
