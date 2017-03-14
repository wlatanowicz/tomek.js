import TControl from "../TControl";

export default class TWebControl extends TControl
{

	/**
	 * TWebControl#_tagName -> String
	 * 
	 * DOMElement tag name
	 * 
	 **/
	_tagName = 'span';
	
	/**
	 * TWebControl#_rendersChildControls -> Boolean
	 * 
	 * True if there are child controls to render
	 * Should be true for all containers like paragraphs
	 * and false for controls like buttons
	 * 
	 **/
	_rendersChildControls = true;

	/**
	 * TWebControl#_renderedMainElement -> DOMElement
	 * 
	 * Keeps track of rendered control's root DOMElement
	 * 
	 **/
	_renderedMainElement = null;
	
	/**
	 * TWebControl#_renderedContentPlaceholder -> DOMElement
	 * 
	 * Placeholder for child elements. In most cases null which means that TWebControl#_renderedMainElement is used instead.
	 * 
	 **/
	_renderedContentPlaceholder = null;
	
	/**
	 * TWebControl#Attributes -> Hash@String
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
	
	getDefaultAttributes()
	{
		return {};
	}
	
	constructor()
	{
		super();
		this._Style = {};
		this._renderedMainElement = null;
		this._renderedContentPlaceholder = null;
		this._rendersChildControls = true;
	}

	private _Style = {};

	set Style(style)
	{
		var oldStyle = this._Style;
		this._Style = style;
		if ( this._renderedMainElement ){
			for ( var k in this._Style ){
				this._renderedMainElement.style[k] = this._Style[k];
			}
			for ( var k in oldStyle ){
				if ( this._Style[k] === undefined ){
					this._renderedMainElement.style[k] = "";
				}
			}
		}
	}

	get Style()
	{
		return this._Style;
	}

	private _CssClass = '';

	set CssClass(cls)
	{
		this._CssClass = cls;
		this.applyProperty(this._renderedMainElement, 'CssClass');
	}

	get CssClass(): string
	{
		this.fetchProperty(this._renderedMainElement, 'CssClass');
		return this.converters.string(this._CssClass);
	}

	getElementProperites()
	{
		return {
			"CssClass": "className",
			"HtmlID": "id"
		};
	}

	applyProperties(element)
	{
		let properties = this.getElementProperites();
		for (let propertyName in properties) {
			this.setAttribute(element, properties[propertyName], this[propertyName]);
		}
	}

	applyProperty(element, propertyName: string)
	{
		let properties = this.getElementProperites();
		this.setAttribute(element, properties[propertyName], this[propertyName]);
	}

	fetchProperties(element)
	{
		let properties = this.getElementProperites();
		for (let propertyName in properties) {
			let newValue = this.getAttribute(element, properties[propertyName], null);
			if (newValue !== null) {
				let objectField = '_' + propertyName;
				this[objectField] = newValue;
			}
		}
	}

	fetchProperty(element, propertyName: string, objectField = null)
	{
		let properties = this.getElementProperites();
		let newValue = this.getAttribute(element, properties[propertyName], null);
		if (newValue !== null) {
			objectField = objectField || ('_' + propertyName);
			this[objectField] = newValue;
		}
	}

	propFix(prop: string): string
	{
		switch( prop ){
			case 'htmlFor': return 'for';
			case 'className' : return 'class';
		}
		return prop;
	}
	
	addCssClass(cls)
	{
		if ( ! this.hasCssClass(cls) ){
			var classes = this.CssClass;
			classes = (classes.length > 0) ? (classes+' '+cls) : cls;
			this.CssClass = classes;
		}
	}
	
	removeCssClass(cls)
	{
		var classes = this.CssClass.split( ' ' );
		var new_classes = [];
		for ( var i=0; i<classes.length; i++ ){
			if ( classes[i] && classes[i] != cls ){
				new_classes.push( classes[i] );
			}
		}
		this.CssClass = new_classes.join( ' ' );
	}
	
	hasCssClass(cls): boolean
	{
		var classes = this.CssClass.split( ' ' );
		for ( var i=0; i<classes.length; i++ ){
			if ( classes[i] && classes[i] == cls ){
				return true;
			}
		}
		return false;
	}

	private _HtmlID;

	get HtmlID()
	{
		this.fetchProperty(this._renderedMainElement, 'HtmlID');
		return this.converters.string(this._HtmlID);
	}

	set HtmlID(id: string)
	{
		this._HtmlID = id;
		this.applyProperty(this._renderedMainElement, 'HtmlID');
	}

	private _Attributes = undefined;

	get Attributes()
	{
		if (this._Attributes === undefined) {
			this._Attributes = this.getDefaultAttributes();
		}
		return this._Attributes;
	}

	set Attributes(attrs)
	{
		this._Attributes = attrs;
	}

	private static num;
	private static id_prefix;

	ensureHtmlID()
	{
		if ( this._HtmlID == null
				|| this._HtmlID.length <= 0 ){
			if ( ! TWebControl.num ){
				TWebControl.num = 1;
			}
			if ( ! TWebControl.id_prefix ){
				TWebControl.id_prefix = 'tom_';
			}
			this.HtmlID = TWebControl.id_prefix+(TWebControl.num++);
		}
	}
	
    /**
	 * TWebControl#Element -> DOMElement
     * 
     **/
    get Element()
	{
        return this._renderedMainElement;
    }
    
	/**
	 * TWebControl#createMainElement() -> DOMElement
	 * 
	 * Creates control's root DOMElement.
	 * In most cases should be overloaded.
	 * 
	 **/
	createMainElement()
	{
		var d = document.createElement( this._tagName );
		
		this.applyProperties(d);

		for ( var k in this.Style ){
			d.style[k] = this.Style[k];
		}
			
		var attrs = this.Attributes;
		for ( var attr in attrs ){
			this.setAttribute(d, attr, attrs[attr]);
		}
				
		return d;
	}

	appendMainElement( el )
	{
		this._renderedNodes.push( el );
		this.ensurePositionMarker();
		this._positionMarker.parentNode.insertBefore( el, this._positionMarker );
	}
	
	appendChild( el )
	{
		this._renderedMainElement.appendChild( el );
	}
	
	//@Override
	renderContents()
	{
		this._renderedContentPlaceholder = null;
		this._renderedMainElement = this.createMainElement();
		this._renderedMainElement.TomekControlObject = this;
		if ( this._rendersChildControls ){
			this.renderChildControls( this._renderedContentPlaceholder || this._renderedMainElement );
		}
		this.appendMainElement( this._renderedMainElement );
	}
	
	setAttribute( el, propertyName, value )
	{
		if (el) {
			if (value) {
				el[propertyName] = value;
			} else {
				el[propertyName] = value;
				el.removeAttribute(this.propFix(propertyName));
			}
		}
	}
	
	getAttribute( el, property, fallback = null )
	{
		return el
			? el[ property.elementProperty ]
			: fallback;
	}
	
	removeRenderedNodes()
	{
		this.removeMainElement();
		super.removeRenderedNodes();
	}
	
	removeMainElement()
	{
		var el = this._renderedMainElement;
		this._renderedMainElement = null;
		
		if ( el ){
			this.fetchProperties(el);
		}
	}
}