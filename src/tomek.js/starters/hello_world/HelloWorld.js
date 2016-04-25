//= require TTemplateControl

klass( 'HelloWorld', TTemplateControl, {
	
	buttonClicked : function( sender, param ){
		sender.setText( 'Hello world!' );
	}
	
} );
