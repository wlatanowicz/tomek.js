//= require TTemplateControl

klass( 'ValidatedForm', TTemplateControl, {
	
	buttonClicked : function( sender, param ){
		var result = this.$('Form').validate();
		if ( result ){
			this.$( 'ValidationPassedLiteral' ).setVisible( true );
			this.$( 'ValidationFailedLiteral' ).setVisible( false );
		}else{
			this.$( 'ValidationPassedLiteral' ).setVisible( false );
			this.$( 'ValidationFailedLiteral' ).setVisible( true );
		}
		
		this.$( 'ValidationPassedLiteral' ).render();
		this.$( 'ValidationFailedLiteral' ).render();
		
	},
	
	checkPasswordLength : function(){
		return this.$('PasswordTB').getText().length === 0
				|| this.$('PasswordTB').getText().length > 6;
	}
	
} );
