//= require TControl

/** section: Controls
 * class TCase < TControl
 * 
 * Simple control rendering text
 * 
 **/
klass( 'TCase', TControl, {

	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'Condition', type: 'bool', default: true } );
		return arr;
	}

} );