//= require TControl

var TWebControl = TControl.extend( {

	_tagName : 'span',
	_rendersChildControls : true,

	_Attributes : {},
	
	_renderedMainElement : null,
	
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'CssClass', 'Attributes' );
		return arr;
	},
	
	getClientID : function(){
		return this.getID();
	},

	createMainElement : function(){
		var d = document.createElement( this._tagName );
		
		var id = this.getClientID();
		if ( id ){
			d.setAttribute( 'id', id );
		}
		
		if ( this._CssClass ){
			d.setAttribute( 'class', this._CssClass );
		}
		
		var attrs = this.getAttributes();
		
		for ( var attr in attrs ){
			d.setAttribute( attr, attrs[attr] );
		}
		
		return d;
	},

	renderContents : function( placeholder ){
		var d = this.createMainElement();
		this._renderedMainElement = d;
		if ( this._rendersChildControls ){
			this.renderChildControls( d );
		}
		this.appendChild( d, placeholder );
	}
	
});