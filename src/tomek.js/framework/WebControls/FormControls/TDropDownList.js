//= require TWebControl
//= require TEventResponder
//= require TValidatable
//= require TOption

/** section: FormControls
 * class TDropDownList <  TWebControl
 * includes TEventResponderMixin
 * 
 * Control renders a select
 * 
 * ##### Triggered events
 * 
 * `on:Change`
 * 
 **/
klass( 'TDropDownList', TWebControl, [ TEventResponderMixin, TValidatableMixin ], {
	
	//@Override
	_tagName : 'select',
	
	//@Override
	_rendersChildControls : true,
	
	//@Override
	_triggersEvents : ['Change'],
	
	/**
	 * TDropDownList#DataSource -> Array
	 **/
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name:'DataSource', type:'none', default: [] },
					{ name: 'TextFieldName', default: 'text' },
					{ name: 'ValueFieldName', default: 'value' }
					);
		return arr;
	},

	//@Override
	createMainElement : function(){
		var d = this.base();
		
		this.registerTriggerElement( d, 'change', 'Change' );
		
		return d;
	},
	
	setDataSource : function( ds ){
		this._DataSource = ds;
		
		for ( var i=0; i<this._childControls.length; i++ ){
			this._childControls[i].destroy();
		}

		this.removeRenderedNodes();
		
		this._childControlsCreated = false;
		this._childControls = [];
		this._childControlsHash = {};
	},
	
	/**
	 * TDropDownList#createChildControls() -> void
	 * 
	 * Creates child controls based on contents of DataSource
	 * 
	 **/
	//@Override
	createChildControls : function(){
		var data_source = this._DataSource;
		for( var i =0; i<data_source.length; i++ ){
			var data_item = data_source[i];
			var opt = new TOption();
			opt.setText( data_item[ this.getTextFieldName() ] );
			opt.setValue( data_item[ this.getValueFieldName() ] );
			this.addChildControl( opt );
		}
	}
	
});