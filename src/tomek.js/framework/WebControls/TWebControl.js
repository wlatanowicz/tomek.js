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
		arr.push( { name: 'CssClass', default: '', elementProperty: 'class' },
					{ name:'HtmlID', default: '', elementProperty: 'id' },
					{ name:'Attributes', type: 'none', default: {} },
					{ name:'Element', type: 'object' } );
		return arr;
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
		this.setCssClass( classes.join( ' ' ) );
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
				d[ props[i].elementProperty ] = this['get'+props[i].name]();
			}
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
						this._renderedMainElement[property.elementProperty] = this['_'+property.name];
					}
				};
			}else
			if ( property.settype === 'string' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = value !== null ? value.toString() : '';
					if ( this._renderedMainElement ){
						this._renderedMainElement[property.elementProperty] = this['_'+property.name];
					}
				};
			}else
			if ( property.settype === 'int' || property.settype === 'integer' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = parseInt( value );
					if ( this._renderedMainElement ){
						this._renderedMainElement[property.elementProperty] = this['_'+property.name];
					}
				};
			}else
			if ( property.settype === 'float' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = parseFloat( value );
					if ( this._renderedMainElement ){
						this._renderedMainElement[property.elementProperty] = this['_'+property.name];
					}
				};
			}else
			if ( property.settype === 'bool' || property.settype === 'boolean' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = parseBool( value.toString() );
					if ( this._renderedMainElement ){
						this._renderedMainElement[property.elementProperty] = this['_'+property.name];
					}
				};
			}else
			if ( property.settype === 'object' || property.settype === 'obj' ){
				this['set'+property.name] = function( value ){
					this['_'+property.name] = value !== null ? value.valueOf() : null;
					if ( this._renderedMainElement ){
						this._renderedMainElement[property.elementProperty] = this['_'+property.name];
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
					if ( this._renderedMainElement ){
						this['_'+property.name] = this._renderedMainElement[property.elementProperty];
					}
					return this['_'+property.name];
				};
			}else
			if ( property.type === 'string' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement ){
						this['_'+property.name] = this._renderedMainElement[property.elementProperty];
					}
					return this['_'+property.name] !== null ? this['_'+property.name].toString() : '';
				};
			}else
			if ( property.type === 'int' || property.type === 'integer' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement ){
						this['_'+property.name] = this._renderedMainElement[property.elementProperty];
					}
					return parseInt( this['_'+property.name] );
				};
			}else
			if ( property.type === 'float' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement ){
						this['_'+property.name] = this._renderedMainElement[property.elementProperty];
					}
					return parseFloat( this['_'+property.name] );
				};
			}else
			if ( property.type === 'bool' || property.type === 'boolean' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement ){
						this['_'+property.name] = this._renderedMainElement[property.elementProperty];
					}
					return parseBool( this['_'+property.name] );
				};
			}else
			if ( property.type === 'object' || property.type === 'obj' ){
				this['get'+property.name] = function(){
					if ( this._renderedMainElement ){
						this['_'+property.name] = this._renderedMainElement[property.elementProperty];
					}
					return this['_'+property.name] !== null ? this['_'+property.name].valueOf() : null;
				};
			}else
			{
				throw new TException( 'Bad getter type conversion: '+property.type );
			}
		}
	}

});