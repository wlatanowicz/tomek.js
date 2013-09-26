//= require TControl

/**
 * Simple control rendering text
 */
var TLiteral = TControl.extend( {

	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Text' );
		return arr;
	},
		
	//@Override
	renderContents : function(){
		var t = document.createTextNode( this.getText() );
		this.appendChild( t );
	}

});