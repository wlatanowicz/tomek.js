//= require TControl
//= require TEventResponder
//= require TRouteViewController

klass( 'TRouteView', TControl, [ TEventResponderMixin ], {
	
	_triggersEvents : ['BecameActive','BecameInactive'],
	
	constructor : function( options ){
		this.base( options );
		this._registerEventHandler();
	},
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'Mode' ); //default: none
		arr.push( 'RegExp' );
		arr.push( 'RegExpParams' );
		arr.push( 'Path' );
		arr.push( 'RelativePath' );
		arr.push( 'CurrentPath' )
		arr.push( { name: 'AutoRender', type: 'bool', default: true } ); //bool
		arr.push( { name: 'IsActive', type: 'bool', default: false } ); //bool
		arr.push( 'Params' );
		return arr;
	},
	
	setRegExp : function( regexp ){
		this.setMode( 'regexp' );
		this._RegExp = regexp;
	},
	
	setPath : function( path ){
		this.setMode( 'path' );
		this._Path = path;
	},
	
	setRelativePath : function( path ){
		this._RelativePath = path;
		this.setPath( this.findParentRouteView().getPath() + path );
	},
	
	getVisibleForRender : function(){
		return this.getVisible() && this.getIsActive();
	},
	
	getParam : function( name ){
		return this._Params[name] ? this._Params[name] : null;
	},
	
	_registerEventHandler : function(){
		window.addEventListener( 'hashchange', this._hashChanged.bind( this ) );
		window.addEventListener( 'load', this._hashChanged.bind( this ) );
	},
	
	_hashChanged : function(){
		var newHash = window.location.hash;
		if ( newHash.substring( 0,1 ) == '#' ){
			newHash = newHash.substring( 1 ); 
		}
		this.setCurrentPath( newHash );
	},
	
	setCurrentPath : function( newPath ){
		this._CurrentPath = newPath;
		this._Params = {};
		var active = false;
		
		if ( this.getMode() == 'regexp' ){
			var regexp = new RegExp( this.getRegExp() );
			active = regexp.test( this._CurrentPath );
			if ( this.getRegExpParams().length > 0 && this._IsActive ){
				var matches = regexp.exec( this._CurrentPath );
				var params = this.getPathParams();
				for ( var i=0; i<params.length; i++ ){
					this._Params[ params[i] ] = matches[ i+1 ];
				}
			}
		}else
		if ( this.getMode() == 'path' ){
			
			var paramRegexp = /{\w+}/;
			var explodedPath = this.getPath().split('/');
			var explodedCurrentPath = this._CurrentPath.split('/');
			active = explodedPath.length == explodedCurrentPath.length;
			
			for ( var i=0; i<explodedPath.length && active; i++ ){
				if ( paramRegexp.test( explodedPath[i] ) ){
					//param
					var paramname = explodedPath[i].substring( 1, explodedPath[i].length-1 );
					this._Params[ paramname ] = explodedCurrentPath[i];
				}else{
					//path part
					active = active && explodedPath[i] == explodedCurrentPath[i];
				}
			}
			
		}
		
		if ( active ){
			this._IsActive = true;
			this.triggerEvent( 'BecameActive', this._Params );
			if ( this._AutoRender ){
				this.render();
			}
		}else
		if ( this._IsActive ){
			this._IsActive = false;
			this.triggerEvent( 'BecameInactive', this._Params );
			if ( this._AutoRender ){
				this.render();
			}
		}
	
	}
	
});