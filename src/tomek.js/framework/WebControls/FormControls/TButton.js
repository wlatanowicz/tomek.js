//= require TWebControl
//= require TEventResponder

/** section: FormControls
 * class TButton <  TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a button
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * 
 **/
klass( 'TButton', TWebControl, [ TEventResponderMixin ], {
	
	//@Override
	_tagName : 'input',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Click'],
	
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
		
		d.setAttribute( 'type', 'button' );
		
		this.registerTriggerElement( d, 'click', 'Click' );
		
		return d;
	}
	
});