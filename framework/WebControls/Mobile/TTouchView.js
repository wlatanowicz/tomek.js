//= require TPanel

klass( 'TTouchView', TPanel,  {

	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'HasHeader', type: 'bool', default: true },
                    { name: 'HasFooter', type: 'bool', default: true },
                    { name: 'HasPadding', type: 'bool', default: true }
				);
		return arr;
	},
	
	setAdditionalCssClasses : function( class_string ){
		var class_a = class_string.split( ' ' );
		
		class_a = class_a.filter( function(e){ return e != 'padding' } );
		
		if ( class_a.indexOf( 'content' ) == -1 ){
			class_a.push( 'content' );
		}
		
		if ( this.getHasHeader() ){
			if ( class_a.indexOf( 'has-header' ) == -1 ){
				class_a.push( 'has-header' );
			}
		}else{
			class_a = class_a.filter( function(e){ return e != 'has-header' } );
		}
		
		if ( this.getHasFooter() ){
			if ( class_a.indexOf( 'has-footer' ) == -1 ){
				class_a.push( 'has-footer' );
			}
		}else{
			class_a = class_a.filter( function(e){ return e != 'has-footer' } );
		}
		
		if ( this.getHasPadding() ){
			if ( class_a.indexOf( 'padding' ) == -1 ){
				class_a.push( 'padding' );
			}
		}else{
			class_a = class_a.filter( function(e){ return e != 'padding' } );
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