//= require Base
//= require Exception

/**
 * == Utilities ==
 **/

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
