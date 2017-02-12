//= require TTemplateControl

klass( 'MobileHelloWorld', TTemplateControl, {
	
	buttonClicked : function( sender, param ){
		sender.setText( 'Hello world!' );
	}
	
} );
