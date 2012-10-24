var TContent = TControl.extend( {
	
	constructor : function( options ){
		this.base( options );
	},
	
	setPlaceholder : function( ph ){
		this._rootNode = $( ph );
	}
		
});