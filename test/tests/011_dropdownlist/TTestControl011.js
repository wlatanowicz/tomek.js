//= require TTemplateControl

klass( 'TTestControl011', TTemplateControl, {
	
	getDdlOptions : function(){
		return [
			{ value: 'a', text: 'AA' },
			{ value: 'b', text: 'BB' },
			{ value: 'c', text: 'CC', 'disabled' : true },
			{ value: 'd', text: 'DD' }
		];
	}
	
} );
