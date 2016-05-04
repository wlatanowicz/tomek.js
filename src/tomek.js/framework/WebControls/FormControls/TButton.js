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

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		if ( this.getText().length > 0 ){
			var t = document.createTextNode( this.getText() );
			d.appendChild( t );
		}
		
		this.registerTriggerElement( d, 'click', 'Click' );
		
		return d;
	}
	
});