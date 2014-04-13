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
		arr.push( 'Text', 
					{ name: 'Value', elementProperty: 'value' },
					{ name: 'Selected', 'type': 'bool', elementProperty: 'selected' }
				);
		return arr;
	},
	
	//@Override
	createMainElement : function(){
		var d = this.base();
		
		d.setAttribute( 'value', this.getValue() );
		d.selected = this.getSelected();
		
		if ( this.getText() ){
			var t = document.createTextNode( this.getText() );
			d.appendChild( t );
		}
		
		return d;
	}

});