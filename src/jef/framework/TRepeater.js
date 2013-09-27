//= require TControl
//= require TItem

/**
 * Control renders it's contents multiple times
 * based on data source
 */
var TRepeater = TControl.extend( {
	
	/**
	 * Array
	 * Datasource for repeater
	 */
	_DataSource : [],
	
	/**
	 * Array of TItem
	 */
	_Items : [],
	
	/**
	 * TItem
	 */
	_HeaderItem : null,
	
	/**
	 * TItem
	 */
	_FooterItem : null,
	
	/**
	 * TItem
	 */
	_EmptyItem : null,
	
	/**
	 * Function
	 */
	_ItemTemplate : null,
	
	/**
	 * Function
	 */
	_HeaderTemplate : null,
	
	/**
	 * Function
	 */
	_FooterTemplate : null,
	
	/**
	 * Function
	 */
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
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'ItemTemplate', 'HeaderTemplate', 'FooterTemplate', 'EmptyTemplate' );
		arr.push( 'Items', 'HeaderItem', 'FooterItem', 'EmptyItem' );
		arr.push( 'DataSource' );
		return arr;
	},	
	
	/**
	 * Sets the datasource
	 * and clean ups the repeater for next rendering
	 * 
	 * @param ds Array new data source
	 */
	setDataSource : function( ds ){
		this._DataSource = ds;
		
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
	 * Creates child controls based on contents of DataSource
	 */
	//@Override
	createChildControls : function(){
		var data_source = this._DataSource;
		if ( data_source.length > 0 ){
			
			if ( this._HeaderTemplate ){
				var header = new TItem();
				header.useTemplate( this._HeaderTemplate );
				this._HeaderItem = header;
				this.addChildControl( header );
			}
			
			if ( this._ItemTemplate ){
				for( var i =0; i<data_source.length; i++ ){
					var data_item = data_source[i];
					var item = new TItem({
							'ItemIndex' : i,
							'DataItem' : data_item
						});
					item.useTemplate( this._ItemTemplate );
					this._Items.push( item );
					this.addChildControl( item );
				}
			}
			
			if ( this._FooterTemplate ){
				var footer = new TItem();
				footer.useTemplate( this._FooterTemplate );
				this._HeaderItem = footer;
				this.addChildControl( footer );
			}
			
		}else{
			if ( this._EmptyTemplate ){
				var empty = new TItem();
				empty.useTemplate( this._EmptyTemplate );
				this._EmptyItem = empty;
				this.addChildControl( empty );
			}
		}
	}
	
} );