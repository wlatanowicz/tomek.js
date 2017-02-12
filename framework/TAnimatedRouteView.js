//= require TRouteView
//= require TPanel

/** section: Controls
 * class TAnimatedRouteView < TRouteView
 * 
 * 
 * Control is visible only when matching hash is present in url
 * 
 **/
klass( 'TAnimatedRouteView', TRouteView, {
	
	_deactivateRenderDelay : 300,
	_reactivateSecondStageDelay : 50,
	_reactivateSecondStageAnimationDelay : "0.1s",
	
	_panel : null,
	_div : null,
	
	constructor : function( options ){
		this.base( options );
		this._panel = null;
	},

	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'ActiveCssClass', type: 'string', default: 'fade-in' } );
		arr.push( { name: 'InactiveCssClass', type: 'string', default: 'fade-out' } );
		return arr;
	},
	
	createChildControls : function(){
		this._panel = new TPanel();
		this._panel.setParent( this );
	},
	
	renderChildControls : function( placeholder ){
		this._panel.renderContentsInPlaceholder( placeholder );
		this.base( this._panel._renderedMainElement );
	},

	activate : function( params ){
		var wasActive = this._IsActive;
		if ( wasActive ){
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
			
			var div = this._panel._renderedMainElement.cloneNode(true);
			this._panel._renderedMainElement.parentNode.insertBefore( div, this._panel._renderedMainElement );
			div.style.animationDelay = this._reactivateSecondStageAnimationDelay;
			div.className = this.getInactiveCssClass();
			
			setTimeout( this.reactivateSecondStage.bind( this, params, div ), this._reactivateSecondStageDelay );
		}else{
			this.base( params );
			this.ensureChildControls();
			this._panel.setCssClass( this.getActiveCssClass() );
		}
		
	},

	reactivateSecondStage : function( params, div ){
		var wasActive = this._IsActive;
		this.ensureChildControls();
		
		if ( this.getShouldRender() ){
			this.render();
		}
		
		this._panel.setCssClass( this.getActiveCssClass() );

		setTimeout( this.reactivateThirdStage.bind( this, div ), this._deactivateRenderDelay );
	},

	reactivateThirdStage : function( div ){
		if ( div ){
			var el = document.createElement('div');
			el.appendChild( div );
			el = null;
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
		
		this._panel.setCssClass( this.getInactiveCssClass() );
		
		if ( this.getShouldRender() ){
			setTimeout( this.render.bind(this), this._deactivateRenderDelay );
		}
	},
	
	removeRenderedNodes : function(){
		this.base();
		if ( this._panel ){
			this._panel.removeRenderedNodes();
		}
	},
	
	destroy : function(){
		this.base();
		if ( this._panel ){
			this._panel.destroy();
		}
	}
	
});