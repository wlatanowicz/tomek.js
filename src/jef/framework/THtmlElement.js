//= require TControl

var THtmlElement = TControl.extend( {

	_tagName : 'span',
	_rendersChildControls : true,

	_attributes : {},
	
	_renderedMainElement : null,
	
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'Attributes' );
		return arr;
	},

	createMainElement : function(){
		var d = document.createElement( this._tagName );
		
		var id = this.getID();
		if ( id ){
			d.setAttribute( 'id', id );
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