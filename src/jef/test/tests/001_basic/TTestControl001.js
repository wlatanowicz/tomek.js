//= require TTemplateControl

var TTestControl001 = TTemplateControl.extend( {
	
	txt : null,
	
	setTestText : function( v ){
		this.txt = v;
	},
	
	getTestText : function(){
		return this.txt ? this.txt : 'Lorem ipsum'
	}
	
} );
