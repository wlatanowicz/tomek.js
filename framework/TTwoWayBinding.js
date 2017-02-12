//= require TTwoWayBindingModel

/** section: Controls
 * mixin TTwoWayBindingMixin
 * 
 **/
mixin( 'TTwoWayBindingMixin', {
	
	_syncEventsAttached : {},
	
	constructor : function(options){
		this._syncEventsAttached = {};
		this.base(options);
	},

//  PROPERTY EXAMPLE:
//  
//	getPublicProperties : function(){
//		var a = this.base();
//		a.push({
//			name: 'Model', type:'model', syncControlProperty: 'Value', syncTriggerEvents: ['Change']
//		})
//		return a;
//	},
	
	attachSyncControlToModelEvents : function( property ){
		if ( ! this._syncEventsAttached[ property.name ] ){
			for( var i=0; i< property.syncTriggerEvents.length; i++ ){
				this.attachEvent( property.syncTriggerEvents[i], this.syncControlToModel.bind( this, property ) );
			}
			this._syncEventsAttached[ property.name ] = true;
		}
	},
	
	attachModelToControlEvent : function( property ){
		if ( Object.observe ){
			Object.observe( this.getModel().getObject(), this.syncModelToControl.bind( this, property ) );
		}else{
			console.log( 'Object.observe not found. Model-to-control binding will not work.' );
		}
	},
	
	syncControlToModel : function( property ){
		this['get'+property.name]().setValue( this[ 'get'+property.syncControlProperty ]() );
	},
	
	syncModelToControl : function( property ){
		this[ 'set'+property.syncControlProperty ]( this['get'+property.name]().getValue() );
	},
	
	createGetterFunction : function( property ){
		if ( property.type !== 'model' ){
			this.base( property );
		}else{
			this['get'+property.name] = function(){
				return this['_'+property.name];
			};			
		}
	},
	
	createSetterFunction : function( property ){
		if ( property.type !== 'model' ){
			this.base( property );
		}else{
			this['set'+property.name] = function( model_object ){
				this['_'+property.name] = model_object;
				this.attachSyncControlToModelEvents( property );
				this.attachModelToControlEvent( property );
				this.syncModelToControl( property );
			};
		}
	}
	
});