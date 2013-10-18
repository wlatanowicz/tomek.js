//= require Base
//= require Exception
//= require Compat-IE8

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

/** section: Utilities
 * Element_ELEMENT_NODE = 1
 * 
 * Defines constant
 * 
 *    Element.ELEMENT_NODE = 1
 *		
 * if not defined
 * 
 **/

// Fix for Safari
if ( ! Element.ELEMENT_NODE ){
	Element.ELEMENT_NODE = 1
}

