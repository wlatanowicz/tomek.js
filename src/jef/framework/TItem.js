//= require TControl
//= require TItem

var TItem = TControl.extend( {

	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'DataItem', 'ItemIndex' );
		return arr;
	},
	
	useTemplate : function( template ){
		this.createChildControls = template.bind( this, this );
	}
	
} );