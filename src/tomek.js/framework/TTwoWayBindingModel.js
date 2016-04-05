/** section: Controls
 * class TTwoWayBindingModel < TObject
 * 
 * 
 **/
klass( 'TTwoWayBindingModel', {
	
	_object : null,
	_property : null,
	
	constructor: function( object, property ){
		this._object = object;
		this._property = property;
	},
	
	getObject : function(){
		return this._object;
	},
	
	setValue : function( value ){
		this._object[ this._property ] = value;
	},
	
	getValue : function(){
		return this._object[ this._property ];
	}
	
} );