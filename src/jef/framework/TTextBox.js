//= require THtmlElement

var TTextBox = THtmlElement.extend( {
	
	_tagName : 'input',
	_rendersChildControls : false,
	
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
	
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Text' );
		return arr;
	},

	createMainElement : function(){
		var d = this.base();
		
		d.setAttribute( 'type', 'text' );
		d.value = this.getText();
		
		return d;
	}
	
});