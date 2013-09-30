//= require TTemplateControl

var TPresControl = TTemplateControl.extend( {
	
	imie : 'Janek',
	
	getName : function(){
		return this.imie;
	},
	
	buttonClicked : function( sender ){
		console.log( sender );
		var i = this.findChildControlByID( 'TextBox' ).Text;
		this.imie = i;
		this.findChildControlByID( 'Panel' ).render();
		
		var ds = [1,2,3,4];
		
		this.findChildControlByID( 'R' ).DataSource = ds;
		this.findChildControlByID( 'R' ).render();
		
	},
	
	innerButtonClicked : function( sender ){
		alert( sender.Text );
	}
	
} );
