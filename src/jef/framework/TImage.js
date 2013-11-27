//= require TWebControl

/** section: Controls
 * class TImage < TWebControl
 * 
 * Control renders an image
 * 
 **/
var TImage = TWebControl.extend( {
	
	//@Override
	_tagName : 'img',
	
	//@Override
	_rendersChildControls : false,
	
	/**
	 * TImage.Src -> String
	 **/
	
	/**
	 * TImage.Alt -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Src', 'Alt' );
		return arr;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		d.setAttribute( 'src', this.getSrc() );
		d.setAttribute( 'alt', this.getAlt() );
		
		return d;
	}
	
});