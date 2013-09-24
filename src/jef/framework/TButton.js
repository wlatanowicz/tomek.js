//= require TWebControl
//= require TEventResponder

/**
 * Control renders a button
 */
var TButton = TWebControl.extend( TEventResponderMixin ).extend( {
	
	//@Override
	_tagName : 'input',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Click'],
	
	/**
	 * Sets button's label text
	 * 
	 * @param v String text
	 */
	setText : function( v ){
		if ( this._renderedMainElement ){
			this._renderedMainElement.value = v;
		}
		this._Text = v;
	},
	
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