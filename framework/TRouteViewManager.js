//= require TObject


klass( 'TRouteViewManager', {

	_routeViews : [],
	
	constructor : function( options ){
		this.base( options );
		this._routeViews = [];
		this._registerEventHandler();
	},
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'CurrentPath' );
		return arr;
	},
	
	_registerEventHandler : function(){
		window.addEventListener( 'hashchange', this._hashChanged.bind( this ) );
		if ( window.document.readyState === 'complete' ){
			this._hashChanged();
		}else{
			window.addEventListener( 'load', this._hashChanged.bind( this ) );
		}
	},
	
	_hashChanged : function(){
		var newHash = window.location.hash;
		if ( newHash.substring( 0,1 ) === '#' ){
			newHash = newHash.substring( 1 ); 
		}
		this.setCurrentPath( newHash );
	},
	
	setCurrentPath : function( path ){
		var activated = [];
		var toDeactivate = [];
		var idx;
		var i;
		this._CurrentPath = path;
		for( i=0; i<this._routeViews.length; i++ ){
			if ( activated.indexOf( this._routeViews[i].control ) == -1 ){
				if ( this._routeViews[i].regexp.test( path ) ){
					
					var params = this.processParams( this._routeViews[i], path );
					this._routeViews[i].control.activate( params );
					activated.push( this._routeViews[i].control );
					
					while( ( idx = toDeactivate.indexOf( this._routeViews[i].control ) ) >= 0 ){
						toDeactivate.splice( idx, 1 );
					}
					
				}else{
					if ( this._routeViews[i].control._IsActive ){
						toDeactivate.push( this._routeViews[i].control );
					}
				}
			}
		}
		
		for( i=0; i<toDeactivate.length; i++ ){
			toDeactivate[i].deactivate();
		}
	},
	
	checkControlForCurrentPath : function( control ){
		var path = this.getCurrentPath();
		for( var i=0; i<this._routeViews.length; i++ ){
			if ( this._routeViews[i].control === control ){
				if ( this._routeViews[i].regexp.test( path ) ){
					var params = this.processParams( this._routeViews[i], path );
					this._routeViews[i].control.activate( params );
				}else{
					if ( this._routeViews[i].control._IsActive ){
						this._routeViews[i].control.deactivate();
					}
				}
			}
		}
	},
	
	processParams : function( routeView, path ){
		var paramList = routeView.regexp.exec( path );
		if ( paramList === null ){
			paramList = [];
		}else{
			paramList.splice( 0, 1 );
		}
		var params = {
			"_list" : paramList
		};
		for ( var i=0; i<routeView.params.length; i++ ){
			params[ routeView.params[i] ] = params._list[i]
											? params._list[i]
											: null;
		}
		return params;
	},
	
	registerRouteView : function( routeView ){
		var regexps = this.getProcessedRegExps( routeView );
		for ( var i=0; i<regexps.length; i++ ){
			var regexp = new RegExp( "^"+regexps[i].regexp+"$" );
			var routeViewListItem = {
				"control" : routeView,
				"regexp" : regexp,
				"params" : regexps[i].params
			};
			
			this._routeViews.push( routeViewListItem );
		}
	},
	
	deregisterRouteView : function( routeView ){
		var newList = [];
		for( var i=0; i<this._routeViews.length; i++ ){
			if ( this._routeViews[i].control !== routeView ){
				newList.push( this._routeViews[i] );
			}
		}
		this._routeViews = newList;
	},
	
	getProcessedRegExps : function( control ){
		var i;
		var regexps = [];
		if ( control.getRegExp() !== null && control.getRegExp().length > 0 ){
			regexps.push({
				"regexp" : control.getRegExp(),
				"params" : []
			});
		}
		for ( i=0; i<control.getComputedPaths().length; i++ ){
			regexps.push( this.convertPathToRegexp( control.getComputedPaths()[i] ) );
		}
		return regexps;
	},
	
	convertPathToRegexp : function( path ){
		var re = new RegExp( "{[a-zA-Z0-9]+}", "g" );
		var params = [];
		var callback = function( m ){
			params.push( m.substr( 1, m.length-2 ) );
			return "([^/]+)";
		};
		var regexpPath = path.replace( re, callback );
		if ( regexpPath.substr( regexpPath.length-2 ) === '/*' ){
			regexpPath = regexpPath.substr( 0, regexpPath.length-2 );
			regexpPath += "/.*";
		}
		return {
			"regexp" : regexpPath,
			"params" : params
		};
	}

} );

TRouteViewManager._Instance = null;
TRouteViewManager.getInstance = function(){
	if ( TRouteViewManager._Instance === null ){
		TRouteViewManager._Instance = new TRouteViewManager();
	}
	return TRouteViewManager._Instance;
};