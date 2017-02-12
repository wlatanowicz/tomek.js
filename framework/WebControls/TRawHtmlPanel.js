//= require TWebControl

/** section: WebControls
 * class TRawHtmlPanel < TWebControl
 * 
 * Control returns the HTML content
 * 
 **/
klass( 'TRawHtmlPanel', TWebControl, {

	//@Override
	_tagName : 'div',
	
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name:'RawHTML', type: 'string', elementProperty: 'innerHTML' }
					 );
		return arr;
	}
	
});