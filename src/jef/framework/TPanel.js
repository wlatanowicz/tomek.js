//= require TControl

var TPanel = TControl.extend( {
	
	renderContents : function( placeholder ){
		var d = document.createElement( "div" );
		d.setAttribute( 'id', this.getID() );
		this.setRootNode( d );
		this.renderChildControls();
		placeholder.appendChild( d );
	}
	
});