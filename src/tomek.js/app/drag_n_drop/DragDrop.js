//= require TTemplateControl

var DragDrop = TTemplateControl.extend( {
	
	items1 : [],
	items2 : [],
	items3 : [],
	
	constructor : function(options){
		this.base( options );
		this.loadDefaults();
	},
	
	loadDefaults : function(){
		this.items2 = [];
		this.items3 = [];
		this.items1 = [
			{
				id: 1,
				color: 'red'
			},
			{
				id: 2,
				color: 'green'
			},
			{
				id: 2,
				color: 'blue'
			}
		];
		
		this.$('Repeater1').setDataSource( this.items1 );
		this.$('Repeater2').setDataSource( this.items2 );
		this.$('Repeater3').setDataSource( this.items3 );
	},
	
	onDrop : function( sender, param ){
		var obj = param.draggable.getCustomData().obj;
		
		var rpt = sender.findChildControlsByKind('TRepeater')[0];
		rpt.getDataSource().push( obj );
		rpt.dataBind();
		
		var src = this.$( param.draggable.getCustomData().source );
		var i = src.getDataSource().indexOf( obj )
		if ( i => 0 ){
			src.getDataSource().splice( i, 1 );
			src.dataBind();
			src.render();
		}
		
		sender.render();
	}
	
} );
