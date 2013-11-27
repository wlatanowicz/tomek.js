//= require TWebControl

/** section: Controls
 * class TOption < TWebControl
 * 
 * Control renders an option for select
 * 
 **/
var TOption = TWebControl.extend( {

	//@Override
	_tagName : 'option',
	
	//@Override
	_rendersChildControls : true,

	/**
	 * TButton.Text -> String
	 **/
	
	/**
	 * TButton.Value -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Text', 'Value' );
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