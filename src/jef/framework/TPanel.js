//= require TControl

var TPanel = TControl.extend( {
	
	renderContents : function( placeholder ){
		var d = document.createElement( "div" );
		this._rootNode = d;
		this.renderChildControls( d );
		placeholder.appendChild( d );
	}
	
});