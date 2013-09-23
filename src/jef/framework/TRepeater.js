//= require TControl
//= require TItem

var TRepeater = TControl.extend( {
	
	_DataSource : [],
	
	_Items : [],
	_HeaderItem : null,
	_FooterItem : null,
	_EmptyItem : null,
	
	_ItemTemplate : null,
	_HeaderTemplate : null,
	_FooterTemplate : null,
	
	constructor : function( a ){
		this.base( a );
		this._Items = [];
		this._DataSource = [];
	},
	
	getPublicProperties : function(){
		var arr = this.base()
		arr.push( 'ItemTemplate', 'HeaderTemplate', 'FooterTemplate', 'EmptyTemplate' );
		arr.push( 'Items', 'HeaderItem', 'FooterItem', 'EmptyItem' );
		arr.push( 'DataSource' );
		return arr;
	},	
	
	setDataSource : function( _ds ){
		this._DataSource = _ds;
		
		this.preRenderCleanUp();
		
		this._childControlsCreated = false;
		this._childControls = [];
		this._childControlsHash = {};
		
		this._Items = [];
		this._HeaderItem = null;
		this._FooterItem = null;
		this._EmptyItem = null;
	},
	
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