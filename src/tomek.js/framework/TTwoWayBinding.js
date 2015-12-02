/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//= require TModel

mixin( 'TTwoWayBindingMixin', {
	
	_syncTriggerEvents : ['Change'],
	_syncControlProperty : 'Value',
	
	_syncEventsAttached : false,
	_Model : null,
	
	constructor : function(options){
		this._syncEventsAttached = false;
		this._Model = null;
		this.base(options);
	},
	
	setModel : function( model_object ){
		this._Model = model_object;
		this.attachSyncFormToModelEvents();
		this.attachModelToFormEvent();
		this.syncModelToForm();
	},
	
	getModel : function(){
		return this._Model;
	},
	
	attachSyncFormToModelEvents : function(){
		if ( ! this._syncEventsAttached ){
			for( var i=0; i< this._syncTriggerEvents.length; i++ ){
				console.log( this.getID(), this._syncTriggerEvents[i] );
				this.attachEvent( this._syncTriggerEvents[i], this.syncFormToModel.bind( this ) );
			}
			this._syncEventsAttached = true;
		}
	},
	
	attachModelToFormEvent : function(){
		if ( Object.observe ){
			Object.observe( this.getModel().getObject(), this.syncModelToForm.bind( this ) );
		}else{
			console.log( 'Object.observe not found. Model-to-form binding will not work.' );
		}
	},
	
	syncFormToModel : function(){
		this.getModel().setValue( this[ 'get'+this._syncControlProperty ]() );
	},
	
	syncModelToForm : function(){
		this[ 'set'+this._syncControlProperty ]( this.getModel().getValue() );
	}
	
});