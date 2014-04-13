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
		var arr = this.base();
		arr.push( 
					{ name: 'Src', elementProperty: 'src' },
					{ name: 'Alt', elementProperty: 'alt' }
					);
		return arr;
	},

	
});