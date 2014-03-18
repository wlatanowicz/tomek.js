//= require TControl

/** section: Controls
 * class TLiteral < TControl
 * 
 * Simple control rendering text
 * 
 **/
klass( 'TLiteral', TControl, {

	/**
	 * TLiteral#Text -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'Text' );
		return arr;
	},
		
	//@Override
	renderContents : function(){
		var t = document.createTextNode( this.getText() );
		this.appendChild( t );
	}

});