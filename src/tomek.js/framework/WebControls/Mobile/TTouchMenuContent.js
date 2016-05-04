//= require TPanel

klass( 'TTouchMenuContent', TPanel, {
	
	setAdditionalCssClasses : function( class_string ){
		
		if ( class_string.indexOf( 'content' ) == -1 ){
			class_string += ' content';
		}
		
		if ( class_string.indexOf( 'menu-content menu-animated' ) == -1 ){
			class_string += ' menu-content menu-animated';
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