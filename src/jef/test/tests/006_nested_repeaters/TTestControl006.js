//= require TTemplateControl

var TTestControl006 = TTemplateControl.extend( {
	
	itemCreated : function( sender, param ){
		var r = param.item.findChildControlByID( 'InnerRep' );
		r.setDataSource( param.dataItem );
	}
	
} );
