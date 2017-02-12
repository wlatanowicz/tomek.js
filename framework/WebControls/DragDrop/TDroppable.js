//= require TWebControl
//= require TEventResponder

/** section: WebControls_DragDrop
 * class TDroppable < TWebControl
 * includes TEventResponderMixin
 * 
 * Control creates a droppable container
 * 
 **/
klass( 'TDroppable', TWebControl, [ TEventResponderMixin ], {

	//@Override
	_tagName : 'span',
	
	_triggersEvents : ['DragOver','DragLeave','DragEnter','Drop'],
	
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( 
					{ name: 'AllowFiles', type: 'bool', default: false },
					{ name: 'Groups', type: 'obj', default: ['*'] }
				);
		return arr;
	},
	
	setGroups : function( value ){
		if ( value.length && value.split && value.substring ){
			value = value.split(",").map( String.trim );
		}
		this._Groups = value;
	},
	
	createMainElement : function(){
		var d = this.base();
		
		this.addEventListener( d, 'dragover', this._onEvent.bind( this ) );
		this.addEventListener( d, 'dragleave', this._onEvent.bind( this ) );
		this.addEventListener( d, 'dragenter', this._onEvent.bind( this ) );
		this.addEventListener( d, 'drop', this._onEvent.bind( this ) );
		
		return d;
	},
	
	_onEvent : function( ev ){
		var hasFiles = false;
		var hasDraggable = false;
		var hasMatchingDraggable = false;
		
		var currentDraggable = window.TDraggable && TDraggable.currentDraggable
									? TDraggable.currentDraggable
									: null;
		
		if ( this.getAllowFiles()
				&& this._dataTransferHasFiles( ev.dataTransfer ) ){
			hasFiles = true;
		}
		
		if ( this._dataTransferHasDraggable( ev, currentDraggable ) ){
			hasDraggable = true;
			if ( this.getGroups().in_array( '*' )
				|| this.getGroups().in_array( currentDraggable.getGroup() ) ){
				hasMatchingDraggable = true;
			}
		}
		
		if ( hasFiles || hasDraggable ){
			
			if ( hasFiles || hasMatchingDraggable ){
				ev.preventDefault();
			}
			
			var dragParam = {
				domEvent: ev,
				hasMatchingDroppable: hasMatchingDraggable,
				droppable: this
			};
			
			var dropParam = {
				domEvent: ev,
				hasFiles: hasFiles,
				hasMatchingDraggable: hasMatchingDraggable,
				draggable: null,
				files: null
			};
			
			if ( hasFiles && ev.type == 'drop' ){
				dropParam.files = ev.dataTransfer.files;
			}
			
			if ( hasDraggable ){
				dropParam.draggable = currentDraggable;
			}
			
			var eventName;
			
			switch (ev.type) {
				case 'drop': eventName = 'Drop';
							 break;
				case 'dragover': eventName = 'DragOver';
							 break;
				case 'dragenter': eventName = 'DragEnter';
							 break;
				case 'dragleave': eventName = 'DragLeave';
							 break;
							
			}
			
			this.triggerEvent( eventName, dropParam );
			if ( hasDraggable ){
				currentDraggable.triggerEvent( eventName, dragParam );
			}
			
		}
		
	},
	
	_dataTransferHasDraggable : function( ev, currentDraggable ){
		var dt = ev.dataTransfer;
 		var ctrl_id = dt.getData('draggable_id');
		
		if ( currentDraggable
			&& ( ( ctrl_id && ctrl_id.length > 0 && currentDraggable.getHtmlID() == ctrl_id )
				|| ( !ctrl_id && ev.type != 'drop' ) )
			){
			return true;
		}
		return false;
	},
	
	_dataTransferHasFiles : function( dt ){
		if (dt.types) {
			for (var i = 0; i < dt.types.length; i++) {
				if ( dt.types[i] == "Files") {
					return true;
				}
			}
		}
		return false;
	}

});