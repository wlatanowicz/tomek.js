//= require Base

/** section: Utilities
 * klass( new_class_name ) -> void
 * klass( new_class_name, class_definition ) -> void
 * klass( new_class_name, extended_class, class_definition ) -> void
 * klass( new_class_name, extended_class, mixin_list, class_definition ) -> void
 * 
 * - new_class_name (String): name of a new class
 * - extended_class (Object): a class to be extended, defaults to TObject
 * - mixin_list (Array[Object]): list of mixins, defaults to []
 * - class_definition (Object): class body definition, defaults to {}
 * 
 * Creates a new class
 * 
 **/
function klass( new_class_name, extended_class, mixin_list, class_definition ){
    
    if ( arguments.length === 1 ){
        extended_class = TObject;
        mixin_list = [];
        class_definition = {};
    }else
    if ( arguments.length === 2 ){
        class_definition = extended_class;
        extended_class = TObject;
        mixin_list = [];
    }else
    if ( arguments.length === 3 ){
        class_definition = mixin_list;
        mixin_list = [];
    }

    if ( extended_class === null ){
        extended_class = Base;
    }
    
    var mixin_names = [];
    var nc = extended_class;
    var i;
    var j;
    for ( i=0; i<mixin_list.length; i++ ){
        nc = nc.extend( mixin_list[i] );
        mixin_names.push( mixin_list[i].mixin );
    }
    
    var parent_klasses = [];
	if ( extended_class.parent_klasses ){
		for ( i=0; i<extended_class.parent_klasses.length; i++ ){
			parent_klasses.push( extended_class.parent_klasses[i] );
			for( j=0; j<extended_class.mixins.length; j++ ){
				mixin_names.push( extended_class.mixins[j] );
			}
		}
	    parent_klasses.push( extended_class );
	}
    
    class_definition.super = extended_class.prototype;
//    class_definition.parent_klasses = parent_klasses;
//    class_definition.mixins = mixin_names;
    
    var static_definition = {
            klass_name : new_class_name,
            parent_klasses : parent_klasses,
            mixins : mixin_names
    };
    
    nc = nc.extend( class_definition, static_definition );
    
    nc.prototype.klass = nc;

	var namespace = window;
	var name_array = new_class_name.split(".");
	while( name_array.length > 1 ){
		var sub_ns = name_array.shift();
		if ( ! namespace[sub_ns] ){
			namespace[sub_ns] = {};
		}
		namespace = sub_ns;
	}
	namespace[ name_array[0] ] = nc;
}

/** section: Utilities
 * mixin( new_mixin_name, mixin_definition ) -> void
 * 
 * - new_mixin_name (String): name of a new mixin
 * - mixin_definition (Object): mixin body definition, defaults to {}
 * 
 * Creates a new mixin
 * 
 **/
function mixin( new_mixin_name, mixin_definition ){
	if ( arguments.length === 1 ){
		mixin_definition = {};
	}
    var nm = mixin_definition;
    nm.mixin_name = new_mixin_name;
	
	var namespace = window;
	var name_array = new_mixin_name.split(".");
	while( name_array.length > 1 ){
		var sub_ns = name_array.shift();
		if ( ! namespace[sub_ns] ){
			namespace[sub_ns] = {};
		}
		namespace = sub_ns;
	}
	namespace[ name_array[0] ] = nm;
}
