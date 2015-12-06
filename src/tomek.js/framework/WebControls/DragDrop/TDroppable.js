//= require TWebControl
//= require TEventResponder

/** section: WebControls
 * class TPanel < TWebControl
 * 
 * Control renders a div container
 * 
 **/
klass( 'TDroppable', TWebControl, [TEventResponderMixin], {

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
		
		var currentDraggable = TDraggable.currentDraggable;
		
		if ( this.getAllowFiles()
				&& this._dataTransferHasFiles( ev.dataTransfer ) ){
			hasFiles = true;
		}
		
		if ( this._dataTransferHasDraggable( ev.dataTransfer, currentDraggable ) ){
			hasDraggable = true;
			if ( this.getGroups().in_array( '*' )
				|| this.getGroups().in_array( currentDraggable.getGroup() ) ){
				hasMatchingDraggable = true;
			}
		}
		
		if ( hasFiles || hasDraggable ){
			
			ev.preventDefault();
			
			var dragParam = {
				domEvent: ev,
				hasMatchingDroppable: hasMatchingDraggable,
				droppable: this,
			};
			
			var dropParam = {
				domEvent: ev,
				hasFiles: hasFiles,
				hasDraggable: hasDraggable,
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
	
	_dataTransferHasDraggable : function( dt, currentDraggable ){
		var ctrl_id = dt.getData('draggable_id');
		
		if ( ctrl_id && ctrl_id.length > 0
			&& currentDraggable
			&& currentDraggable.getHtmlID() == ctrl_id ){
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