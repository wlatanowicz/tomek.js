//= require TWebControl
//= require TEventResponder

var TButton = TWebControl.extend( TEventResponderMixin ).extend( {
	
	_tagName : 'input',
	_rendersChildControls : false,
	
	_triggersEvents : ['Click'],
	
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
		
		d.setAttribute( 'type', 'button' );
		d.value = this.getText();
		
		this.registerTriggerElement( d, 'click', 'Click' );
		
		return d;
	}
	
});