//= require TControl
//= require TTwoWayBinding

/** section: Controls
 * class TLiteral < TControl
 * 
 * Simple control rendering text
 * 
 **/
klass( 'TLiteral', TControl, [TTwoWayBindingMixin], {

	_textNode : null,

	constructor : function( options ){
		this.base(options);
		this._textNode = null;
	},

	/**
	 * TLiteral#Text -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 
				'Text',
				{ name:'Model', type:'model', syncControlProperty: 'Text', syncTriggerEvents: [] }
		);
		
		return arr;
	},
	
	setText : function( value ){
		this._Text = value;
		if ( this._textNode ){
			this._textNode.textContent = this.getText();
		}
	},
		
	//@Override
	renderContents : function(){
		var t = document.createTextNode( this.getText() );
		this._textNode = t;
		this.appendChild( t );
	}

});