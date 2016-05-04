//= require TPanel

klass( 'TTouchSideMenu', TPanel, {
	
	
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'IsActive', type: 'bool', default: false }
				);
		return arr;
	},
	
	setIsActive : function( value ){
		this._IsActive = parseBool( value );
		if ( value ){
			this.addCssClass( 'active' );
			this.removeCssClass( 'inactive' );
		}else{
			this.addCssClass( 'inactive' );
			this.removeCssClass( 'active' );
		}
	},
	
	setAdditionalCssClasses : function( class_string ){
		
		if ( class_string.indexOf( 'menu menu-left' ) == -1 ){
			class_string += ' menu menu-left';
		}

		return class_string;
	},
	
	getCssClass : function(){
		var cssClass = this['_CssClass'] !== null && typeof ( this['_CssClass'] ) != 'undefined' ? this['_CssClass'].toString() : '';
		return this.setAdditionalCssClasses( cssClass );
	},
	
	setCssClass : function( value ){
		var value = this.setAdditionalCssClasses( value );
		this['_CssClass'] = value !== null && typeof( value ) != 'undefined' ? value.toString() : '';
		if ( this._renderedMainElement ){
			this._renderedMainElement['className'] = this['_CssClass'];
		}
	}
	
});
