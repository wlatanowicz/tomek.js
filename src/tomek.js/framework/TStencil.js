//= require TTemplateControl

/** section: Controls
 * class TItem < TTemplateControl
 * 
 * Control used to render multiple times the same template
 * in repeater and similiar contexts
 * 
 **/
klass( 'TStencil', TTemplateControl, {

	/**
	 * TStencil#DataItem -> Object
	 **/
	
	/**
	 * TStencil#Type -> String
     * 
     * i.e. one of: `Header`, `Item`, `Footer` or `Empty`
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name:'DataItem', type: 'object' },
				  { name:'Type', type:'string'}
				);
		return arr;
	},
	
	/**
	 * TStencil#useTemplate( template ) -> void
	 * - template (Function): template
	 * 
	 * Sets template function
	 * 
	 **/
	useTemplate : function( template ){
		this.createChildControls = template.bind( this, this );
	}
	
} );