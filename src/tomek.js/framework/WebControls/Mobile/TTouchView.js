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
		if ( class_string.indexOf( 'content' ) == -1 ){
			class_string += ' content';
		}
		
		if ( this.getHasHeader() ){
			if ( class_string.indexOf( 'has-header' ) == -1 ){
				class_string += ' has-header'; 
			}
		}else{
			class_string = class_string.replace( new RegExp( 'has-header', 'g' ), '' );
		}
		
		if ( this.getHasFooter() ){
			if ( class_string.indexOf( 'has-footer' ) == -1 ){
				class_string += ' has-footer';
			}
		}else{
			class_string = class_string.replace( new RegExp( 'has-footer', 'g' ), '' );
		}
		
		if ( this.getHasPadding() ){
			if ( class_string.indexOf( 'padding' ) == -1 ){
				class_string += ' padding';
			}
		}else{
			class_string = class_string.replace( new RegExp( 'padding', 'g' ), '' );
		}
		
		return class_string;
	},
	
	getCssClass : function(){
		var cssClass = this['_CssClass'] !== null && typeof ( this['_CssClass'] ) != 'undefined' ? this['_CssClass'].toString() : '';
		return this.setAdditionalCssClasses( cssClass );
	},
	
	setCssClass : function( value ){
		var value = this.base( this.setAdditionalCssClasses( value ) );
		this['_CssClass'] = value !== null && typeof( value ) != 'undefined' ? value.toString() : '';
		if ( this._renderedMainElement ){
			this._renderedMainElement['className'] = this['_CssClass'];
		}
	}

});