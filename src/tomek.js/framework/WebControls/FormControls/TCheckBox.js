//= require TWebControl
//= require TEventResponder

/** section: FormControls
 * class TCheckBox < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a checkbox input
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * `on:Change`
 * 
 **/
klass( 'TCheckBox', TWebControl, [ TEventResponderMixin ], {
	
	//@Override
	_tagName : 'input',
	
	_type : 'checkbox',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Click','Change'],
	
	/**
	 * TCheckBox#Checked -> Boolean
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 
					{ name: 'Checked', type: 'bool', elementProperty: 'checked' },
					{ name:'Disabled', type:'bool', elementProperty:'disabled' }
				);
		return arr;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		d.setAttribute( 'type', this._type );
		
		this.registerTriggerElement( d, 'click', 'Click' );
		this.registerTriggerElement( d, 'change', 'Change' );
		
		return d;
	}
	
});