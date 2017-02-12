//= require TTemplateControl

klass( 'TodoList', TTemplateControl, {
	
	items : [],
	
	constructor : function(options){
		this.base( options );
		this.items = [];
	},
	
	buttonClicked : function( sender, param ){
		this.items.push( {
			"done" : false,
			"description" : this.$('NewItemTextBox').getText()
		} );
		this.$('ListRepeater').setDataSource( this.items );
		this.$('ListRepeater').render();
	}
	
} );
