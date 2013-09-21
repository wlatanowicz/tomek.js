//= require TTemplateControl

var TMyForm = TTemplateControl.extend( {
	
	buttonClicked : function( sender ){
		console.log( sender );
		console.log( this );
		alert( 'ok' );
	}
	
	
} );
