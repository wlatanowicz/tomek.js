//= require TWebControl
//= require TEventResponder

/** section: WebControls_DragDrop
 * class TDraggable < TWebControl
 * includes TEventResponderMixin
 * 
 * Control creates a draggable container
 * 
 **/
klass( 'TDraggable', TWebControl, [ TEventResponderMixin ], {

	//@Override
	_tagName : 'span',
	
	//@Override
	_triggersEvents : ['DragStart','DragEnd','Drop','DragEnter','DragLeave','DragOver'],
	
	_uid : null,
	
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 
					{ name: 'Group', type: 'string', default: 'Default' }
				);
		return arr;
	},

	createMainElement : function(){
		var d = this.base();
		
		d.setAttribute( 'draggable', "true" );
		
		this.addEventListener( d, 'dragstart', this._onDragStart.bind( this ) );
		this.addEventListener( d, 'dragend', this._onDragEnd.bind( this ) );
		
		
		return d;
	},
	
	_onDragStart : function( ev ){
		// http://stackoverflow.com/questions/6186844/clear-a-selection-in-firefox/6187098#6187098
		if ( window.selection && window.selection.empty ){
			window.selection.empty();
		}else{
			window.getSelection().removeAllRanges()
		}
		
		this.ensureHtmlID();
		TDraggable.currentDraggable = this;
		ev.dataTransfer.dropEffect = 'move';
		ev.dataTransfer.setData( "draggable_id", this.getHtmlID() );
		this.triggerEvent( 'DragStart', {
											domEvent : ev
										} );
	},
	
	_onDragEnd : function( ev ){
		TDraggable.currentDraggable = null;
		this.triggerEvent( 'DragEnd', {
											domEvent : ev
										} );
	}
	
});