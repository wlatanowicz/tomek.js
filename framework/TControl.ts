import TObject from "@framework/TObject";
import TException from "@framework/TException";
import TExpression from "@framework/TExpression";

/** section: Controls
 * class TControl
 * 
 * Base control class
 * handles all common dependency and rendering routines
 * 
 **/
export default class TControl extends TObject
{
	/**
	 * TControl#_childControls -> Array@TControl
	 * 
	 * Keeps all direct child controls
	 * 
	 **/
	protected _childControls = [];
	
	/**
	 * TControl#_childControlsHash -> Hash@TControl
	 * 
 	 * Keeps track of child controls based on ID
	 * 
	 **/
	private _childControlsHash = {};
	
	/**
	 * TControl#_childControlsCreated -> Boolean
	 * 
	 * True when child controls have been initialized
	 * afer running createChildControls()
	 * 
	 **/
	private _childControlsCreated = false;
	
	/**
	 * TControl#_templateControls -> Hash@TControl
	 * 
	 * Keeps track of controls initialized using XML template
	 * 
	 **/
	private _templateControls = {};
	
	/**
	 * TControl#_renderedNodes -> Array@DOMElement
	 * 
	 * Keeps track of rendered DOMElements
	 * that should be removed on rerender
	 * 
	 **/
	protected _renderedNodes = [];
	
	/**
	 * TControl#_positionMarker -> DOMElement
	 * 
	 * Keeps position of this control inside _placeholder
	 * 
	 **/
	protected _positionMarker = null;
	
	/**
	 * TControl#_ignoreTemplate -> Boolean
	 * 
	 * Controls created in template are ignored if true.
	 * 
	 **/
	private _ignoreTemplate = false;

	private _isRendered = false;

	/**
	 *  new TControl([options])
	 *  - options (Hash): hash of properties to be set
	 * 
	 * Default control constructor
	 * 
	 **/
	constructor(){
		super();
		this._childControls = [];
		this._renderedNodes = [];
		this._isRendered = false;
		this._childControlsHash = {};
		this._childControlsCreated = false;
		this._positionMarker = null;
		this._templateControls = {};
	}

	private _ID = null;

	set ID( id )
	{
		if ( this._ID != null ){
			throw new TException( 'Cannot change ID' )
		}
		this._ID = id;
		if ( this.Parent ){
			this.Parent._childControlsHash[ this.ID ] = this;
		}
	}

	get ID()
	{
		return this.converters.string(this._ID);
	}


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
	 * TControl#Placeholder -> DOMElement
	 *
	 * Control is rendered inside this element
	 *
	 **/
	private _Placeholder = null;

	set Placeholder(root_node)
	{
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
		if ( root_node instanceof TControl){
			this._Placeholder = null;
		}else
		{
		    console.log(root_node);
			throw new TException( 'Invalid Placeholder' )
		}
	}
	
	get Placeholder()
	{
		return this._Placeholder
			? this._Placeholder
			: ( this.Parent
				? this.Parent.Placeholder
				: document.body );
	}

	private _Parent;

	set Parent(value)
	{
		this._Parent = value;
		if (this.ID) {
			this.Parent._childControlsHash[this.ID] = this;
		}
	}

	get Parent()
	{
		return this.converters.object(this._Parent);
	}

	private _CustomData;

	set CustomData(value)
	{
		this._CustomData = value;
	}

	get CustomData()
	{
		return this.converters.object(this._CustomData);
	}

	private _Visible = true;

	set Visible(value)
	{
		this._Visible = value;
	}

	get Visible()
	{
		return this.converters.boolean(this._Visible) && (this.Parent === null || this.Parent.Visible);
	}
	
	/**
	 * TControl#removeRenderedNodes() -> void
	 * 
	 * Removes all DOMElements created while rendering the control
	 * before next render
	 * 
	 **/
	removeRenderedNodes()
	{
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
	}
	
	/**
	 * TControl#ensureChildControls() -> void
	 * 
	 * Initializes child controls if required.
	 * 
	 **/
	ensureChildControls()
	{
		if (!this._childControlsCreated){
			this.preCreateChildControls();
			this.createChildControls();
			this._childControlsCreated = true;
			this.postCreateChildControls();
		}
	}
	
	/**
	 * TControl#preCreateChildControls() -> void
	 * 
	 * @TODO
	 * 
	 **/
	preCreateChildControls(){}
	
	/**
	 * TControl#postCreateChildControls() -> void
	 * 
	 * @TODO
	 * 
	 **/
	postCreateChildControls(){}
	
	/**
	 * TControl#createChildControls() -> void
	 * 
	 * Initializes child controls.
	 * Should be overloaded.
	 * 
	 **/
	createChildControls(){}
	
	/**
	 * TControl#render() -> void
	 * 
	 * Renders the control
	 * and all its child controls.
	 * 
	 **/
	render()
	{
		
		if ( this.Parent
				&& this.Parent._isRendered === false ){
			
			this.Parent.render();
			
		}else{
			
			this.ensureChildControls();
			this.removeRenderedNodes();
			this.ensurePositionMarker();
			this.preRender();
			this._isRendered = true;
			
			if (this.Visible){
				this.renderContents();
			}
			this.postRender();
			
		}
		
	}
	
	/**
	 * TControl#preRender() -> void
	 * 
	 * @TODO
	 * 
	 **/
	preRender(){
		
	}
	
	/**
	 * TControl#postRender() -> void
	 * 
	 * @TODO
	 * 
	 **/
	postRender(){
		
	}
	
	/**
	 * TControl#renderContentsInPlaceholder( placeholder ) -> void
	 * - placeholder (String|DOMElement|TControl|null): a placeholder
	 * 
	 * Sets placeholder and renders contents of control.
	 * Should not be called directly.
	 * 
	 **/
	renderContentsInPlaceholder(placeholder){
		this.Placeholder = placeholder;
		this.render();
	}
	
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
	renderContents(){
		this.renderChildControls(this);
	}

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
	renderChildControls(placeholder){
		if ( !this._ignoreTemplate && this.renderTemplateChildControls ){
			this.renderTemplateChildControls(placeholder);
		}else{
			this.renderStandardChildControls(placeholder);
		}
	}

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
	renderTemplateChildControls: Function = null;
	
	/**
	 * TControl#renderStandardChildControls( placeholder ) -> void
	 * - placeholder (DOMElement): a placeholder
	 * 
	 * Renders contents of all child controls - one by one.
	 * Should not be called directly.
	 * 
	 **/
	renderStandardChildControls(placeholder){
		for (var i=0; i<this._childControls.length; i++){
			this._childControls[i].renderContentsInPlaceholder(placeholder);
		}
	}
	
	/**
	 * TControl#appendChild( el ) -> void
	 * - el (DOMElement): element to be added
	 * 
	 * Appends DOMElement to control.
	 * Used on render to add DOMElement to control's placeholder,
	 * keeps track it in _renderedNodes and adds position marker.
	 * 
	 **/
	appendChild(el){
		this._renderedNodes.push(el);
		this.ensurePositionMarker();
		this._positionMarker.parentNode.insertBefore(el, this._positionMarker);
	}
	
	/**
	 * TControl#ensurePositionMarker() -> void
	 * 
	 * Ensures position marker exists.
	 * 
	 **/
	ensurePositionMarker(){
		var root = this._Placeholder
						? this._Placeholder
						: this.Parent
							? this.Parent
							: this.Placeholder;
		
		var markerNeedsRepositioning = false;
		
		if ( this._positionMarker === null ){
			
			if ( window['debug'] ){
				/* debug, visible place holder: */
				let label = 'Marker for <'+this.klass.klass_name+'> ID=' + ( this.ID ? this.ID : '(none)' );
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
		
	}
	
	/**
	 * TControl#addChildControl( c ) -> void
	 * - c (TControl): control
	 * 
	 * Adds child control
	 * and sets relationship between controls.
	 * 
	 **/
	addChildControl(c){
		c.Parent = this;
		this._childControls.push(c);
		if (c.ID){
			this._childControlsHash[c.ID] = c;
		}
	}
	
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
	addTemplateChildControl(k, c){
		this._templateControls[k] = c;
		this.addChildControl(c);
	}
	
	/**
	 * TControl#removeChildControl( c ) -> void
	 * - c (TControl): control to be removed
	 * 
	 * Removes child control
	 * 
	 **/
	removeChildControl(c){
		var idx = this._childControls.indexOf( c );
		
		if ( idx > -1 ){
			
			this._childControls.splice( idx, 1 );
			
			var id = c.ID;
			if ( id ){
				delete this._childControlsHash[ id ];
			}
			
		}else{
			throw new TException( 'No such control' );
		}
		
	}
	
	/**
	 * TControl#removePositionMarker() -> void
	 * 
	 * Removes position marker
	 * from document tree
	 * 
	 **/
	removePositionMarker(){
		if ( this._positionMarker ){
			if ( this._positionMarker.parentNode ){
				this._positionMarker.parentNode.removeChild( this._positionMarker );
			}
			this._positionMarker = null;
		}
	}
	
	/**
	 * TControl#destroy() -> void
	 * 
	 * Destroys control
	 * and cleans up
	 * 
	 **/
	destroy(){
		
		if ( this.Parent ){
			this.Parent.removeChildControl( this );
		}
		
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[i].destroy();
		}
		
		this.removeRenderedNodes();
		this.removePositionMarker();
		
	}
	
	/**
	 * TControl#getChildControl( id ) -> TControl|null
	 * - i (String): control ID
	 * 
	 * Returns direct child control by ID
	 * if found or null if not found.
	 * 
	 **/
	getChildControl(id){
		this.ensureChildControls();
		
		return this._childControlsHash[ id ]
				? this._childControlsHash[ id ]
				: null;
	}
	
	/**
	 * TControl#findChildControlByID( id ) -> TControl|null
	 * - id (String): control ID
	 * 
	 * Returns child control by ID
	 * and searches recursively all child controls.
	 * Returns child control with particualar ID if found or null if not found
	 * 
	 **/
	findChildControlByID( id ){
		var i;
		
		this.ensureChildControls();
		
		if( this._childControlsHash[ id ]
			&& this._childControlsHash[ id ].ID == id ){
			return this._childControlsHash[ id ];
		}
		for ( i=0; i<this._childControls.length; i++ ){
			var ctrl = this._childControls[i].findChildControlByID( id );
			if( ctrl != null ){
				return ctrl;
			}
		}
		return null;
	}

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
	findControlByID(id)
	{
		var c;
		if (this.Parent){
			c = this.Parent.findControlByID( id );
		}else{
			c = this.findChildControlByID( id );
		}
		return c;
	}

	/**
	 * TControl#findChildControlsByType( class_name ) -> Array@TControl
	 * - class_name (String): control ID
	 * 
	 * Returns child control by type (excatly, excluding subclasses)
	 * and searches recursively all child controls.
	 * Returns an array of child controls with particualar type
	 * 
	 **/
	findChildControlsByType(class_name){
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
	}

	/**
	 * TControl#findChildControlsByKind( class_name ) -> Array@TControl
	 * - class_name (String): control ID
	 * 
	 * Returns child control by type (including subclassed)
	 * and searches recursively all child controls.
	 * Returns an array of child controls with particualar type
	 * 
	 **/
	findChildControlsByKind( class_name ){
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
	}

	/**
	 * TControl#findChildControlsByID( id ) -> Array@TControl
	 * - id (String): control ID
	 * 
	 * Returns array of child controls by ID
	 * and searches recursively all child controls.
	 * Returns child controls with particualar ID if found or empty array not found
	 * 
	 **/
	findChildControlsByID( id ){
		var i;
		var ret = [];
		
		this.ensureChildControls();
		
		if( this._childControlsHash[ id ]
			&& this._childControlsHash[ id ].ID == id ){
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

	$ = this.findChildControlByID;
	$$ = this.findChildControlsByID;
	$$type = this.findChildControlsByType;
	$$kind = this.findChildControlsByKind;
}