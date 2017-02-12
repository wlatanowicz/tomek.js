//= require TStencil

/** section: Controls
 * class TRepeaterItem < TStencil
 * 
 * Control used to render multiple times the same template
 * in repeater and similiar contexts
 * 
 **/
klass( 'TRepeaterItem', TStencil, {

	/**
	 * TRepeaterItem#ItemIndex -> int
	 **/
	
	/**
	 * TRepeaterItem#Repeater -> TRepeater
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name:'ItemIndex', type: 'integer' },
				  { name:'Repeater', type: 'object' }
				);
		return arr;
	}
	
} );