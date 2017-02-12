//= require TControl
//= require TRadioButton

/** section: WebControls_FormControls
 * class TRadioButtonGroup < TControl
 * 
 * Control fetches value from radio button inputs
 * 
 **/
klass( 'TRadioButtonGroup', TControl, {
	
	setValue : function( v ){
		var btns = this.$$kind( TRadioButton );
		var checked = false;
		var group = this.getGroup();
		for ( var i=0; !checked && i<btns.length; i++ ){
			if ( btns[i].getValue() == v && ( group == '' || btns[i].getGroup() == group ) ){
				btns[i].setChecked(true);
				checked = true;
			}
		}
	},
	
	getValue : function(){
		var btns = this.$$kind( TRadioButton );
		var group = this.getGroup();
		for ( var i=0; i<btns.length; i++ ){
			if ( btns[i].getChecked() && ( group == '' || btns[i].getGroup() == group ) ){
				return btns[i].getValue();
			}
		}
		return null;
	},
	
	/**
	 * TRadioButton#Value -> String
	 **/
	
	/**
	 * TRadioButton#Group -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'Value', 'Group' );
		return arr;
	}

});