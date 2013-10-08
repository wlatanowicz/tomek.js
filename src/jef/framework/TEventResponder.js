/** section: Controls
 * mixin TEventResponderMixin
 * 
 * Mixin adding ability to handle events
 * 
 **/
var TEventResponderMixin = {
	
	/**
	 * TEventResponderMixin._triggersEvents -> Array[String]
	 *
	 * List of events triggered by the control
	 * 
	 **/
	_triggersEvents : [],
	
	/**
	 * TEventResponderMixin._eventResponders -> Hash[Array[Function]]
	 * 
	 * Keeps track of attached responder functions
	 * 
	 **/
	_eventResponders : {},
	
	/**
	 * TEventResponderMixin._triggerElements -> Array[EventTrigger]
	 * 
	 * Keeps track of DOMElements, DOMEevents and triggered events
	 * 
	 **/
	_triggerElements : [], 
	
	//@Override
	constructor : function( options ){
		this.base( options );
		this._eventResponders = {};
		this._triggerElements = []; 
	},
	
	/**
	 * TEventResponderMixin.triggersEvent( e ) -> Boolean
	 * - e (String): event name
	 * 
	 * Checks if the control triggers particular event
	 * 
	 **/
	triggersEvent : function( e ){
		return this._triggersEvents.indexOf( e ) >= 0
				? true
				: false;
	},
	
	/**
	 * TEventResponderMixin.respondsToEvent( e ) -> Boolean
	 * - e (String): event name
	 * 
	 * Checks if the control responds to particular event
	 * which means it triggers it and has a responder
	 * function attached
	 * 
	 **/
	respondsToEvent : function( e ){
		return this.triggersEvent( e )
				&& this._eventResponders[e]
				&& this._eventResponders[e].length > 0
				? true
				: false;
	},
	
	/**
	 * TEventResponderMixin.triggerEvent( e[, param] ) -> void
	 * - e (String): event name
	 * - param (EventParameter): event parameter
	 * 
	 * Triggers event
	 * and calls attached event responder functions
	 * 
	 **/
	triggerEvent : function( e, param ){
		if ( this._eventResponders[e] ){
			for ( var f in this._eventResponders[e] ){
				this._eventResponders[e][f]( this, param );
			}
		}
	},
	
	/**
	 * TEventResponderMixin.triggerEventFromElement( e, dom_event ) -> void
	 * - e (String): event name
	 * - dom_event (DOMEvent): dom event
	 * 
	 * Serves as dom event listener and triggers proper event.
	 * Should not be called directly.
	 * 
	 **/
	triggerEventFromElement : function( e, dom_event ){
		var param = {
				'event' : e,
				'domEvent' : dom_event || window.event
			};
		this.triggerEvent( e, param );
	},
	
	/**
	 * TEventResponderMixin.attachEvent( e, fun ) -> void
	 * - e (String): event name
	 * - fun (Function): event responder function. Should accept two parameters: a sender - triggering control and a param - stuff that control would like to tell you about the event.
	 * 
	 * Attaches event responder function
	 * 
	 **/
	attachEvent : function( e, fun ){
		
		if ( ! this.triggersEvent( e ) ){
			throw new Exception( 'Control does not trigger event '+e );
		}
		
		if ( ! this._eventResponders[e] ){
			this._eventResponders[e] = [];
		}
		this._eventResponders[e].push( fun );
		
		for ( var e_rec_idx in this._triggerElements ){
			var e_rec = this._triggerElements[e_rec_idx];
			if ( e_rec.event == e ){
				this.addEventListener( e_rec );
			}
		}
	},
	
	/**
	 * TEventResponderMixin.dettachEvent( e [, fun] ) -> void
	 * - e (String): event name
	 * - fun (Function): event responder function
	 * 
	 * Removes event responder function or all responder function if no one given
	 * 
	 **/
	dettachEvent : function( e, fun ){
		if ( ! fun ){
			this._eventResponders[e] = [];
		}else{
			var new_list = [];
			for ( var f in this._eventResponders[e] ){
				if ( f != fun ){
					new_list.push( f );
				}
			}
			this._eventResponders[e] = new_list;
		}
		
		if ( ! this.respondsToEvent( e ) ){
			for ( var e_rec_idx in this._triggerElements ){
				var e_rec = this._triggerElements[e_rec_idx];
				if ( e_rec.event == e ){
					this.removeEventListener( e_rec );
				}
			}
		}
		
	},
	
	/**
	 * TEventResponderMixin.addEventListener( event_rec ) -> void
	 * - event_rec (EventTrigger): trigger
	 * 
	 * Attaches event listener to trigger DOMElement
	 * 
	 **/
	addEventListener : function( event_rec ){
		event_rec.element.addEventListener( event_rec.domEvent, event_rec.boundFunction );
	},
	
	/**
	 * TEventResponderMixin.removeEventListener( event_rec ) -> void
	 * - event_rec (EventTrigger): trigger
	 * 
	 * Removes event listener from trigger DOMElement
	 * 
	 **/
	removeEventListener : function( event_rec ){
		event_rec.element.removeEventListener( event_rec.domEvent, event_rec.boundFunction );
	},
	
	/**
	 * TEventResponderMixin.registerTriggerElement( el, dom_event, jef_event ) -> void
	 * - el (DOMElement): element to attach listener to
	 * - dom_event (String): DOMEvent name
	 * - jef_event (String): event name
	 * 
	 * Registers DOMElement to trigger event on particular DOMEvent
	 * 
	 **/
	registerTriggerElement : function( el, dom_event, jef_event ){
		var e = {
			'element' : el,
			'domEvent' : dom_event,
			'event' : jef_event,
			'boundFunction' : this.triggerEventFromElement.bind( this, jef_event )
		};
		this._triggerElements.push( e );
		if ( this.respondsToEvent( jef_event ) ){
			this.addEventListener( e );
		}
	},
	
	/**
	 * TEventResponderMixin.registerTriggerElements( triples ) -> void
	 * - triples (Array): array of three element arrays [ DOMElement, DOMEvent name, event name ]
	 * 
	 * Registers multiple DOMElements to trigger events on particular DOMEvents
	 * 
	 **/
	registerTriggerElements : function( triples ){
		for ( var i in triples ){
			var t = triples[i];
			this.registerTriggerElement( t[0], t[1], t[2] );
		}
	},
	
	/**
	 * TEventResponderMixin.registerTriggerElementMultipleEvents( el, pairs ) -> void
	 * - el (DOMElement): element
	 * - pairs (Array): array of two element arrays [ DOMEvent name, event name ]
	 * 
	 * Registers single DOMElement to trigger multiple events on particular DOMEvents
	 * 
	 **/
	registerTriggerElementMultipleEvents : function( el, pairs ){
		for ( var i in pairs ){
			var p = pairs[i];
			this.registerTriggerElement( el, p[0], p[1] );
		}
	}	
	
};

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
