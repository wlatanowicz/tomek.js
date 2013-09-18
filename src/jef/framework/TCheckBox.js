//= require TWebControl

var TCheckBox = TWebControl.extend( {
	
	_tagName : 'input',
	_rendersChildControls : false,
	
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
	
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Checked' );
		return arr;
	},

	createMainElement : function(){
		var d = this.base();
		
		d.setAttribute( 'type', 'checkbox' );
		d.checked = this.getChecked();
		
		return d;
	}
	
});