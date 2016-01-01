//= require TTemplateControl

klass( 'TTestControl005', TTemplateControl, {	
	
	clicks : 0,
	lastSender : null,
	
	constructor : function( options ){
		this.base( options );
		this.clicks = 0;
		this.lastSender = null;
	},
	
	buttonClicked : function( sender, param ){
		this.lastSender = sender;
		this.clicks++;
	}
	
} );
