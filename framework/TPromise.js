//= require TObject

/** section: Utilities
 * class TPromise
 * 
 * Multi-state promise implementation
 * 
 **/
klass( 'TPromise', {
	
	_stateHistory : [],
	_callbacks : {},
	_terminated : false,
	
	constructor : function(){
		this.base();
		this._stateHistory = [];
		this._callbacks = {};
		this._terminated = false;
	},
	
	/**
	 * TPromise#getCurrentState( e ) -> Object
	 * 
	 * Returns current state object
	 * 
	 **/
	getCurrentState : function(){
		if ( this._stateHistory.length > 0 ){
			return this._stateHistory[ this._stateHistory.length - 1 ];
		}
		return null;
	},
	
	/**
	 * TPromise#getPreviousStateByName( state_name ) -> Object
	 * - state_name (String): state name
	 * 
	 * Finds most recent occurance of a state by name
	 * 
	 **/
	getPreviousStateByName : function( state_name ){
		for ( var i=(this._stateHistory.length-1); i>=0; i-- ){
			if ( this._stateHistory[i].state === state_name ){
				return this._stateHistory[ i ];
			}
		}
		return null;
	},
	
	/**
	 * TPromise#terminate() -> void
	 * 
	 * Stops promise. No futher state changes will be effective.
	 * 
	 **/
	terminate : function(){
	 	this._terminated = true;
	},
	
	/**
	 * TPromise#on( state, callback ) -> TPromise
	 * - state (String): state name
	 * - callback (Function): callback function
	 * 
	 * Binds callback function to state. Can be chained.
	 * 
	 **/
	on : function( state, callback ){
		
		var previousState = this.getPreviousStateByName( state );
		if ( previousState !== null && !this._terminated ){
			var promise = this;
			setTimeout( function(promise,callback){ if ( !promise._terminated ) callback( previousState.param, promise ); }.bind(this,promise,callback), 0 );
		}
		
		if ( this._callbacks[ state ] == undefined ){
			this._callbacks[ state ] = [];
		}
		
		this._callbacks[ state ].push( callback );
		
		return this;
	},
	
	/**
	 * TPromise#setState( state, param )
	 * - state (String): state name
	 * - param (Object): parameter associated with state
	 * 
	 * Sets new state
	 * 
	 **/
	setState : function( state, param ){
		if ( this._terminated ){
			return false;
		}
		this._stateHistory.push({
				'state' : state,
				'param' : param
			});
		
		if ( this._callbacks[ state ] ){
			for( var i=0; i<this._callbacks[ state ].length; i++ ){
				var callback = this._callbacks[ state ][i];
				var promise = this;
				setTimeout( function(promise,callback){ if ( !promise._terminated ) callback( param, promise ); }.bind(this,promise,callback), 0 );
			}
		}
		return true;
	}
	
} );