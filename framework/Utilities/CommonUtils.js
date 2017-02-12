/** section: Utilities
 * parseBool( v ) -> Boolean
 * - v (Boolean|String|number): a value
 * 
 * Bolean equivalent of parseInt
 * 
 **/
if ( ! window.parseBool ){
	function parseBool( v ){
		return v === true
				|| v == 1
				|| v === 'true';
	}
}

if ( ! Array.prototype.in_array ){
	Array.prototype.in_array = function(p_val) {
		for(var i = 0, l = this.length; i < l; i++) {
			if(this[i] == p_val) {
				return true;
			}
		}
		return false;
	};
}

//fix for Safari
if ( ! String.trim ){
	String.trim = function( str ){
		return str.trim();
	};
}