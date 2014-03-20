//= require TWebControl

/** section: FormControls
 * class TOption < TWebControl
 * 
 * Control renders an option for select
 * 
 **/
klass( 'TOption', TWebControl, {

	//@Override
	_tagName : 'option',
	
	//@Override
	_rendersChildControls : true,

	/**
	 * TOption#Text -> String
	 **/
	
	/**
	 * TOption#Value -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'Text', 'Value',
					{ name: 'Selected', 'type': 'bool' }
				);
		return arr;
	},
	
	//@Override
	createMainElement : function(){
		var d = this.base();
		
		d.setAttribute( 'value', this.getValue() );
		
		if ( this.getText() ){
			var t = document.createTextNode( this.getText() );
			d.appendChild( t );
		}
		
		return d;
	}

});