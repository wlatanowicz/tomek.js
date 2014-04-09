//= require TControl

/** section: WebControls
 * class TWebControl < TControl
 * 
 * Control dedicated to render single DOMElements
 * designed to be extended
 * 
 **/
klass( 'TWebControl', TControl, {

	/**
	 * TWebControl#_tagName -> String
	 * 
	 * DOMElement tag name
	 * 
	 **/
	_tagName : 'span',
	
	/**
	 * TWebControl#_rendersChildControls -> Boolean
	 * 
	 * True if there are child controls to render
	 * Should be true for all containers like paragraphs
	 * and false for controls like buttons
	 * 
	 **/
	_rendersChildControls : true,

	/**
	 * TWebControl#_renderedMainElement -> DOMElement
	 * 
	 * Keeps track of rendered control's root DOMElement
	 * 
	 **/
	_renderedMainElement : null,
	
	/**
	 * TWebControl#Attributes -> Hash[String]
	 * 
	 * Stores additional HTML atributes to render
	 * 
	 **/
	
	/**
	 * TWebControl#CssClass -> String
	 * 
	 * CSS class of html tag
	 * 
	 **/
	
	/**
	 * TWebControl#HtmlID -> String
	 * 
	 * id of html tag
	 * 
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 'CssClass',
					{ name:'HtmlID', default: '' },
					{ name:'Attributes', type: 'none', default: {} },
					{ name:'Element', type: 'object' } );
		return arr;
	},
	
	ensureHtmlID : function(){
		if ( this._HtmlID.length <= 0 ){
			if ( ! TWebControl.num ){
				TWebControl.num = 1;
			}
			if ( ! TWebControl.id_prefix ){
				TWebControl.id_prefix = 'tom_';
			}
			this.setHtmlID( TWebControl.id_prefix+(TWebControl.num++) );
		}
	},
	
	setHtmlID : function( v ){
		this._HtmlID = v;
		if ( this.getElement() ){
			this.getElement().setAttribute( 'id', this._HtmlID );
		}
	},
	
    /**
	 * TWebControl#Element -> DOMElement
     * 
     **/
    getElement : function(){
        return this._renderedMainElement;
    },
    
	/**
	 * TWebControl#createMainElement() -> DOMElement
	 * 
	 * Creates control's root DOMElement.
	 * In most cases should be overloaded.
	 * 
	 **/
	createMainElement : function(){
		var d = document.createElement( this._tagName );
		
		if ( this._CssClass ){
			d.setAttribute( 'class', this._CssClass );
		}
		
		var attrs = this.getAttributes();
		
		for ( var attr in attrs ){
			if ( attr === 'style' ){
				//IE8 fix
				d.style.cssText = attrs[attr];
			}else{
				d.setAttribute( attr, attrs[attr] );
			}
		}
		
		var id = this.getHtmlID();
		if ( id.length > 0 ){
			d.setAttribute( 'id', id );
		}
		
		return d;
	},

	//@Override
	renderContents : function(){
		var d = this.createMainElement();
		d.TomekControlObject = this;
		this._renderedMainElement = d;
		if ( this._rendersChildControls ){
			this.renderChildControls( d );
		}
		this.appendChild( d );
	}
	
});