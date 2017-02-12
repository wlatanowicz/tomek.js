//= require TPanel

klass( 'TTouchMenuContent', TPanel, {
	
	setAdditionalCssClasses : function( class_string ){
		var class_a = class_string.split( ' ' );
		
		if ( class_a.indexOf( 'content' ) == -1 ){
			class_a.push( 'content' );
		}
		
		if ( class_a.indexOf( 'menu-content' ) == -1 ){
			class_a.push( 'menu-content' );
		}
		
		if ( class_a.indexOf( 'menu-animated' ) == -1 ){
			class_a.push( 'menu-animated' );
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