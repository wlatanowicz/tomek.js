//= require TWebControl
//= require TEventResponder

/** section: Controls
 * class TButton <  TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a button
 * 
 **/
var TButton = TWebControl.extend( TEventResponderMixin ).extend( {
	
	//@Override
	_tagName : 'input',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Click'],
	
	setText : function( v ){
		if ( this._renderedMainElement ){
			this._renderedMainElement.value = v;
		}
		this._Text = v;
	},
	
	/**
	 * TButton.Text -> String
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
		
		d.setAttribute( 'type', 'button' );
		d.value = this.getText();
		
		this.registerTriggerElement( d, 'click', 'Click' );
		
		return d;
	}
	
});