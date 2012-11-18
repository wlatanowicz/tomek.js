//= require TControl

var TPanel = TControl.extend( {
	
	renderContents : function( placeholder ){
		var d = document.createElement( "div" );
		this.setRootNode( d );
		this.renderChildControls( d );
		placeholder.appendChild( d );
	}
	
});