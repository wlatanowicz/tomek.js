var THtmlElement = TControl.extend( {
	
	tagName : 'div',

	renderContents : function( placeholder ){
		var d = new Element( this.tagName );
		this.renderChildControls( d );
		placeholder.appendChild( d );
	}
	
});