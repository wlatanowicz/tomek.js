//= require TWebControl

/** section: WebControls
 * class TImage < TWebControl
 * 
 * Control renders an image
 * 
 **/
klass( 'TImage', TWebControl, {
	
	//@Override
	_tagName : 'img',
	
	//@Override
	_rendersChildControls : false,
	
	/**
	 * TImage#Src -> String
	 **/
	
	/**
	 * TImage#Alt -> String
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