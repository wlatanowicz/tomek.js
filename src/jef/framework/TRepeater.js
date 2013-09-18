//= require TControl
//= require TItem

var TRepeater = TControl.extend( {
	
	_DataSource : [],
	
	constructor : function( a ){
		this.base( a );
		this._Items = [];
		this._DataSource = [];
	},
	
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Items', 'DataSource' );
		return arr;
	},	
	
	dataBind : function(){
		
	},
	
	createChildControls : function(){
		
		
	}
	
} );