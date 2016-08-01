//= require TWebControl
//= require TEventResponder
//= require TValidatable
//= require TOption
//= require TTwoWayBinding

/** section: WebControls_FormControls
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
klass( 'TDropDownList', TWebControl, [ TEventResponderMixin, TValidatableMixin, TTwoWayBindingMixin ], {
	
	//@Override
	_tagName : 'select',
	
	//@Override
	_rendersChildControls : true,
	
	//@Override
	_triggersEvents : ['Change'],
		
	_ValueToSet : null,
	
	constructor : function( options ){
		this._ValueToSet = null;
		this.base( options );
	},
	
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
					{ name: 'DataSource', type:'object', default: [] },
					{ name: 'TextFieldName', default: 'text' },
					{ name: 'ValueFieldName', default: 'value' },
					{ name: 'DisabledFieldName', default: null },
					{ name: 'Disabled', type:'bool', elementProperty:'disabled' },
					{ name: 'Model', type:'model', syncControlProperty: 'SelectedValue', syncTriggerEvents: ['Change'] }
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
		var index_to_set = -1;
		var j;
		for ( j=0; j<this.getOptions().length; j++ ){
			var i = this.getOptions()[j];
			if ( i.getValue() == v.toString() ){
				index_to_set = j;
			}
		}
		if ( index_to_set >= 0 ){
			this.setSelectedIndex( index_to_set );
		}else{
			this._ValueToSet = v;
		}
	},
	
	getSelectedValue : function(){
		if ( this._ValueToSet !== null ){
			return this._ValueToSet.toString();
		}
		var idx = this.getSelectedIndex();
		if ( this.getOptions()[ idx ] && this.getOptions()[ idx ].getValue ){
			return this.getOptions()[ idx ].getValue();
		}else{
			return null;
		}
	},
	
	setSelectedIndex : function( value ){
		this._ValueToSet = null;
		this['_SelectedIndex'] = parseInt( value );
		if ( this._renderedMainElement ){
			this.setAttribute( this._renderedMainElement, { elementProperty: 'selectedIndex' }, this['_SelectedIndex'] );
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
		var data_source = this.getDataSource();
		for( var i =0; i<data_source.length; i++ ){
			var data_item = data_source[i];
			var opt = new TOption();
			opt.setText( data_item[ this.getTextFieldName() ] );
			opt.setValue( data_item[ this.getValueFieldName() ] );
			if ( this.getDisabledFieldName() ){
				opt.setDisabled( data_item[ this.getDisabledFieldName() ] );			
			}
			this.addChildControl( opt );
		}
	},
	
	preRender : function(){
		var selected_index = this.getSelectedIndex();
		var somethingSelected = false;
		var options = this.$$kind( 'TOption' );
		for( var i=0; i<options.length && !somethingSelected; i++ ){
			var selected = false;
			
			if ( ! somethingSelected ){
				
				if ( this._ValueToSet !== null
						&& this._ValueToSet.toString() == options[i].getValue() ){
					selected = true;
					this._SelectedIndex = i;
				}else
				if ( this._ValueToSet === null
						&& selected_index === i ){
					selected = true;
				}
				
				if ( selected ){
					options[i].setSelected( true );
				}

				somethingSelected = selected || somethingSelected;
			}
			
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