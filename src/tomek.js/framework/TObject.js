//= require Base

function klass( new_class_name, extended_class, mixin_list, class_definition ){
    
    console.log( new_class_name );
    
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
    parent_klasses.push( extended_class.klass );
    
    class_definition.klass = new_class_name;
    class_definition.parent_klasses = parent_klasses;
    class_definition.mixins = mixin_names;
    
    nc = nc.extend( class_definition );

    nc.klass = new_class_name;
    nc.parent_klasses = parent_klasses;
    nc.mixins = mixin_names;
    
    eval( new_class_name+' = nc;' );
}

function mixin( new_mixin_name, mixin_definition ){
    var nm = mixin_definition;
    nm.mixin = new_mixin_name;
    eval( new_mixin_name+' = nm;' );
}

var TObject = Base.extend( {
    klass : 'TObject',
    parent_klasses : [],
    mixins : [],
    
    isTypeOf : function( class_name ){
        return this.klass === class_name;
    },
    
    isMemberOf : function( class_name ){
        return this.isTypeOf( class_name );
    },
    
    isKindOf : function( class_name ){
        if ( this.isTypeOf( class_name ) ){
            return true;
        }
        var i;
        for( i=0; i<this.mixins.length; i++ ){
            if ( this.mixins[i] === mixin_name ){
                return true;
            }
        }
        return false;
    },
    
    includesMixin : function( mixin_name ){
        var i;
        for( i=0; i<this.mixins.length; i++ ){
            if ( this.mixins[i] === mixin_name ){
                return true;
            }
        }
        return false;
    }
    
} );

TObject.klass = 'TObject';
TObject.parent_klasses = [];
TObject.mixins = [];
