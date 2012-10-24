var TExpression = TControl.extend( {
	
	constructor : function(){
		this.base();
		this._expression = function(){return null};
	},
	
	renderContents : function( placeholder ){
		var txt = this._expression();
		
		var tn = document.createTextNode( txt );
		placeholder.appendChild( tn );
	}
	
	
});