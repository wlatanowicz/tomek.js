/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//= require TControl

var TItem = TControl.extend( {

	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'DataItem', 'ItemIndex' );
		return arr;
	}
	
} );