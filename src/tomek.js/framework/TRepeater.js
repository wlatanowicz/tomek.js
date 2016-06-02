//= require TControl
//= require TRepeaterItem
//= require TEventResponder
//= require TPlaceHolder

/** section: Controls
 * class TRepeater < TControl
 * includes TEventResponderMixin
 * 
 * Control renders it's contents multiple times
 * based on data source
 * 
 * ##### Triggered events
 * 
 * `on:ItemCreated`
 * 
 **/
klass( 'TRepeater', TControl, [ TEventResponderMixin ], {
	
	//@Override
	_triggersEvents : ['ItemCreated'],
	
	//@Override
	_ignoreTemplate : true,
	
	_DataSource : [],
	_Items : [],
	_HeaderItem : null,
	_FooterItem : null,
	_EmptyItem : null,
	_ItemTemplate : null,
	_HeaderTemplate : null,
	_FooterTemplate : null,
	_EmptyTemplate : null,
	
	//@Override
	constructor : function( options ){
		this.base( options );
		this._DataSource = [];
		
		this._Items = [];
		this._HeaderItem = null;
		this._FooterItem = null;
		this._EmptyItem = null;
		
		this._ItemTemplate = null;
		this._HeaderTemplate = null;
		this._FooterTemplate = null;
		this._EmptyTemplate = null;
	},
	
	/**
	 * TRepeater#DataSource -> Array
	 * 
	 * Data source for repeater. Setting data source
	 * clean ups the repeater for next rendering.
	 * 
	 **/
	
	/**
	 * TRepeater#Items -> Array@TRepeaterItem
	 **/
	
	/**
	 * TRepeater#HeaderItem -> TRepeaterItem
	 **/
	
	/**
	 * TRepeater#FooterItem -> TRepeaterItem
	 **/
	
	/**
	 * TRepeater#EmptyItem -> TRepeaterItem
	 **/
	
	/**
	 * TRepeater#ItemTemplate -> Function
	 **/
	
	/**
	 * TRepeater#HeaderTemplate -> Function
	 **/
	
	/**
	 * TRepeater#FooterTemplate -> Function
	 **/
	
	/**
	 * TRepeater#EmptyTemplate -> Function
	 **/

	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'ItemTemplate', type: 'none' },
					{ name: 'HeaderTemplate', type: 'none' },
					{ name: 'FooterTemplate', type: 'none' },
					{ name: 'EmptyTemplate', type: 'none' },
					{ name: 'WrapperTemplate', type: 'none' },
					{ name: 'Items', type: 'none', default: [] },
					{ name: 'HeaderItem', type: 'none' },
					{ name: 'FooterItem', type: 'none' },
					{ name: 'EmptyItem', type: 'none' },
					{ name: 'DataSource', type: 'object', default: [] },
					{ name: 'ShowHeaderWhenEmpty', type: 'bool', default: true },
					{ name: 'ShowFooterWhenEmpty', type: 'bool', default: true },
					{ name: 'ShowWrapperWhenEmpty', type: 'bool', default: true }
					);
		return arr;
	},	
	
	setDataSource : function( ds ){
		this._DataSource = ds;
		this.cleanup();
	},
	
	cleanup : function(){
		for ( var i=0; i<this._Items.length; i++ ){
			this._Items[i].destroy();
		}

		var to_destroy = ['_HeaderItem','_FooterItem','_EmptyItem'];
		for ( var j=0; j<to_destroy.length; j++ ){
			var c = to_destroy[j];
			if ( this[c] ){
				this[c].destroy();
			}
		}

		this.removeRenderedNodes();
		
		this._childControlsCreated = false;
		this._childControls = [];
		this._childControlsHash = {};
				
		this._Items = [];
		this._HeaderItem = null;
		this._FooterItem = null;
		this._EmptyItem = null;
	},
	
	/**
	 * TRepeater#createChildControls() -> void
	 * 
	 * Creates child controls based on contents of DataSource
	 * 
	 **/
	//@Override
	createChildControls : function(){
		var data_source = this.getDataSource();
		var hasData = data_source && data_source.length > 0;
			
		var placeholder = this;

		if ( ( hasData || this.getShowWrapperWhenEmpty() )
				&& this._WrapperTemplate ){
			var wrapper = new TRepeaterItem({
				'Type' : 'Wrapper',
				'Repeater' : this
			});
			wrapper.useTemplate( this._WrapperTemplate );
			var placeholders = wrapper.findChildControlsByKind( TPlaceHolder );
			if ( placeholders.length > 0 ){
				this.addChildControl( wrapper );
				placeholder = placeholders[0];
			}
		}

		if ( ( hasData || this.getShowHeaderWhenEmpty() )
				&& this._HeaderTemplate ){
			var header = new TRepeaterItem({
					'Type' : 'Header',
					'Repeater' : this
				});
			header.useTemplate( this._HeaderTemplate );
			this._HeaderItem = header;
			placeholder.addChildControl( header );
		}

		if ( hasData
				&& this._ItemTemplate ){
			for( var i =0; i<data_source.length; i++ ){
				var data_item = data_source[i];
				var item = new TRepeaterItem({
						'Type' : 'Item',
						'Repeater' : this,
						'ItemIndex' : i,
						'DataItem' : data_item
					});
				item.useTemplate( this._ItemTemplate );
				this._Items.push( item );
				placeholder.addChildControl( item );
				var param = {
					'domEvent' : null,
					'event' : 'ItemCreated',
					'item' : item,
					'dataItem' : data_item,
					'itemIndex' : i
				};
				this.triggerEvent( 'ItemCreated', param );
			}
		}

		if ( ( hasData || this.getShowFooterWhenEmpty() )
				&& this._FooterTemplate ){
			var footer = new TRepeaterItem({
					'Type' : 'Footer',
					'Repeater' : this
				});
			footer.useTemplate( this._FooterTemplate );
			this._FooterItem = footer;
			placeholder.addChildControl( footer );
		}
			
		if ( !hasData
				&& this._EmptyTemplate ){
			var empty = new TRepeaterItem({
					'Type' : 'Empty',
					'Repeater' : this
				});
			empty.useTemplate( this._EmptyTemplate );
			this._EmptyItem = empty;
			this.addChildControl( empty );
		}
		
	}
	
} );

/** section: Utilities
 * class RepeaterItemCreatedEventParameter
 *
 **/

/**
 * RepeaterItemCreatedEventParameter.domEvent -> null
 **/

/**
 * RepeaterItemCreatedEventParameter.event -> String
 **/

/**
 * RepeaterItemCreatedEventParameter.item -> TRepeaterItem
 **/

/**
 * RepeaterItemCreatedEventParameter.dataItem -> Object
 **/

/**
 * RepeaterItemCreatedEventParameter.itemIndex -> int
 **/
