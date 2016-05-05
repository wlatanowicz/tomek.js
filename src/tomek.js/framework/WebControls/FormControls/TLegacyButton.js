//= require TWebControl
//= require TEventResponder

/** section: WebControls_FormControls
 * class TLegacyButton <  TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a button (input type button)
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * 
 **/
klass( 'TLegacyButton', TWebControl, [ TEventResponderMixin ], {
	
	//@Override
	_tagName : 'input',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Click'],
	
	//@Override
	getDefaultAttributes : function(){
		return { type: 'button' };
	},
	
	/**
	 * TButton#Text -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 
					{ name:'Text', elementProperty: 'value' },
					{ name:'Disabled', type:'bool', elementProperty:'disabled' }
					);
		return arr;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		this.registerTriggerElement( d, 'click', 'Click' );
		
		return d;
	}
	
});