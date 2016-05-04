//= require TTouchView
//= require TEventResponder
//= require TStencil

/** section: WebControls_Mobile
 * class TTouchScrollView < TPanel
 * includes TEventResponderMixin
 * 
 * Control creates a scrollable container with pull-to-refresh function
 * 
 **/
klass( 'TTouchScrollView', TTouchView, [ TEventResponderMixin ], {
      
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
                    { name: 'EnableRefresh', type: 'bool', default: true },
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
		var enabled = this.getEnableRefresh();
		if ( enabled && scroll > pullerHeight ){
            if ( ! this._refreshTriggered ){
                this._refreshTriggered = true;
                this.triggerEvent( 'Refresh', {} );
            }
            this._refreshBox.style.top = (headerHeight)+"px";
			this._refreshBox.className = 'refresh-puller active'+( this.getHasHeader() ? ' has-header' : '' );
		}else
		if ( enabled && scroll > 0 ){
			this._refreshBox.style.top = (headerHeight-pullerHeight+scroll)+"px";
		}else{
            this._refreshTriggered = false;
			this._refreshBox.style.top = (headerHeight-pullerHeight)+"px";
			this._refreshBox.className = 'refresh-puller inactive'+( this.getHasHeader() ? ' has-header' : '' );
		}
	},

	setAdditionalCssClasses : function( class_string ){
		class_string = this.base( class_string );
		if ( class_string.indexOf( 'content-with-scroll' ) == -1 ){
			class_string += ' content-with-scroll';
		}
		return class_string;
	},
	
	createMainElement : function(){
		var d = document.createElement( 'div' );
		var c = this.base();
		var s = document.createElement( 'div' );

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
			var content = new TContent( [] );
			item.addTemplateChildControl( "c13", content );
			content.renderTemplateChildControls = function( placeholder ){
				var icon_wrapper = document.createElement( "span" );
				icon_wrapper.setAttribute( "class", "icon" );
				var icon = document.createElement( "span" );
				icon.setAttribute( "class", "ion-arrow-down-c" );
				icon_wrapper.appendChild( icon );
				placeholder.appendChild( icon_wrapper );
				var label_wrapper = document.createElement( "span" );
				label_wrapper.setAttribute( "class", "label" );
				var label_text = document.createTextNode( labelText );
				label_wrapper.appendChild( label_text );
				placeholder.appendChild( label_wrapper );
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