//= require TTemplateControl

klass( 'RouteView', TTemplateControl, {
	
	tabBecameActive : function( sender, param ){
		this.$( sender.getID() + 'Button' ).addCssClass( 'current' );
	},
	
	tabBecameInactive : function( sender, param ){
		this.$( sender.getID() + 'Button' ).removeCssClass( 'current' );
	}
	
} );
