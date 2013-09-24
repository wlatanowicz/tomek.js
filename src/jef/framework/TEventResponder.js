/**
 * Mixin adding ability to handle events
 */
var TEventResponderMixin = {
	
	/**
	 * Array of String
	 * List of events triggered by the control
	 */
	_triggersEvents : [],
	
	/**
	 * Hash of Array
	 * Keeps track of attached responder functions
	 */
	_eventResponders : {},
	
	/**
	 * Array of Object
	 * Keeps track of DOMElements, DOMEevents and triggered events
	 * Object is defined as:
	 * {
	 *	element : DOMElement,
	 *	dom_event : String,
	 *	event : String,
	 *	bound_function : Function
	 * }
	 */
	_triggerElements : [], 
	
	constructor : function( options ){
		this.base( options );
		this._eventResponders = {};
		this._triggerElements = []; 
	},
	
	/**
	 * Checks if the control triggers particular event
	 * 
	 * @param e String event name
	 * 
	 * @returns Boolean
	 */
	triggersEvent : function( e ){
		return this._triggersEvents.indexOf( e ) >= 0
				? true
				: false;
	},
	
	/**
	 * Checks if the control responds to particular event
	 * which means it triggers it and has a responder
	 * function attached
	 * 
	 * @param e String event name
	 * 
	 * @returns Boolean
	 */
	respondsToEvent : function( e ){
		return this.triggersEvent( e )
				&& this._eventResponders[e]
				&& this._eventResponders[e].length > 0
				? true
				: false;
	},
	
	/**
	 * Triggers event
	 * and calls attached event responder functions
	 * 
	 * @params e String event name
	 */
	triggerEvent : function( e ){
		if ( this._eventResponders[e] ){
			for ( var f in this._eventResponders[e] ){
				this._eventResponders[e][f]( this );
			}
		}
	},
	
	/**
	 * Attaches event responder function
	 * 
	 * @param e String event name
	 * @param fun Function event responder function
	 */
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
	 * Removes event responder function or all responder function if no one given
	 * 
	 * @param e String event name
	 * @param fun Function optional, event responder function
	 */
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
	 * Attaches event listener to trigger DOMElement
	 * @param event_rec Object as defined in _triggerElements
	 */
	addEventListener : function( event_rec ){
		event_rec.element.addEventListener( event_rec.dom_event, event_rec.bound_function );
	},
	
	/**
	 * Removes event listener from trigger DOMElement
	 * @param event_rec Object as defined in _triggerElements
	 */
	removeEventListener : function( event_rec ){
		event_rec.element.removeEventListener( event_rec.dom_event, event_rec.bound_function );
	},
	
	/**
	 * Registers DOMElement to trigger event on particular DOMEvent
	 * 
	 * @param el DOMElement element to attach listener to
	 * @param dom_event String DOMEvent name
	 * @param jef_ecent String event name
	 */
	registerTriggerElement : function( el, dom_event, jef_event ){
		var e = {
			'element' : el,
			'dom_event' : dom_event,
			'event' : jef_event,
			'bound_function' : this.triggerEvent.bind( this, jef_event )
		};
		this._triggerElements.push( e );
		if ( this.respondsToEvent( jef_event ) ){
			this.addEventListener( e );
		}
	},
	
	/**
	 * Registers multiple DOMElements to trigger events on particular DOMEvents
	 * 
	 * @param triples Array of three element arrays [ DOMElement, DOMEvent name, event name ]
	 */
	registerTriggerElements : function( triples ){
		for ( var i in triples ){
			var t = triples[i];
			this.registerTriggerElement( t[0], t[1], t[2] );
		}
	},
	
	/**
	 * Registers single DOMElement to trigger multiple events on particular DOMEvents
	 * 
	 * @param el DOMElement
	 * @param pairs Array of two element arrays [ DOMEvent name, event name ]
	 */
	registerTriggerElementMultipleEvents : function( el, pairs ){
		for ( var i in pairs ){
			var p = pairs[i];
			this.registerTriggerElement( el, p[0], p[1] );
		}
	}	
	
};