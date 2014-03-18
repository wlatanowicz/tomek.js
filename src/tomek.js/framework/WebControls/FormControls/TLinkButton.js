//= require TLink
//= require TEventResponder

/** section: FormControls
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
		
		this.registerTriggerElement( d, 'click', 'Click' );
		
		return d;
	}
	
});