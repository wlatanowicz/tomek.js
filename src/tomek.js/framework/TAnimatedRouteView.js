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
	_panel : null,
	
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
		this.base( params );
		this.ensureChildControls();
		
		this._panel.removeCssClass( this.getInactiveCssClass() );
		this._panel.addCssClass( this.getActiveCssClass() );
	},
	
	deactivate : function(){
		var wasActive = this._IsActive;
		var oldParams = this._Params;
		this._Params = {};
		this._IsActive = false;
		this.triggerEvent( 'BecameInactive', {
			"oldParams" : oldParams,
			"newParams" : this._Params,
			"wasActive" : wasActive,
			"isActive" : false
		});
		
		this._panel.removeCssClass( this.getActiveCssClass() );
		this._panel.addCssClass( this.getInactiveCssClass() );
		
		if ( this.getAutoRender() ){
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