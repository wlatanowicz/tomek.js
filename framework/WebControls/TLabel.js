//= require TWebControl

/** section: WebControls
 * class TLabel <  TWebControl
 * 
 * Control renders a label for control
 * 
 **/
klass( 'TLabel', TWebControl, {
	
	//@Override
	_tagName : 'label',
	
	/**
	 * TButton#Text -> String
	 **/
	
	/**
	 * TButton#ForControl -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'Text',
					{ name: 'ForControl', type: 'none' }
				);
		return arr;
	},
	
	getForControl : function(){
		var c = this._ForControl;
		if ( typeof( c ) == 'string' ){
			return this.findControlByID( this._ForControl );
		}
		if ( c != null && c.isKindOf && c.isKindOf( TWebControl ) ){
			return c;
		}
		if ( c != null && c.isKindOf && c.isKindOf( TExpression ) ){
			var c2 = c.valueOf();
			if ( c2 != null && c2.isKindOf && c2.isKindOf( TWebControl ) ){
				return c2;
			}
		}
		if ( c != null ){
			throw new TException( 'Bad ForControl '+c );
		}
		return null;
	},
	
	getForControlId : function(){
		var c = this.getForControl();
		if ( c != null ){
			c.ensureHtmlID();
			return c.getHtmlID();
		}
		return null;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		var for_id = this.getForControlId();
		if ( for_id ){
			d.setAttribute( 'for', for_id );
		}
		
		if ( this.getText().length > 0 ){
			var t = document.createTextNode( this.getText() );
			d.appendChild( t );
		}
		
		return d;
	}
	
});