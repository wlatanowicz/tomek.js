var THtmlElement = TControl.extend( {
	
	_tagName : 'div',
	
	constructor : function( tagName, attributes ){
		this.base( [] );
		this._tagName = tagName;
	},
	
	renderContents : function( placeholder ){
		var d = document.createElement( this._tagName );
		this.renderChildControls( d );
		placeholder.appendChild( d );
	}
	
});