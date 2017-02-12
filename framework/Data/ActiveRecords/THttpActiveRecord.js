//= require TObject

/** section: Data_ActiveRecords
 * class THttpActiveRecord <  TObject
 * 
 * Active record object. Used to store data processed by query object.
 * Implemments all basic methods.
 * 
 **/
klass( 'THttpActiveRecord', {
	
	
	__status : null,
	__query : null,


	clear : function(){
		this.__query.recreate( this );
	},

	load : function( params, query_params ){
		return this.__query.loadInto( this, params, query_params );
	},
	
	reload : function( query_params ){
		return this.__query.loadInto( this, this, query_params );
	},

	save : function( query_params ){
		return this.__query.save( this, query_params );
	},

	remove : function( query_params ){
		return this.__query.remove( this, query_params );
	}

	
});