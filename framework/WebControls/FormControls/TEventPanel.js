//= require TWebControl
//= require TEventResponder

/** section: WebControls_FormControls
 * class TEventPanel <  TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders an event listener panel
 * 
 * ##### Triggered events
 * 
 * `on:Click.*`
 * `on:RightClick.*`
 * 
 **/
klass( 'TEventPanel', TWebControl, [ TEventResponderMixin ], {
	
	//@Override
	_tagName : 'div',
	
	//@Override
	_triggersEvents : [],
	
	_stopOnEventAny : true,
	_stopOnEventList : [],
	
	_eventsLUT : {
		'click' : 'Click',
		'contextmenu' : 'RightClick'
	},
	
	constructor : function( options ){
		this.base( options );
		this._stopOnEventAny = true;
		this._stopOnEventList = [];
		
		this._triggersEvents = [];
		for ( var e in this._eventsLUT ){
			this._triggersEvents.push( this._eventsLUT[e] );
		}
		
	},
	
	setStopOnEvents : function( v ){
		if ( v === '*' ){
			this._stopOnEventAny = true;
			this._stopOnEventList = [];
		}else{
			this._stopOnEventAny = false;
			this._stopOnEventList = v.split( "," );
		}
	},
	
	attachEvent : function( e, fun ){
		
		var mainEvent = this.splitEvent( e ).main;

		if ( ! this.respondsToEvent( mainEvent ) ){
			this.base( mainEvent, this.domEventResponder.bind( this ) );
		}
		
		if ( ! this._eventResponders[e] ){
			this._eventResponders[e] = [];
		}
		this._eventResponders[e].push( fun );
	},
	
	splitEvent : function ( e ){
		var splittedEvent = e.split( '.', 2 );
		if ( splittedEvent.length !== 2 ){
			throw new Exception( 'Event should have two parts: main and extended ('+e+')' );
		}
		return {
			'main' : splittedEvent[0],
			'extended' : splittedEvent[1]
		};
	},
	
	domEventResponder : function( sender, inputParam ){
		var element = inputParam.domEvent.element();
		var domEventName = inputParam.domEvent.type;
		var tomekEventName = this._eventsLUT[ domEventName ];
		
		while ( true ){
			
			var event = element.getAttribute( 'Event' );
			var events = event ? event.split( "," ) : [];
			
			for( var i=0; i<events.length; i++ ){
				var complexEvent = events[i];
				var complexEventObj = this.splitEvent( complexEvent );
				if ( complexEventObj.main === tomekEventName ){
					var param = {
						event : complexEvent,
						domElement : element,
						domEvent : inputParam.domEvent,
						control : element && element.TomekControlObject ? element.TomekControlObject : null
					};
					this.triggerEvent( complexEvent, param );
					
					if ( this._stopOnEventAny || this._stopOnEventList.indexOf( complexEvent ) >= 0 ){
						return;
					}
					
				}
			}
			
			element = element.parentNode;
			
			if ( ! element ) return;
			if ( this._renderedMainElement && element === this._renderedMainElement ) return;
			if ( element.tagName === 'BODY' ) return;
		}
		
	},
	
	//@Override
	createMainElement : function(){
		var d = this.base();
		
		for ( var e in this._eventsLUT ){
			this.registerTriggerElement( d, e, this._eventsLUT[e] );
		}
		
		return d;
	}
	
});