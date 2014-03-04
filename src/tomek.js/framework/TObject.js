//= require Base

/** section: Utilities
 * klass( new_class_name, class_definition ) -> void
 * klass( new_class_name, extended_class, class_definition ) -> void
 * klass( new_class_name, extended_class, mixin_list, class_definition ) -> void
 * 
 * - new_class_name (String): name of a new class
 * - extended_class (Object): a class to be extended
 * - mixin_list (Array[Object]): list of mixins
 * - class_definition (Object): class body definition
 * 
 * Creates a new class
 * 
 **/
function klass( new_class_name, extended_class, mixin_list, class_definition ){
    
    if ( arguments.length === 2 ){
        class_definition = extended_class;
        extended_class = null;
        mixin_list = [];
    }else
    if ( arguments.length === 3 ){
        class_definition = mixin_list;
        mixin_list = [];
    }

    if ( extended_class === null ){
        extended_class = TObject;
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
    for ( i=0; i<extended_class.parent_klasses.length; i++ ){
        parent_klasses.push( extended_class.parent_klasses[i] );
        for( j=0; j<extended_class.mixins.length; j++ ){
            mixin_names.push( extended_class.mixins[j] );
        }
    }
    parent_klasses.push( extended_class );
    
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

    eval( new_class_name+' = nc;' );
}

/** section: Utilities
 * mixin( new_mixin_name, mixin_definition ) -> void
 * 
 * - new_mixin_name (String): name of a new mixin
 * - mixin_definition (Object): mixin body definition
 * 
 * Creates a new mixin
 * 
 **/
function mixin( new_mixin_name, mixin_definition ){
    var nm = mixin_definition;
    nm.mixin_name = new_mixin_name;
    eval( new_mixin_name+' = nm;' );
}

/** section: Utilities
 * class TObject
 * 
 **/
var TObject = Base.extend( {
    
    klass : null,
    super : null,
    
	/**
	 * TObject#isTypeOf( klass ) -> Boolean
	 * - klass (Object|String): class or class name
	 * 
	 * Checks if the object is a particular type
	 * 
	 **/
    isTypeOf : function( klass ){
        if ( klass.klass_name ){
            klass = klass.klass_name;
        }
        return this.klass.klass_name === klass;
    },
    
	/** alias of: TObject#isTypeOf
	 * TObject#isMemberOf( klass ) -> Boolean
	 * - klass (Object|String): class or class name
	 * 
	 **/
    isMemberOf : function( klass ){
        return this.isTypeOf( klass );
    },
    
	/**
	 * TObject#isKindOf( klass ) -> Boolean
	 * - klass (Object|String): class or class name
	 * 
	 * Checks if the object is a particular type or
     * a subclass of if
	 * 
	 **/
    isKindOf : function( klass ){
        if ( klass.klass_name ){
            klass = klass.klass_name;
        }
        if ( this.isTypeOf( klass ) ){
            return true;
        }
        var i;
        for( i=0; i<this.klass.parent_klasses.length; i++ ){
            if ( this.klass.parent_klasses[i].klass_name === klass ){
                return true;
            }
        }
        return false;
    },
    
	/**
	 * TObject#includesMixin( mixin ) -> Boolean
	 * - mixin_name (Object|String): mixin or mixin name
	 * 
	 * Checks if the object includes a mixin
	 * 
	 **/
    includesMixin : function( mixin ){
        if ( mixin.mixin_name ){
            mixin = mixin.mixin_name;
        }
        
        var i;
        for( i=0; i<this.mixins.length; i++ ){
            if ( this.mixins[i].mixin_name === mixin ){
                return true;
            }
        }
        return false;
    }
    
},{
    klass_name : 'TObject',
    parent_klasses : [],
    mixins : []
});

TObject.prototype.klass = TObject;
