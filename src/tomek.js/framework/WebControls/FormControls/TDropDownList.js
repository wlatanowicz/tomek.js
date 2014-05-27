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
		arr.push( 'Value',
					'SelectedValue',
					{ name: 'Options' },
					{ name: 'SelectedIndex', type: 'integer', default: 0, elementProperty: 'selectedIndex', fetchFromElement: true },
					{ name:'DataSource', type:'none', default: [] },
					{ name: 'TextFieldName', default: 'text' },
					{ name: 'ValueFieldName', default: 'value' },
					{ name:'Disabled', type:'bool', elementProperty:'disabled' }
					);
		return arr;
	},
	
	setValue : function( v ){
		this.setSelectedValue( v );
	},
	
	getValue : function(){
		return this.getSelectedValue();
	},
	
	setSelectedValue : function( v ){
		var index_to_set = 0;
		var j;
		for ( j=0; j<this.getOptions().length; j++ ){
			var i = this.getOptions()[j];
			if ( i.getValue() == v ){
				index_to_set = j;
			}
		}
		this.setSelectedIndex( index_to_set );
	},
	
	getSelectedValue : function(){
		var idx = this.getSelectedIndex();
		if ( this.getOptions()[ idx ] && this.getOptions()[ idx ].getValue ){
			return this.getOptions()[ idx ].getValue();
		}else{
			return null;
		}
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
		var selected_index = this.getSelectedIndex();
		for( var i =0; i<data_source.length; i++ ){
			var data_item = data_source[i];
			var opt = new TOption();
			opt.setText( data_item[ this.getTextFieldName() ] );
			opt.setValue( data_item[ this.getValueFieldName() ] );
			opt.setSelected( selected_index === i );
			this.addChildControl( opt );
		}
	},
	
	getOptions: function(){
		return this.findChildControlsByKind( TOption );
	},
	
	renderContents : function(){
		var si = this.getSelectedIndex();
		this.base();
		this.setSelectedIndex( si );
	}

});