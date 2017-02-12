//= require TCase

/** section: Controls
 * class TSwitchView < TCase
 * 
 * Switch view. Renders only one of it's [[TCase]] subviews.
 * 
 **/
klass( 'TSwitchView', TCase, {

	setupVisibility : function(){
		this.ensureChildControls();
		var visible_set = false;
		var i;
		for ( i=0; i<this._childControls.length; i++ ){
			var c = this._childControls[i];
			if ( !visible_set 
					&& c.getCondition() ){
				visible_set = true;
				c.setVisible( true );
			}else{
				c.setVisible( false );
			}
		}
	},

	addChildControl : function( c ){
		if ( ! c.isKindOf( TCase ) ){
			throw new TException( 'TSwitchView can accept only TCase' );
		}
		this.base( c );
	},
	
	render : function(){
		this.setupVisibility();
		this.base();
	},
	
	renderContentsInPlaceholder : function( placeholder ){
		this.setupVisibility();
		this.base( placeholder );
	}
	
} );