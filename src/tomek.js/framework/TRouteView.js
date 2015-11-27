//= require TControl
//= require TEventResponder

klass( 'TRouteView', TControl, [ TEventResponderMixin ], {
	
	_triggersEvents : ['BecameActive','BecameInactive'],
	
	constructor : function( options ){
		this.base( options );
		this._registerEventHandler();
	},
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'Mode', default: 'none' } );
		arr.push( 'RegExp' );
		arr.push( 'RegExpParams' );
		arr.push( 'Path' );
		arr.push( 'RelativePath' );
		arr.push( 'CurrentPath' )
		arr.push( { name: 'AutoRender', type: 'bool', default: true } );
		arr.push( { name: 'IsActive', type: 'bool', default: false } );
		arr.push( 'Params' );
		return arr;
	},
	
	setRegExp : function( regexp ){
		this.setMode( 'regexp' );
		this._RegExp = regexp;
	},
	
	setPath : function( path ){
		this.setMode( 'path' );
		this._RelativePath = null;
		this._Path = path.split("\n").map( function(el){ return el.trim(); } );
	},
	
	setRelativePath : function( path ){
		this.setMode( 'path' );
		this._Path = null;
		this._RelativePath = path.split("\n").map( function(el){ return el.trim(); } );
	},
	
	findParentRouteView : function(){
		var parent = this;
		do {
			parent = parent.getParent();
			if ( parent !== null && parent.isKindOf( TRouteView ) ){
				return parent;
			}
		}while( parent !== null );
		throw "Cannot find parent TRouteView";
	},
	
	getComputedPaths : function(){
		if ( this._ComputedPaths == null ){
			if ( this._Path != null ){
				this._ComputedPaths = [];
				for ( var k=0; k<this._Path.length; k++ ){
					if ( this._Path[k].length > 0 ){
						this._ComputedPaths.push( this._Path[k] );
					}
				}
			}else
			if ( this._RelativePath != null ){
				this._ComputedPaths = [];
				var parentPaths = this.findParentRouteView().getComputedPaths();
				for ( var i=0; i<parentPaths.length; i++ ){
					if ( parentPaths[i].substring( parentPaths[i].length - 2 ) == '/*' ){
						for( var j=0; j<this._RelativePath.length; j++ ){
							var computedPath = parentPaths[i].substring( 0, parentPaths[i].length-2 ) + this._RelativePath[j];
							if ( computedPath.length > 0 ){
								this._ComputedPaths.push( computedPath );
							}
						}
					}
				}
			}
		}
		return this._ComputedPaths;
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
		var oldPath = this._CurrentPath;
		this._CurrentPath = newPath;
		var oldParams = this._Params;
		var newParams = {};
		var active = false;
		
		if ( this.getMode() == 'regexp' ){
			var regexp = new RegExp( this.getRegExp() );
			active = regexp.test( this._CurrentPath );
			if ( this.getRegExpParams().length > 0 && this._IsActive ){
				var matches = regexp.exec( this._CurrentPath );
				var params = this.getPathParams();
				for ( var i=0; i<params.length; i++ ){
					newParams[ params[i] ] = matches[ i+1 ];
				}
			}
		}else
		if ( this.getMode() == 'path' ){
			
			var paramRegexp = /{\w+}/;
			var explodedCurrentPath = this._CurrentPath.split('/');
			var found = false;
			var computedPath = this.getComputedPaths();
			
			for ( var j=0; j < computedPath.length && ! found; j++ ){
				var explodedPath = computedPath[j].split('/');
				var endsWithAsterisks = explodedPath[ explodedPath.length-1 ] == '*';
				var explodedPathLength = endsWithAsterisks ? explodedPath.length-1 : explodedPath.length;
				
				active = ( ! endsWithAsterisks && explodedPathLength == explodedCurrentPath.length )
						|| ( endsWithAsterisks && explodedPathLength <= explodedCurrentPath.length );

				for ( var i=0; i<explodedPathLength && active; i++ ){
					if ( paramRegexp.test( explodedPath[i] ) ){
						//param
						var paramname = explodedPath[i].substring( 1, explodedPath[i].length-1 );
						newParams[ paramname ] = explodedCurrentPath[i];
					}else{
						//path part
						active = active && explodedPath[i] == explodedCurrentPath[i];
					}
				}
				
				found = found || active;
			}
			
		}
		
		if ( active ){
			this._Params = newParams;
			this._IsActive = true;
			this.triggerEvent( 'BecameActive', {
					"oldParams" : oldParams,
					"newParams" : newParams,
					"oldPath" : oldPath,
					"newPath" : newPath
					});
			if ( this._AutoRender ){
				this.render();
			}
		}else
		if ( this._IsActive ){
			this._IsActive = false;
			this.triggerEvent( 'BecameInactive', {
				"oldParams" : oldParams,
				"oldPath" : oldPath,
				"newPath" : newPath
			});
			if ( this._AutoRender ){
				this.render();
			}
		}
	
	}
	
});