//= require TTemplateControl

var TMyForm = TTemplateControl.extend( {
	
	buttonClicked : function( sender ){
		//console.log( sender );
		//console.log( this );
		this.findChildControlByID('TextBox2').Text = this.findChildControlByID('TextBox1').Text;
		
		this.findChildControlByID( 'Rep' ).setDataSource( [1,2,3,5] );
		this.render();
		
	},
	
	innerButtonClicked : function( sender ){
		alert( sender.Text );
	}
	
	
} );
