//= require TControl

/**
 * class TItem < TControl
 * 
 * Control used to render multiple times the same template
 * in repeater and similiar contexts
 * 
 **/
var TItem = TControl.extend( {

	/**
	 * TItem.DataItem -> Object
	 **/
	
	/**
	 * TItem.ItemIndex -> int
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'DataItem', 'ItemIndex' );
		return arr;
	},
	
	/**
	 * TItem.useTemplate( template ) -> void
	 * - template (Function): template
	 * 
	 * Sets template function
	 * 
	 **/
	useTemplate : function( template ){
		this.createChildControls = template.bind( this, this );
	}
	
} );