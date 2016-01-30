//= require TWebControl
//= require TEventResponder
//= require TValidatable
//= require TTwoWayBinding

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
klass( 'TCheckBox', TWebControl, [ TEventResponderMixin, TValidatableMixin, TTwoWayBindingMixin ], {
	
	//@Override
	_tagName : 'input',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Click','Change'],
	
	//@Override
	getDefaultAttributes : function(){
		return { type: 'checkbox' };
	},
	
	_syncTriggerEvents : ['Change'],
	
	_syncControlProperty : 'Checked',
	
	/**
	 * TCheckBox#Checked -> Boolean
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 
					{ name: 'Checked', type: 'bool', elementProperty: 'checked', fetchFromElement: true },
					{ name:'Disabled', type:'bool', elementProperty:'disabled' },
					{ name: 'Value', type:'bool' }
				);
		return arr;
	},

	getValue : function(){
		return this.getChecked();
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		this.registerTriggerElement( d, 'click', 'Click' );
		this.registerTriggerElement( d, 'change', 'Change' );
		
		return d;
	}
	
});