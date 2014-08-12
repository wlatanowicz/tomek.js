//= require TButton

/** section: FormControls
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
klass( 'UIButton', TButton, {
	
	//@Override
	_tagName : 'button',
	
	//@Override
	getDefaultAttributes : function(){
		return {};
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

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		this.registerTriggerElement( d, 'click', 'Click' );
		
		if ( this.getText().length > 0 ){
			var t = document.createTextNode( this.getText() );
			d.appendChild( t );
		}
		
		return d;
	}
	
});