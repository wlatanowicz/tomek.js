/** section: WebControls_ValidationControls
 * mixin TValidatableMixin
 * 
 * Mixin adding ability to be validated
 * 
 **/
mixin( 'TValidatableMixin', {
	
	_controlIsValidatable : true,// && (this.getValue ? true : false),
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'ErrorCssClass',
					{ name: 'IsValid', type: 'bool' }
				);
		return arr;
	},
	
	setIsValid : function( v ){
		this._IsValid = parseBool( v );
	},
	
	getIsValid : function(){
		return this._IsValid;
	}
	
});