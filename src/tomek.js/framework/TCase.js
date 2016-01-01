//= require TControl

/** section: Controls
 * class TCase < TControl
 * 
 * Subview of [[TSwitchView]]
 * 
 **/
klass( 'TCase', TControl, {

	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'Condition', type: 'bool', default: true } );
		return arr;
	}

} );