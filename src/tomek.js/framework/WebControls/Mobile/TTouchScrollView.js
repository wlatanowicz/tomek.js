//= require TPanel
//= require TEventResponder
//= require TStencil

/** section: WebControls_Mobile
 * class TTouchScrollView < TPanel
 * includes TEventResponderMixin
 * 
 * Control creates a scrollable container with pull-to-refresh function
 * 
 **/
klass( 'TTouchScrollView', TPanel, [ TEventResponderMixin ], {
      
	_triggersEvents : ['Scroll','Refresh'],

	_refreshResponderAttached : false,
	_refreshBox : null,
	_headerHeight : 44,
    _RefreshPullerTemplate : null,
    _RefreshPuller : null,
    _refreshTriggered : false,

	constructor : function( options ){
		this.base( options );
		this._refreshResponderAttached = false;
		this._refreshBoxHeight = 0;
		this._refreshBox = null;
        this._RefreshPullerTemplate = null;
        this._RefreshPuller = null;
        this._refreshTriggered = false;
	},

	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'RefreshPullerHeight', type: 'int', default: 80 },
                    { name: 'HasHeader', type: 'bool', default: true },
                    { name: 'HasFooter', type: 'bool', default: true },
                    { name: 'RefreshPullerLabel', type: 'string', default: "Pull down to refresh" },
                    { name: 'RefreshPullerTemplate', type: 'none' } );
		return arr;
	},

	attachEvent : function( e, fun ){
		this.base( e, fun );
		if ( e == 'Refresh' && ! this._refreshResponderAttached ){
			this.attachEvent( 'Scroll', this.scrolled.bind( this ) );
			this._refreshResponderAttached = true;
		}
	},

	scrolled : function( sender, param ){
		var scroll = - param.domEvent.target.scrollTop;
		var pullerHeight = this.getRefreshPullerHeight();
		var headerHeight = this.getHasHeader() ? this._headerHeight : 0;
		if ( scroll > pullerHeight ){
            if ( ! this._refreshTriggered ){
                this._refreshTriggered = true;
                this.triggerEvent( 'Refresh', {} );
            }
            this._refreshBox.style.top = (headerHeight)+"px";
			this._refreshBox.className = 'refresh-puller active'+( this.getHasHeader() ? ' has-header' : '' );
		}else
		if ( scroll > 0 ){
			this._refreshBox.style.top = (headerHeight-pullerHeight+scroll)+"px";
		}else{
            this._refreshTriggered = false;
			this._refreshBox.style.top = (headerHeight-pullerHeight)+"px";
			this._refreshBox.className = 'refresh-puller inactive'+( this.getHasHeader() ? ' has-header' : '' );
		}
	},

	createMainElement : function(){
		var d = this.base();
		var c = document.createElement( 'div' );
		var s = document.createElement( 'div' );

		c.className = 'content content-with-scroll'+( this.getHasHeader() ? ' has-header' : '' )+( this.getHasFooter() ? ' has-footer' : '' );
		s.className = 'scroll-content padding';

		var r = document.createElement( 'div' );
		r.className = 'refresh-puller inactive'+( this.getHasHeader() ? ' has-header' : '' );

		d.appendChild( r );
		d.appendChild( c );
		c.appendChild( s );

		this._renderedContentPlaceholder = s;
		this._refreshBox = r;

		var headerHeight = this.getHasHeader() ? this._headerHeight : 0;
		this._refreshBox.style.top = (headerHeight-this.getRefreshPullerHeight())+"px";

		this.registerTriggerElement( c, 'scroll', 'Scroll' );

		return d;
	},
      
    createChildControls : function(){
        var puller = new TStencil({
                                 'Type' : 'RefreshPuller'
                                 });
        puller.useTemplate( this._RefreshPullerTemplate || this.getDefaultRefreshPuller() );
        this._RefreshPuller = puller;
    },
      
    getDefaultRefreshPuller : function(){
		var labelText = this.getRefreshPullerLabel();
		return function( item ){
			var ExpressionContext = item;
			var c13 = new TContent( [] );
			item.addTemplateChildControl( "c13", c13 );
			c13.renderTemplateChildControls = function( placeholder ){
				var h_c14 = document.createElement( "span" );
				h_c14.setAttribute( "class", "icon" );
				var h_c15 = document.createElement( "span" );
				h_c15.setAttribute( "class", "ion-arrow-down-c" );
				h_c14.appendChild( h_c15 );
				placeholder.appendChild( h_c14 );
				var h_c16 = document.createElement( "span" );
				h_c16.setAttribute( "class", "label" );
				var t_c17 = document.createTextNode( labelText );
				h_c16.appendChild( t_c17 );
				placeholder.appendChild( h_c16 );
			};
		};
    },
      
    renderContents : function(){
		this.base( this );
		if ( this._RefreshPuller !== null ){
			this._RefreshPuller.renderContentsInPlaceholder( this._refreshBox );
		}
    }
    
      
});