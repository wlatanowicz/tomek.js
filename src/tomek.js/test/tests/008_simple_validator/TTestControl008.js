//= require TTemplateControl

klass( 'TTestControl008', TTemplateControl, {
	
	validationResult : null,
	
	buttonClicked : function( sender, param ){
		this.validationResult = sender.findControlByID( 'Form' ).validate() ? 'OK' : 'ERR';
	}
	
} );
