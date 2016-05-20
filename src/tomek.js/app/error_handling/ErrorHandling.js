//= require TTemplateControl
//= require TException

klass( 'ErrorHandling', TTemplateControl, {
	
	buttonClicked : function( sender, param ){
		sender.setText( 'Hello world!' );
		throw new TException( 'Error' );
	}
	
} );
