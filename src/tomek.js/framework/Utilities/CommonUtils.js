//= require Base
//= require Exception

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
	}
}

function elementHasClassName( e, c ){
	var classes = e['class'].split( ' ' );
	for ( var i=0; i<classes.length; i++ ){
		if ( classes[i] && classes[i] == c ){
			return true;
		}
	}
	return false;
}

function elementAddClassName( e, c ){
	if ( ! elementHasClassName( e, c ) ){
		e['class'] += ' ' + c;
	}
}

function elementRemoveClassName( e, c ){
	var classes = e['class'].split( ' ' );
	var new_classes = [];
	for ( var i=0; i<classes.length; i++ ){
		if ( classes[i] && classes[i] != c ){
			new_classes.push( classes[i] );
		}
	}
	e['class'] = classes.join( ' ' );
}
