//= require TTemplateControl

klass( 'DragDrop', TTemplateControl, {
	
	items1 : [],
	items2 : [],
	items3 : [],
	items4 : [],
	
	constructor : function(options){
		this.base( options );
		this.loadDefaults();
	},
	
	loadDefaults : function(){
		this.items2 = [];
		this.items3 = [];
		this.items4 = [];
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
				id: 3,
				color: 'blue'
			},
			{
				id: 4,
				color: 'red'
			},
			{
				id: 5,
				color: 'green'
			},
			{
				id: 6,
				color: 'blue'
			}
		];
		
		this.$('Repeater1').setDataSource( this.items1 );
		this.$('Repeater2').setDataSource( this.items2 );
		this.$('Repeater3').setDataSource( this.items3 );
		this.$('Repeater4').setDataSource( this.items4 );
	},
	
	onDrop : function( sender, param ){
		if ( param.hasMatchingDraggable ){
		
			var obj = param.draggable.getCustomData().obj;

			var rpt = sender.findChildControlsByKind('TRepeater')[0];
			rpt.getDataSource().push( obj );
			rpt.cleanup();

			var src = this.$( param.draggable.getCustomData().source );
			var i = src.getDataSource().indexOf( obj )
			if ( i >= 0 ){
				src.getDataSource().splice( i, 1 );
				src.cleanup();
				src.render();
			}

			sender.render();
		}
	}
	
} );
