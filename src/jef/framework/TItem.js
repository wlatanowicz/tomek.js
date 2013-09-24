//= require TControl
//= require TItem

/**
 * Control used to render multiple times the same template
 * in repeater and similiar contexts
 */
var TItem = TControl.extend( {

	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'DataItem', 'ItemIndex' );
		return arr;
	},
	
	/**
	 * Sets template function
	 * 
	 * @param template Function
	 */
	useTemplate : function( template ){
		this.createChildControls = template.bind( this, this );
	}
	
} );