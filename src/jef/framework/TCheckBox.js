//= require TWebControl

/**
 * Control renders a checkbox input
 */
var TCheckBox = TWebControl.extend( TEventResponderMixin ).extend( {
	
	//@Override
	_tagName : 'input',
	
	//@Override
	_rendersChildControls : false,
	
	//@Override
	_triggersEvents : ['Click','Change'],
	
	/**
	 * Set state of control
	 * 
	 * @param v Boolean true if checked
	 */
	setChecked : function( v ){
		v = parseBool( v );
			
		if ( this._renderedMainElement ){
			this._renderedMainElement.checked = v;
		}
		this._Checked = v;
	},
	
	/**
	 * Get state of control
	 * 
	 * @returns Boolean true if checked
	 */
	getChecked : function(){
		if ( this._renderedMainElement ){
			return this._renderedMainElement.checked;
		}
		return this._Checked;
	},
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Checked' );
		return arr;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		d.setAttribute( 'type', 'checkbox' );
		d.checked = this.getChecked();
		
		this.registerTriggerElement( d, 'click', 'Click' );
		this.registerTriggerElement( d, 'change', 'Change' );
		
		return d;
	}
	
});