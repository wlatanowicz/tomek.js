//= require TControl

var TPanel = TControl.extend( {
	
	renderContents : function( placeholder ){
		var d = document.createElement( "div" );
		d.setAttribute( 'id', this.getID() );
		//this.setContainer( d );
		this.renderChildControls( d );
		this.appendChild( placeholder, d );
	}
	
});