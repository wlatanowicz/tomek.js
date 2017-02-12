//= require TWebControl
//= require TEventResponder
//= require TValidatable
//= require TTwoWayBinding

/** section: WebControls_FormControls
 * class TTextBox < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a text input
 * 
 * ##### Triggered events
 * 
 * `on:Change`
 * `on:KeyUp`
 * `on:KeyDown`
 * `on:Blur`
 * `on:Focus`
 * 
 **/
klass( 'TTextBox', TWebControl, [ TEventResponderMixin, TValidatableMixin, TTwoWayBindingMixin ], {
	
	//@Override
	_tagName : 'input',
	
	_singleLineTagName : 'input',
	_multiLineTagName : 'textarea',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Change','KeyUp','KeyDown','Blur','Focus'],
	
	getValue : function(){
		return this.getText();
	},
	
	setValue : function( v ){
		this.setText( v );
	},
	
	/**
	 * TTextBox#Text -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'Text', elementProperty: 'value', fetchFromElement: true },
					'Value',
					{ name: 'Rows', type: 'int', default: 1 },
					{ name: 'Cols', type: 'int', default: 0 },
					{ name: 'Disabled', type:'bool', elementProperty:'disabled' },
					{ name: 'Type', elementProperty:'type', default: 'text' },
					{ name: 'Model', type:'model', syncControlProperty: 'Text', syncTriggerEvents: ['Change','KeyUp'] }
		);
		return arr;
	},

	//@Override
	createMainElement : function(){
		
		var rows = this.getRows();
		var cols = this.getCols();
		
		if ( rows > 1 ){
			this._tagName = this._multiLineTagName;
		}else{
			this._tagName = this._singleLineTagName;
		}
		
		var d = this.base();
		
		if ( rows > 1 ){
			if ( cols > 0 ){
				d.cols = cols;
			}
			d.rows = rows;
			d.removeAttribute( 'type' );
		}else{
			if ( cols > 0 ){
				d.size = cols;
			}
		}
		
		this.registerTriggerElement( d, 'change', 'Change' );
		this.registerTriggerElement( d, 'keyup', 'KeyUp' );
		this.registerTriggerElement( d, 'keydown', 'KeyDown' );
		this.registerTriggerElement( d, 'blur', 'Blur' );
		this.registerTriggerElement( d, 'focus', 'Focus' );
		
		return d;
	}
	
});