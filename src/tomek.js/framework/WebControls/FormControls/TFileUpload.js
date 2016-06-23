//= require TWebControl
//= require TEventResponder
//= require TValidatable

/** section: WebControls_FormControls
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
	
	//@Override
	getDefaultAttributes : function(){
		return { type: 'file' };
	},
	
	/**
	 * TTextBox#Text -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name:'Value', elementProperty: 'value', fetchFromElement: true },
					{ name:'Multiple', type:'bool', default: 'false', elementProperty:'multiple' },
					{ name:'Disabled', type:'bool', elementProperty:'disabled' },
					{ name:'File', type:'none', elementProperty:'file', fetchFromElement: true },
					{ name:'Files', type:'none', elementProperty:'files', fetchFromElement: true }
		);
		return arr;
	},

	//@Override
	createMainElement : function(){
		
		var d = this.base();
		
		this.registerTriggerElement( d, 'change', 'Change' );
		
		return d;
	}
	
});