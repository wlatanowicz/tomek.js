//= require TWebControl
//= require TEventResponder

/** section: WebControls
 * class TLink <  TWebControl
 * 
 * Control renders a link
 * 
 **/
klass( 'TLink', TWebControl, {
	
	//@Override
	_tagName : 'a',
	
	/**
	 * TLink#Text -> String
	 **/
	
	/**
	 * TLink#Href -> String
	 **/
	
	/**
	 * TLink#Target -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'Text',
					{ name: 'Href', elementProperty: 'href', default: '#' },
					{ name: 'Target', elementProperty: 'target', default: '_self' }
					);
		return arr;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		if ( this.getText().length > 0 ){
			var t = document.createTextNode( this.getText() );
			d.appendChild( t );
		}
		
		return d;
	}
	
});