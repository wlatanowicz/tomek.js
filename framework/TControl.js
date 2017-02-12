//= require TObject
//= require TException
//= require CommonUtils
//= require TExpression

/** section: Controls
 * class TControl
 * 
 * Base control class
 * handles all common dependency and rendering routines
 * 
 **/
klass( 'TControl', {
	
	/**
	 * TControl#_childControls -> Array@TControl
	 * 
	 * Keeps all direct child controls
	 * 
	 **/
	_childControls : [],
	
	/**
	 * TControl#_childControlsHash -> Hash@TControl
	 * 
 	 * Keeps track of child controls based on ID
	 * 
	 **/
	_childControlsHash : {},
	
	/**
	 * TControl#_childControlsCreated -> Boolean
	 * 
	 * True when child controls have been initialized
	 * afer running createChildControls()
	 * 
	 **/
	_childControlsCreated : false,
	
	/**
	 * TControl#_templateControls -> Hash@TControl
	 * 
	 * Keeps track of controls initialized using XML template
	 * 
	 **/
	_templateControls : {},
	
	/**
	 * TControl#_renderedNodes -> Array@DOMElement
	 * 
	 * Keeps track of rendered DOMElements
	 * that should be removed on rerender
	 * 
	 **/
	_renderedNodes : [],
	
	/**
	 * TControl#_Placeholder -> DOMElement
	 * 
	 * Control is rendered inside this element
	 * 
	 **/
	_Placeholder : null,
	
	/**
	 * TControl#_positionMarker -> DOMElement
	 * 
	 * Keeps position of this control inside _placeholder
	 * 
	 **/
	_positionMarker : null,
	
	/**
	 * TControl#_ignoreTemplate -> Boolean
	 * 
	 * Controls created in template are ignored if true.
	 * 
	 **/
	_ignoreTemplate : false,
	
	/**
	 *  new TControl([options])
	 *  - options (Hash): hash of properties to be set
	 * 
	 * Default control constructor
	 * 
	 **/
	constructor : function( options ){
		this._childControls = [];
		this._renderedNodes = [];
		this._isRendered = false;
		this._childControlsHash = {};
		this._childControlsCreated = false;
		this._positionMarker = null;
		this._templateControls = {};
		
		this.base( options );
	},
	
	setID : function( id ){
		if ( this._ID !== null ){
			throw new TException( 'Cannot change ID' )
		}
		this._ID = id;
		if ( this.getParent() ){
			this.getParent()._childControlsHash[ this._ID ] = this;
		}
	},
    
	/**
	 * TControl#ID -> String
	 **/
	
	/**
	 * TControl#Id -> String
     * 
     * An alias for TControl#ID
     * 
	 **/
	
	/**
	 * TControl#Placeholder -> DOMElement
	 **/
	
	/**
	 * TControl#Parent -> TControl
	 **/
	
	/**
	 * TControl#Visible -> Boolean
	 **/
	
	/**
	 * TControl#getPublicProperties() -> Array@String
	 * 
	 * Defines list of public properties
	 * 
	 **/
	getPublicProperties : function(){
		return ['ID',
				'Id',
				{ name: 'Placeholder', type: 'object' },
				{ name: 'Parent', type: 'object' },
				{ name: 'CustomData', type: 'object' },
				{ name: 'Visible', type: 'bool', default: true }
				];
	},
	
	/**
	 * TControl#setPlaceholder( placeholder ) -> void
	 * - placeholder (String|DOMElement|TControl|null): a placeholder
	 * 
	 * Sets placholder for control
	 * to be rendered in
	 * 
	 **/
	setPlaceholder : function( root_node ){
		if ( ! root_node ){
			this._Placeholder = null;
		}else
		if ( typeof root_node == 'string' ){
			this._Placeholder = document.getElementById( root_node );
		}else
		if ( root_node.nodeType
				&& root_node.nodeType == Node.ELEMENT_NODE ){
			this._Placeholder = root_node;
		}else
		if ( root_node.getPlaceholder ){
			this._Placeholder = null;
		}else
		{
			throw new TException( 'Invalid Placeholder' )
		}
	},
	
	/**
	 * TControl#getPlaceholder() -> DOMElement
	 * 
	 * Returns placeholder for control (a node to render control in)
	 * fallbacks to parent control if required
	 * 
	 **/
	getPlaceholder : function(){
		return this._Placeholder
			? this._Placeholder
			: ( this.getParent()
				? this.getParent().getPlaceholder()
				: document.body );
	},
	
	getVisible : function(){
		return parseBool( this._Visible ) && ( this.getParent() === null || this.getParent().getVisible() );
	},
	
	/**
	 * TControl#removeRenderedNodes() -> void
	 * 
	 * Removes all DOMElements created while rendering the control
	 * before next render
	 * 
	 **/
	removeRenderedNodes : function(){
		var i;
		for ( i=0; i<this._childControls.length; i++ ){
			this._childControls[i].removeRenderedNodes();
		}
		for ( i=0; i<this._renderedNodes.length; i++ ){
			var n = this._renderedNodes[ i ];
			if ( n.parentNode ){
				n.parentNode.removeChild(n);
			}
		}
		this._renderedNodes = [];
	},
	
	/**
	 * TControl#ensureChildControls() -> void
	 * 
	 * Initializes child controls if required.
	 * 
	 **/
	ensureChildControls : function(){
		if ( ! this._childControlsCreated ){
			this.preCreateChildControls();
			this.createChildControls();
			this._childControlsCreated = true;
			this.postCreateChildControls();
		}
	},
	
	/**
	 * TControl#preCreateChildControls() -> void
	 * 
	 * @TODO
	 * 
	 **/
	preCreateChildControls : function(){
		
	},
	
	/**
	 * TControl#postCreateChildControls() -> void
	 * 
	 * @TODO
	 * 
	 **/
	postCreateChildControls : function(){
		
	},
	
	/**
	 * TControl#createChildControls() -> void
	 * 
	 * Initializes child controls.
	 * Should be overloaded.
	 * 
	 **/
	createChildControls : function(){
		
	},
	
	/**
	 * TControl#render() -> void
	 * 
	 * Renders the control
	 * and all its child controls.
	 * 
	 **/
	render : function(){
		
		if ( this.getParent()
				&& this.getParent()._isRendered === false ){
			
			this.getParent().render();
			
		}else{
			
			this.ensureChildControls();
			this.removeRenderedNodes();
			this.ensurePositionMarker();
			this.preRender();
			this._isRendered = true;
			
			if ( this.getVisible() ){
				this.renderContents();
			}
			this.postRender();
			
		}
		
	},
	
	/**
	 * TControl#preRender() -> void
	 * 
	 * @TODO
	 * 
	 **/
	preRender : function(){
		
	},
	
	/**
	 * TControl#postRender() -> void
	 * 
	 * @TODO
	 * 
	 **/
	postRender : function(){
		
	},
	
	/**
	 * TControl#renderContentsInPlaceholder( placeholder ) -> void
	 * - placeholder (String|DOMElement|TControl|null): a placeholder
	 * 
	 * Sets placeholder and renders contents of control.
	 * Should not be called directly.
	 * 
	 **/
	renderContentsInPlaceholder : function( placeholder ){
		this.setPlaceholder( placeholder );
		this.render();
	},
	
	/**
	 * TControl#renderContents() -> void
	 * 
	 * Renders contents of control.
	 * Decides where to put child controls and runs renderChildControls();
	 * In most cases child controls are rendered in 'this'. This may be changed to
	 * a nested HTML element for controls like TWebControl.
	 * Should not be called directly. Should be called only from render().
	 * 
	 **/
	renderContents : function(){
		this.renderChildControls( this );
	},

	/**
	 * TControl#renderChildControls( placeholder ) -> void
	 * - placeholder (DOMElement): a placeholder
	 * 
	 * Renders contents of child controls.
	 * Render occurs in a specified placeholder. In most cases placeholder is the same as 'this'.
	 * In some cases (i.e. TWebControl) it may be a nested element.
	 * Should not be called directly. Should be called only from renderContents().
	 * 
	 **/
	renderChildControls : function( placeholder ){
		if ( !this._ignoreTemplate && this.renderTemplateChildControls ){
			this.renderTemplateChildControls( placeholder );
		}else{
			this.renderStandardChildControls( placeholder );
		}
	},

	/**
	 * TControl#renderTemplateChildControls( placeholder ) -> void
	 * - placeholder (DOMElement): a placeholder
	 * 
	 * Renders contents of child controls as defined in template.
	 * Method is created by compiler.
	 * 
	 * Should not be called directly.
	 * 
	 **/
	renderTemplateChildControls : null,
	
	/**
	 * TControl#renderStandardChildControls( placeholder ) -> void
	 * - placeholder (DOMElement): a placeholder
	 * 
	 * Renders contents of all child controls - one by one.
	 * Should not be called directly.
	 * 
	 **/
	renderStandardChildControls : function( placeholder ){
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[ i ].renderContentsInPlaceholder( placeholder );
		}
	},
	
	/**
	 * TControl#appendChild( el ) -> void
	 * - el (DOMElement): element to be added
	 * 
	 * Appends DOMElement to control.
	 * Used on render to add DOMElement to control's placeholder,
	 * keeps track it in _renderedNodes and adds position marker.
	 * 
	 **/
	appendChild : function( el ){
		this._renderedNodes.push( el );
		this.ensurePositionMarker();
		this._positionMarker.parentNode.insertBefore( el, this._positionMarker );
	},
	
	/**
	 * TControl#ensurePositionMarker() -> void
	 * 
	 * Ensures position marker exists.
	 * 
	 **/
	ensurePositionMarker : function(){
		var root = this._Placeholder
						? this._Placeholder
						: this.getParent()
							? this.getParent()
							: this.getPlaceholder();
		
		var markerNeedsRepositioning = false;
		
		if ( this._positionMarker === null ){
			
			if ( /**DEBUG_MARKER_ON**/ false ){
				/* debug, visible place holder: */
				var label = 'Marker for <'+this.klass.klass_name+'> ID=' + ( this.getID() ? this.getID() : '(none)' );
				this._positionMarker = document.createElement( "span" );
				this._positionMarker.appendChild( document.createTextNode( "⦿" ) );
				this._positionMarker.style.color = 'red';
				this._positionMarker.style.cursor = 'pointer';
				this._positionMarker.title = label;
			}else{
				/* normal place holder: */
				this._positionMarker = document.createComment( "-" );
			}
			
			this._positionMarker.positionMarkerForControl = this;
			this._positionMarker.parentControl = null;
			
			markerNeedsRepositioning = true;
			
		}
		
		if ( this._positionMarker.parentNode == null
			|| this._positionMarker.parentControl != root ){
			markerNeedsRepositioning = true;
		}
		
		if ( markerNeedsRepositioning ){
			this._positionMarker.parentControl = root;
			root.appendChild( this._positionMarker );
		}
		
	},
	
	/**
	 * TControl#addChildControl( c ) -> void
	 * - c (TControl): control
	 * 
	 * Adds child control
	 * and sets relationship between controls.
	 * 
	 **/
	addChildControl : function( c ){
		c.setParent( this );
		this._childControls.push( c );
		if ( c.getID() ){
			this._childControlsHash[ c.getID() ] = c;
		}
	},
	
	/**
	 * TControl#addTemplateChildControl( k, c ) -> void
	 * - k (String): name of variable defined by template compiler
	 * - c (TControl): control
	 * 
	 * Adds child control defined in template
	 * sets relationship between controls and
	 * adds control to _templateControls hash
	 * 
	 **/
	addTemplateChildControl : function( k, c ){
		this._templateControls[ k ] = c;
		this.addChildControl( c );
	},
	
	/**
	 * TControl#removeChildControl( c ) -> void
	 * - c (TControl): control to be removed
	 * 
	 * Removes child control
	 * 
	 **/
	removeChildControl : function( c ){
		var idx = this._childControls.indexOf( c );
		
		if ( idx > -1 ){
			
			this._childControls.splice( idx, 1 );
			
			var id = c.getID();
			if ( id ){
				delete this._childControlsHash[ id ];
			}
			
		}else{
			throw new TException( 'No such control' );
		}
		
	},
	
	/**
	 * TControl#removePositionMarker() -> void
	 * 
	 * Removes position marker
	 * from document tree
	 * 
	 **/
	removePositionMarker : function(){
		if ( this._positionMarker ){
			if ( this._positionMarker.parentNode ){
				this._positionMarker.parentNode.removeChild( this._positionMarker );
			}
			this._positionMarker = null;
		}
	},
	
	/**
	 * TControl#destroy() -> void
	 * 
	 * Destroys control
	 * and cleans up
	 * 
	 **/
	destroy : function(){
		
		if ( this.getParent() ){
			this.getParent().removeChildControl( this );
		}
		
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[i].destroy();
		}
		
		this.removeRenderedNodes();
		this.removePositionMarker();
		
	},
	
	/**
	 * TControl#getChildControl( id ) -> TControl|null
	 * - i (String): control ID
	 * 
	 * Returns direct child control by ID
	 * if found or null if not found.
	 * 
	 **/
	getChildControl : function( id ){
		this.ensureChildControls();
		
		return this._childControlsHash[ id ]
				? this._childControlsHash[ id ]
				: null;
	},
	
	/**
	 * TControl#findChildControlByID( id ) -> TControl|null
	 * - id (String): control ID
	 * 
	 * Returns child control by ID
	 * and searches recursively all child controls.
	 * Returns child control with particualar ID if found or null if not found
	 * 
	 **/
	findChildControlByID : function( id ){
		var i;
		
		this.ensureChildControls();
		
		if( this._childControlsHash[ id ]
			&& this._childControlsHash[ id ].getID() == id ){
			return this._childControlsHash[ id ];
		}
		for ( i=0; i<this._childControls.length; i++ ){
			var ctrl = this._childControls[i].findChildControlByID( id );
			if( ctrl != null ){
				return ctrl;
			}
		}
		return null;
	},
	
	/**
	 * TControl#findControlByID( id ) -> TControl|null
	 * - id (String): control ID
	 * 
	 * Returns a control by ID in current control tree
	 * Function goes to the root parent
	 * and searches recursively all child controls.
	 * Returns control with particualar ID if found or null if not found
	 * 
	 **/
	findControlByID : function( id ){
		var c;
		if ( this.getParent() ){
			c = this.getParent().findControlByID( id );
		}else{
			c = this.findChildControlByID( id );
		}
		return c;
	},
	
	/**
	 * TControl#findChildControlsByType( class_name ) -> Array@TControl
	 * - class_name (String): control ID
	 * 
	 * Returns child control by type (excatly, excluding subclasses)
	 * and searches recursively all child controls.
	 * Returns an array of child controls with particualar type
	 * 
	 **/
	findChildControlsByType : function( class_name ){
		var i;
        var j;
      
		var ret = [];
        
		this.ensureChildControls();
		
		for ( i=0; i<this._childControls.length; i++ ){
			var ctrl = this._childControls[i];
            if ( ctrl.isTypeOf( class_name ) ){
                ret.push( ctrl );
            }
			var ctrls = ctrl.findChildControlsByType( class_name );
            for( j=0; j<ctrls.length; j++ ){
                ret.push( ctrls[j] );
            }
		}
		return ret;
	},

	/**
	 * TControl#findChildControlsByKind( class_name ) -> Array@TControl
	 * - class_name (String): control ID
	 * 
	 * Returns child control by type (including subclassed)
	 * and searches recursively all child controls.
	 * Returns an array of child controls with particualar type
	 * 
	 **/
	findChildControlsByKind : function( class_name ){
		var i;
        var j;
      
		var ret = [];
        
		this.ensureChildControls();
		
		for ( i=0; i<this._childControls.length; i++ ){
			var ctrl = this._childControls[i];
            if ( ctrl.isKindOf( class_name ) ){
                ret.push( ctrl );
            }
			var ctrls = ctrl.findChildControlsByKind( class_name );
            for( j=0; j<ctrls.length; j++ ){
                ret.push( ctrls[j] );
            }
		}
		return ret;
	},

	/**
	 * TControl#findChildControlsByID( id ) -> Array@TControl
	 * - id (String): control ID
	 * 
	 * Returns array of child controls by ID
	 * and searches recursively all child controls.
	 * Returns child controls with particualar ID if found or empty array not found
	 * 
	 **/
	findChildControlsByID : function( id ){
		var i;
		var ret = [];
		
		this.ensureChildControls();
		
		if( this._childControlsHash[ id ]
			&& this._childControlsHash[ id ].getID() == id ){
			ret.push( this._childControlsHash[ id ] );
		}
		for ( i=0; i<this._childControls.length; i++ ){
			var ctrls = this._childControls[i].findChildControlsByID( id );
			var j;
			for ( j=0; j<ctrls.length; j++ ){
				ret.push( ctrls[j] );
			}
		}
		return ret;
	}

} );

TControl.prototype.$ = TControl.prototype.findChildControlByID;
TControl.prototype.$$ = TControl.prototype.findChildControlsByID;
TControl.prototype.$$type = TControl.prototype.findChildControlsByType;
TControl.prototype.$$kind = TControl.prototype.findChildControlsByKind;
TControl.prototype.setId = TControl.prototype.setID;
TControl.prototype.getId = TControl.prototype.getID;

