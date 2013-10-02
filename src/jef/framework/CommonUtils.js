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
if ( !parseBool ){
	function parseBool( v ){
		return v === true
				|| v == 1
				|| v === 'true';
	}
}

/** section: Utilities
 * Array_prototype_indexOf( elt[, from] ) -> int
 * 
 * [Original source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
 * 
 **/
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
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