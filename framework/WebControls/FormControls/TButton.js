//= require TWebControl
//= require TEventResponder

/** section: WebControls_FormControls
 * class TButton <  TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a button
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * 
 **/
klass( 'TButton', TWebControl, [ TEventResponderMixin ], {
	
	//@Override
	_tagName : 'button',
	
	//@Override
	_rendersChildControls : true,
	
	//@Override
	_triggersEvents : ['Click'],
	
	_renderedTextNode : null,
	
	constructor : function( options ){
		this.base( options );
		this._renderedTextNode = null;
	},
	
	/**
	 * TButton#Text -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 
					'Text',
					{ name:'Disabled', type:'bool', elementProperty:'disabled' }
					);
		return arr;
	},
	
	setText : function( value ){
		this._Text = value !== null && typeof( value ) != 'undefined' ? value.toString() : '';
		if ( this._renderedTextNode ){
			this._renderedTextNode.textContent = this._Text;
		}
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		var t = document.createTextNode( this.getText() );
		d.appendChild( t );
		this._renderedTextNode = t;
		
		this.registerTriggerElement( d, 'click', 'Click' );
		
		return d;
	}
	
});