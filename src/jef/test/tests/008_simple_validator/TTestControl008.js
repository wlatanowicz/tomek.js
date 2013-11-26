//= require TTemplateControl

var TTestControl008 = TTemplateControl.extend( {
	
	buttonClicked : function( sender, param ){
		console.log( sender.findControlByID( 'Form' ).validate() ? 'OK' : 'ERR' );
	}
	
} );
