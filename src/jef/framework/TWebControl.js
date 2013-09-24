//= require TControl

/**
 * Control dedicated to render single DOMElements
 * designed to be extended
 */
var TWebControl = TControl.extend( {

	/**
	 * String
	 * DOMElement tag name
	 */
	_tagName : 'span',
	
	/**
	 * Boolean
	 * True if there are child controls to render
	 * Should be true for all containers like paragraphs
	 * and false for controls like buttons
	 */
	_rendersChildControls : true,

	/**
	 * Hash of String
	 * Stores additional HTML atributes to render
	 */
	_Attributes : {},
	
	/**
	 * DOMElement
	 * Keeps track of rendered control's root DOMElement
	 */
	_renderedMainElement : null,
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'CssClass', 'Attributes' );
		return arr;
	},
	
	/**
	 * Creates control's root DOMElement
	 * In most cases should be overloaded
	 * 
	 * @returns DOMElement
	 */
	createMainElement : function(){
		var d = document.createElement( this._tagName );
		
		if ( this._CssClass ){
			d.setAttribute( 'class', this._CssClass );
		}
		
		var attrs = this.getAttributes();
		
		for ( var attr in attrs ){
			d.setAttribute( attr, attrs[attr] );
		}
		
		return d;
	},

	//@Override
	renderContents : function( placeholder ){
		var d = this.createMainElement();
		d.JefControlObject = this;
		this._renderedMainElement = d;
		if ( this._rendersChildControls ){
			this.renderChildControls( d );
		}
		this.appendChild( d, placeholder );
	}
	
});