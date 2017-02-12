//= require TTemplateControl

klass( 'TTestControl001', TTemplateControl, {
	
	txt : null,
	
	setTestText : function( v ){
		this.txt = v;
	},
	
	getTestText : function(){
		return this.txt ? this.txt : 'Lorem ipsum'
	}
	
} );
