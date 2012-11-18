//= require TControl

var TLiteral = TControl.extend( {

	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Text' );
		return arr;
	},
		
	renderContents : function( placeholder ){
		var t = document.createTextNode( this.getText() );
		placeholder.appendChild( t );
	}

});