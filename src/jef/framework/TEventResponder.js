var TEventResponderMixin = {
	
	_triggersEvents : [],
	
	_eventResponders : {},
	
	_triggerElements : [], 
	
	constructor : function( options ){
		this.base( options );
		this._eventResponders = {};
		this._triggerElements = []; 
	},
	
	triggersEvent : function( e ){
		return this._triggersEvents.indexOf( e ) >= 0
				? true
				: false;
	},
	
	respondsToEvent : function( e ){
		return this.triggersEvent( e )
				&& this._eventResponders[e]
				&& this._eventResponders[e].length > 0
				? true
				: false;
	},
	
	triggerEvent : function( e ){
		if ( this._eventResponders[e] ){
			for ( var f in this._eventResponders[e] ){
				this._eventResponders[e][f]( this );
			}
		}
	},
	
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
	
	addEventListener : function( event_rec ){
		event_rec.element.addEventListener( event_rec.dom_event, event_rec.bound_function );
	},
	
	removeEventListener : function( event_rec ){
		event_rec.element.removeEventListener( event_rec.dom_event, event_rec.bound_function );
	},
	
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
	
	registerTriggerElements : function( triples ){
		for ( var i in triples ){
			var t = triples[i];
			this.registerTriggerElement( t[0], t[1], t[2] );
		}
	},
	
	registerTriggerElementMultipleEvents : function( el, pairs ){
		for ( var i in pairs ){
			var p = pairs[i];
			this.registerTriggerElement( el, p[0], p[1] );
		}
	}	
	
};