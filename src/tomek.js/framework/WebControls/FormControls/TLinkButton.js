//= require TLink
//= require TEventResponder

/** section: WebControls_FormControls
 * class TLinkButton <  TLink
 * includes TEventResponderMixin
 * 
 * Control renders a button based on a link
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * 
 **/
klass( 'TLinkButton', TLink, [ TEventResponderMixin ], {
	
	//@Override
	_triggersEvents : ['Click'],
	
	//@Override
	createMainElement : function(){
		var d = this.base();
		
		this.registerTriggerElement( d, 'click', 'Click', true );
		
		return d;
	}
	
});