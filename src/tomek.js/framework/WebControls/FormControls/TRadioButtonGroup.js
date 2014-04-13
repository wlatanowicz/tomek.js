//= require TControl
//= require TRadioButton

/** section: FormControls
 * class TRadioButtonGroup < TControl
 * 
 * Control renders a radio button input
 * 
 * ##### Triggered events
 * 
 * `on:Click`
 * `on:Change`
 * 
 **/
klass( 'TRadioButton', TControl, {
	
	setValue : function( v ){
	},
	
	getValue : function(){
	},
	
	/**
	 * TRadioButton#Value -> String
	 **/
	
	/**
	 * TRadioButton#Group -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Value', 'Group' );
		return arr;
	}

});