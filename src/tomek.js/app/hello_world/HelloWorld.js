//= require TTemplateControl

var HelloWorld = TTemplateControl.extend( {
	
	buttonClicked : function( sender, param ){
		sender.setText( 'Hello world!' );
	}
	
} );
