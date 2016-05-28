//= require Hammer
//= require TPanel
//= require TEventResponder

klass( 'TGesturePanel', TPanel, [TEventResponderMixin], {
	
	_hammer : null,
	_hammerEvents : ['tap', 'doubletap', 'press', 'pan', 'swipe', 'pinch', 'rotate'],
	
	_triggersEvents : ['Tap', 'DoubleTap', 'Press', 'Pan', 'Swipe', 'Pinch', 'Rotate'],
	
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name:'Options', type: 'none', default: {} } );
		return arr;
	},
	
	constructor : function( options ){
		this.base( options );
		this._hammer = null;
	},
	
	createMainElement : function(){
		var d = this.base();
		
		this._hammer = new Hammer( d );
		
		this.setHammerOptions( this._hammer );
		
		this.registerTriggerElement( this._hammer, 'tap', 'Tap' );
		this.registerTriggerElement( this._hammer, 'doubletap', 'DoubleTap' );
		this.registerTriggerElement( this._hammer, 'press', 'Press' );
		this.registerTriggerElement( this._hammer, 'pan', 'Pan' );
		this.registerTriggerElement( this._hammer, 'swipe', 'Swipe' );
		this.registerTriggerElement( this._hammer, 'pinch', 'Pinch' );
		this.registerTriggerElement( this._hammer, 'rotate', 'Rotate' );
		
		return d;
	},
	
	addEventListener : function( element, domEvent, boundFunction ){
		if ( element.touchAction && this._hammerEvents.indexOf(domEvent) >= 0 ){
			//hammer.js
			element.get( domEvent ).set({ enable: true });
			element.on( domEvent, boundFunction );
		}else
		{
			this.base( element, domEvent, boundFunction );
		}
	},
	
	setHammerOptions : function( h ){
		var options = this.getOptions();
		for ( var e in options ){
			h.get( e ).set( options[e] );
		}
	}

});