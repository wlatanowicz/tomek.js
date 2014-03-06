//= require TTemplateControl

/** section: Controls
 * class TItem < TTemplateControl
 * 
 * Control used to render multiple times the same template
 * in repeater and similiar contexts
 * 
 **/
klass( 'TItem', TTemplateControl, {

	/**
	 * TItem#DataItem -> Object
	 **/
	
	/**
	 * TItem#ItemIndex -> int
	 **/
	
	/**
	 * TItem#Repeater -> TRepeater
	 **/
	
	/**
	 * TItem#Type -> String
     * 
     * one of: `Header`, `Item`, `Footer` or `Empty`
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'DataItem', 'ItemIndex', 'Repeater', 'Type' );
		return arr;
	},
	
	/**
	 * TItem#useTemplate( template ) -> void
	 * - template (Function): template
	 * 
	 * Sets template function
	 * 
	 **/
	useTemplate : function( template ){
		this.createChildControls = template.bind( this, this );
	}
	
} );