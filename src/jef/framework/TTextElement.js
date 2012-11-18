var TTextElement = TControl.extend( {
	
	_text : '',
	
	constructor : function( str ){
		this.base( [] );
		this._text = str;
	},
	
	renderContents : function( placeholder ){
		var t = document.createTextNode( this._text );
		placeholder.appendChild( t );
	}
	
});