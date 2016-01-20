
klass( 'TPromise', {
	
	_stateHistory : [],
	_callbacks : {},
	
	constructor : function(){
		this.base();
		this._stateHistory = [];
		this._callbacks = {};
	},
	
	getCurrentState : function(){
		if ( this._stateHistory.length > 0 ){
			return this._stateHistory[ this._stateHistory.length - 1 ];
		}
		return null;
	},
	
	getPreviousStateByName : function( state_name ){
		for ( var i=(this._stateHistory.length-1); i>=0; i-- ){
			if ( this._stateHistory[i].state === state_name ){
				return this._stateHistory[ i ];
			}
		}
		return null;
	},
	
	on : function( state, callback ){
		
		var previousState = this.getPreviousStateByName( state );
		if ( previousState !== null ){
			setTimeout( function(){ callback( previousState.param ) }, 0 );
		}
		
		if ( this._callbacks[ state ] == undefined ){
			this._callbacks[ state ] = [];
		}
		
		this._callbacks[ state ].push( callback );
		
		return this;
	},
	
	setState : function( state, param ){
		this._stateHistory.push({
				'state' : state,
				'param' : param
			});
		
		if ( this._callbacks[ state ] ){
			for( var i=0; i<this._callbacks[ state ].length; i++ ){
				var callback = this._callbacks[ state ][i];
				setTimeout( function(){ callback( param ) }, 0 );
			}
		}
	}
	
} );