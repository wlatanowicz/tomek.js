//= require TTemplateControl

var TTestControl008 = TTemplateControl.extend( {
	
	validationResult : null,
	
	buttonClicked : function( sender, param ){
		this.validationResult = sender.findControlByID( 'Form' ).validate() ? 'OK' : 'ERR';
	}
	
} );
