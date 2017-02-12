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
	 * TWebControl#_renderedContentPlaceholder -> DOMElement
	 * 
	 * Placeholder for child elements. In most cases null which means that TWebControl#_renderedMainElement is used instead.
	 * 
	 **/
	_renderedContentPlaceholder : null,
	
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
	
	getDefaultAttributes : function(){
		return {};
	},
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'CssClass', default: '', elementProperty: 'className' },
					{ name:'Style', default: {}, elementProperty: 'style', fetchFromElement: false, type: 'object' },
					{ name:'HtmlID', default: '', elementProperty: 'id' },
					{ name:'Attributes', type: 'none', default: this.getDefaultAttributes() },
					{ name:'Element', type: 'object' } );
		return arr;
	},
	
	constructor : function( options ){
		this._Style = {};
		this._renderedMainElement = null;
		this._renderedContentPlaceholder = null;
		this._rendersChildControls = true;
		this.base( options );
	},
	
	propFix : function( prop ){
		switch( prop ){
			case 'htmlFor': return 'for';
			case 'className' : return 'class';
		}
		return prop;
	},
	
	addCssClass : function( cls ){
		if ( ! this.hasCssClass( cls ) ){
			var classes = this.getCssClass();
			classes = (classes.length > 0) ? (classes+' '+cls) : cls;
			this.setCssClass(  classes );
		}
	},
	
	removeCssClass : function( cls ){
		var classes = this.getCssClass().split( ' ' );
		var new_classes = [];
		for ( var i=0; i<classes.length; i++ ){
			if ( classes[i] && classes[i] != cls ){
				new_classes.push( classes[i] );
			}
		}
		this.setCssClass( new_classes.join( ' ' ) );
	},
	
	hasCssClass : function( cls ){
		var classes = this.getCssClass().split( ' ' );
		for ( var i=0; i<classes.length; i++ ){
			if ( classes[i] && classes[i] == cls ){
				return true;
			}
		}
		return false;
	},
	
	setStyle : function( style ){
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
	},
	
	ensureHtmlID : function(){
		if ( this._HtmlID == null
				|| this._HtmlID.length <= 0 ){
			if ( ! TWebControl.num ){
				TWebControl.num = 1;
			}
			if ( ! TWebControl.id_prefix ){
				TWebControl.id_prefix = 'tom_';
			}
			this.setHtmlID( TWebControl.id_prefix+(TWebControl.num++) );
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
		
		var props = this.getPublicProperties();
		var i;
		for ( i=0; i<props.length; i++ ){
			if ( typeof( props[i] ) != 'string'
					&& typeof( props[i].elementProperty ) == 'string' ){
				
				var value = this['get'+props[i].name]();
                this.setAttribute( d, props[i], value );	
				
			}
		}
		
		for ( var k in this._Style ){
			d.style[k] = this._Style[k];
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
				
		return d;
	},

	appendMainElement : function( el ){
		this._renderedNodes.push( el );
		this.ensurePositionMarker();
		this._positionMarker.parentNode.insertBefore( el, this._positionMarker );
	},
	
	appendChild : function( el ){
		this._renderedMainElement.appendChild( el );
	},
	
	//@Override
	renderContents : function(){
		this._renderedContentPlaceholder = null;
		this._renderedMainElement = this.createMainElement();
		this._renderedMainElement.TomekControlObject = this;
		if ( this._rendersChildControls ){
			this.renderChildControls( this._renderedContentPlaceholder || this._renderedMainElement );
		}
		this.appendMainElement( this._renderedMainElement );
	},
	
	setAttribute : function( el, property, value ){
		if ( value ){
			el[ property.elementProperty ] = value;
		}else{
			el[ property.elementProperty ] = value;
			el.removeAttribute( this.propFix( property.elementProperty ) );
		}
	},
	
	getAttribute : function( el, property ){
		return el[ property.elementProperty ];
	},
	
	removeRenderedNodes : function(){
		this.removeMainElement();
		this.base();
	},
	
	removeMainElement : function(){
		var el = this._renderedMainElement;
		this._renderedMainElement = null;
		
		if ( el ){
			var props = this.getPublicProperties();
			var i;
			for ( i=0; i<props.length; i++ ){
				if ( typeof( props[i] ) != 'string'
						&& typeof( props[i].elementProperty ) == 'string'
						&& props[i].fetchFromElement ){

					this['set'+props[i].name]( this.getAttribute( el, props[i] ) );

				}
			}
		}
	},
	
	//@Override
	createSetterFunction : function( property ){
		if ( typeof ( property.elementProperty ) == 'undefined' ){
			this.base( property );
		}else{
			if ( property.settype === 'none' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = value;
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			if ( property.settype === 'string' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = value !== null && typeof( value ) != 'undefined' ? value.toString() : '';
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			if ( property.settype === 'int' || property.settype === 'integer' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = parseInt( value );
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			if ( property.settype === 'float' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = parseFloat( value );
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			if ( property.settype === 'bool' || property.settype === 'boolean' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = parseBool( value.toString() );
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			if ( property.settype === 'object' || property.settype === 'obj' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = value !== null && typeof( value ) != 'undefined' ? value.valueOf() : null;
					if ( this._renderedMainElement ){
						this.setAttribute( this._renderedMainElement, property, this['_'+property.name] );
					}
				};
			}else
			{
				throw new TException( 'Bad setter type conversion: '+property.type );
			}
		}
	},
	
	//@Override
	createGetterFunction : function( property ){
		if ( typeof ( property.elementProperty ) == 'undefined' ){
			this.base( property );
		}else{
			if ( property.type === 'none' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return this['_'+property.name];
				};
			}else
			if ( property.type === 'string' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return this['_'+property.name] !== null && typeof ( this['_'+property.name] ) != 'undefined' ? this['_'+property.name].toString() : '';
				};
			}else
			if ( property.type === 'int' || property.type === 'integer' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return parseInt( this['_'+property.name] );
				};
			}else
			if ( property.type === 'float' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return parseFloat( this['_'+property.name] );
				};
			}else
			if ( property.type === 'bool' || property.type === 'boolean' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return parseBool( this['_'+property.name] );
				};
			}else
			if ( property.type === 'object' || property.type === 'obj' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement && property.fetchFromElement ){
						this['_'+property.name] = this.getAttribute( this._renderedMainElement, property );
					}
					return this['_'+property.name] !== null && typeof ( this['_'+property.name] ) != 'undefined' ? this['_'+property.name].valueOf() : null;
				};
			}else
			{
				throw new TException( 'Bad getter type conversion: '+property.type );
			}
		}
	}

});