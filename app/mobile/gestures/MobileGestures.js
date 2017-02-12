//= require TTemplateControl

klass( 'MobileGestures', TTemplateControl, {
	
	_direction : 'up',
	
	getDirection : function(){
		return this._direction;
	},
	
	swipe: function( sender, param ){
		if ( param.domEvent.direction === Hammer.DIRECTION_UP ){
			this._direction = 'up';
		}
		if ( param.domEvent.direction === Hammer.DIRECTION_DOWN ){
			this._direction = 'down';
		}
		if ( param.domEvent.direction === Hammer.DIRECTION_LEFT ){
			this._direction = 'left';
		}
		if ( param.domEvent.direction === Hammer.DIRECTION_RIGHT ){
			this._direction = 'right';
		}
		sender.render();
	}
	
} );
