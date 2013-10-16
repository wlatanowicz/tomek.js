//= require TTemplateControl

var TTestControl006 = TTemplateControl.extend( {
	
	itemCreated : function( sender, param ){
		var r = param.item.findChildControlByID( 'InnerRep' );
		r.DataSource = param.dataItem;
		console.log( sender );
		console.log( param );
	}
	
} );
