//= require TWebControl
//= require TEventResponder

/** section: WebControls_FormControls
 * class TRadioButton < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a radio button input
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * `on:Change`
 * 
 **/
klass( 'TRadioButton', TWebControl, [ TEventResponderMixin ], {
	
	//@Override
	_tagName : 'input',
	
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Click','Change'],
	
	//@Override
	getDefaultAttributes : function(){
		return { type: 'radio' };
	},
	
	setChecked : function( v ){
		v = parseBool( v );
			
		if ( this._renderedMainElement ){
			this._renderedMainElement.checked = v;
		}
		this._Checked = v;
	},
	
	getChecked : function(){
		if ( this._renderedMainElement ){
			return this._renderedMainElement.checked;
		}
		return this._Checked;
	},
	
	/**
	 * TRadioButton#Checked -> Boolean
	 **/
	
	/**
	 * TRadioButton#Group -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'Checked', type: 'bool', default: false, elementProperty: 'checked', fetchFromElement: true },
					{ name: 'Value', elementProperty: 'value' },
					{ name:'Group', elementProperty: 'name' },
					{ name:'Disabled', type:'bool', elementProperty:'disabled' }
				);
		return arr;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		this.registerTriggerElement( d, 'click', 'Click' );
		this.registerTriggerElement( d, 'change', 'Change' );
		
		return d;
	}
	
});