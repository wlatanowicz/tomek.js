//= require TControl
//= require TEventResponder
//= require TRouteViewManager

/** section: Controls
 * class TRouteView < TControl
 * 
 * 
 * Control is visible only when matching hash is present in url
 * 
 **/
klass( 'TRouteView', TControl, [ TEventResponderMixin ], {
	
	_triggersEvents : ['BecameActive','BecameInactive'],
	_ComputedPaths : null,
	
	constructor : function( options ){
		this.base( options );
		this._Params = { _list : [] };
		this._ComputedPaths = null;
	},
	
	destroy : function(){
		TRouteViewManager.getInstance().deregisterRouteView( this );
		this.base();
	},
	
	/**
	 * TRouteView#RegExp -> string
	 **/
	
	/**
	 * TRouteView#RegExpParams -> string
	 **/
	
	/**
	 * TRouteView#Path -> string
	 **/
	
	/**
	 * TRouteView#AutoRender -> bool
	 **/
	
	/**
	 * TRouteView#IsActive -> bool
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'RegExp' );
		arr.push( 'RegExpParams' );
		arr.push( 'Path' );
		arr.push( { name: 'AutoRender', type: 'bool', default: true } );
		arr.push( { name: 'ShouldRender', type: 'bool', default: true } );
		arr.push( { name: 'IsActive', type: 'bool', default: false } );
		return arr;
	},
	
	getCurrentPath : function(){
		return TRouteViewManager.getInstance().getCurrentPath();
	},
	
	setRegExp : function( regexp ){
		this._RegExp = regexp;
		TRouteViewManager.getInstance().deregisterRouteView( this );
		TRouteViewManager.getInstance().registerRouteView( this );
	},
	
	setPath : function( path ){
		this._ComputedPaths = null;
		this._Path = path.split("\n").map( String.trim );
		TRouteViewManager.getInstance().deregisterRouteView( this );
		TRouteViewManager.getInstance().registerRouteView( this );
	},
	
 	getComputedPaths : function(){
		if ( this._ComputedPaths === null ){
			if ( this._Path !== null ){
				this._ComputedPaths = [];
				for ( var k=0; k<this._Path.length; k++ ){
					if ( this._Path[k].trim().length > 0 ){
						this._ComputedPaths.push( this._Path[k].trim() );
					}
				}
			}else{
				this._ComputedPaths = [];
			}
		}
		return this._ComputedPaths;
	},
	
	getVisible : function(){
		return this.base() && this.getIsActive();
	},
	
	/**
	 * TRouteView#getParam( name ) -> string
	 * - name (String|Integer): param name or index
	 * 
	 **/
	getParam : function( name ){
		if ( /[0-9]+/.test( name ) ){
			return this._Params._list[name] ? this._Params._list[name] : null;
		}
		return this._Params[name] ? this._Params[name] : null;
	},
	
	activate : function( params ){
		var wasActive = this._IsActive;
		var oldParams = this._Params;
		this._Params = params;
		this._IsActive = true;
		this.setShouldRender( this.getAutoRender() && ! wasActive );
		this.triggerEvent( 'BecameActive', {
				"oldParams" : oldParams,
				"newParams" : this._Params,
				"wasActive" : wasActive,
				"isActive" : true
				});
		if ( this.getShouldRender() ){
			this.render();
		}
	},
	
	deactivate : function(){
		var wasActive = this._IsActive;
		var oldParams = this._Params;
		this._Params = {};
		this._IsActive = false;
		this.setShouldRender( this.getAutoRender() );
		this.triggerEvent( 'BecameInactive', {
			"oldParams" : oldParams,
			"newParams" : this._Params,
			"wasActive" : wasActive,
			"isActive" : false
		});
		if ( this.getShouldRender() ){
			this.render();
		}
	},
	
	checkForCurrentPath : function(){
		TRouteViewManager.getInstance().checkControlForCurrentPath( this );
	}

});