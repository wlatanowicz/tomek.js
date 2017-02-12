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
		var class_a = class_string.split( ' ' );
		
		if ( class_a.indexOf( 'menu' ) == -1 ){
			class_a.push( 'menu' );
		}
		if ( class_a.indexOf( 'menu-left' ) == -1 ){
			class_a.push( 'menu-left' );
		}
		
		if ( this.getIsActive() ){
			class_a = class_a.filter( function(e){ return e != 'inactive' } );
			if ( class_a.indexOf( 'active' ) == -1 ){
				class_a.push( 'active' );
			}
		}else{
			class_a = class_a.filter( function(e){ return e != 'active' } );
			if ( class_a.indexOf( 'inactive' ) == -1 ){
				class_a.push( 'inactive' );
			}
		}

		return class_a.join( ' ' ) ;
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
