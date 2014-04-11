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
	
	//@Override
	_rendersChildControls : true,
	
	//@Override
	_triggersEvents : ['Click'],
	
	/**
	 * TButton#Text -> String
	 **/
	
	/**
	 * TButton#Href -> String
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'Text',
					{ name: 'Href', elementProperty: 'href' }
					);
		return arr;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		d.setAttribute( 'href', this.getHref() );
		
		if ( this.getText().length > 0 ){
			var t = document.createTextNode( this.getText() );
			d.appendChild( t );
		}
		
		return d;
	}
	
});