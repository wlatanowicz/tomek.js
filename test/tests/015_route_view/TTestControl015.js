//= require TTemplateControl

klass( 'TTestControl015', TTemplateControl, {
	
	tabTwoBecameActive : function( sender, param ){
		this.$('OptionL').Text = param.newParams.option;
	}
	
} );
