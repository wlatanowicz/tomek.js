//= require TWebControl
//= require TEventResponder

/** section: Controls
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
var TTextBox = TWebControl.extend( TEventResponderMixin ).extend( {
	
	//@Override
	_tagName : 'input',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Change','KeyUp','KeyDown','Blur','Focus'],
	
	setText : function( v ){
		if ( this._renderedMainElement ){
			this._renderedMainElement.value = v;
		}
		this._Text = v;
	},
	
	getText : function(){
		if ( this._renderedMainElement ){
			return this._renderedMainElement.value;
		}
		return this._Text;
	},
	
	/**
	 * TTextBox.Text -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Text' );
		return arr;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		d.setAttribute( 'type', 'text' );
		d.value = this.getText();
		
		this.registerTriggerElement( d, 'change', 'Change' );
		this.registerTriggerElement( d, 'keyup', 'KeyUp' );
		this.registerTriggerElement( d, 'keydown', 'KeyDown' );
		this.registerTriggerElement( d, 'blur', 'Blur' );
		this.registerTriggerElement( d, 'focus', 'Focus' );
		
		return d;
	}
	
});