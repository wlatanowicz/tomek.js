//= require TWebControl
//= require TEventResponder

/**
 * class TRadioButton < TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a radio button input
 * 
 **/
var TRadioButton = TWebControl.extend( TEventResponderMixin ).extend( {
	
	//@Override
	_tagName : 'input',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Click','Change'],
	
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
	 * TRadioButton.Checked -> Boolean
	 **/
	
	/**
	 * TRadioButton.Group -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Checked', 'Group' );
		return arr;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		d.setAttribute( 'type', 'radio' );
		d.setAttribute( 'name', this.getGroup() );
		d.checked = this.getChecked();
		
		this.registerTriggerElement( d, 'click', 'Click' );
		this.registerTriggerElement( d, 'change', 'Change' );
		
		return d;
	}
	
});