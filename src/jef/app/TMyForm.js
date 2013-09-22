//= require TTemplateControl

var TMyForm = TTemplateControl.extend( {
	
	buttonClicked : function( sender ){
		console.log( sender );
		console.log( this );
		this.findChildControlByID('TextBox2').Text = this.findChildControlByID('TextBox1').Text;
	}
	
	
} );
