//= require TTemplateControl

klass( 'TTestControl006', TTemplateControl, {
	
	itemCreated : function( sender, param ){
		var r = param.item.findChildControlByID( 'InnerRep' );
		r.setDataSource( param.dataItem );
	}
	
} );
