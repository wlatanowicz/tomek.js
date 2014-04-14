//= require TWebControl
//= require TEventResponder
//= require TValidatable

/** section: FormControls
 * class TFileUpload < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a file input
 * 
 * ##### Triggered events
 * 
 * `on:Change`
 * 
 **/
klass( 'TFileUpload', TWebControl, [ TEventResponderMixin, TValidatableMixin ], {
	
	//@Override
	_tagName : 'input',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Change'],
	
	/**
	 * TTextBox#Text -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name:'Value', elementProperty: 'value' },
					{ name:'Multiple', type:'bool', default: 'false', elementProperty:'multiple' },
					{ name:'Disabled', type:'bool', elementProperty:'disabled' }
		);
		return arr;
	},

	//@Override
	createMainElement : function(){
		
		var d = this.base();
		d.setAttribute( 'type', 'file' );
		
		this.registerTriggerElement( d, 'change', 'Change' );
		
		return d;
	}
	
});