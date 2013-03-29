//= require "TContent"
//= require "TPanel"
//= require "TLiteral"
//= require "TRepeater"

//= require "TMyControl"

TMyControl.prototype.createChildControls = function(){
	c1 = new TContent( {
				"OnClick" : "<a>alert( 'ok' );</a>"
				} );
	this.addTemplateChildControl( "c1", c1 );
	this.addChildControl( c1 );
	c1.renderChildControls = function( placeholder ){
			var h_c2 = document.createElement( "p" );
		var t_c3 = document.createTextNode( "ąćół akkkkka" );
		this.appendChild( h_c2, t_c3 );
		this._templateControls["c4"].renderContentsInPlaceholder( h_c2 );
		this._templateControls["c5"].renderContentsInPlaceholder( h_c2 );
		this.appendChild( placeholder, h_c2 );
		this._templateControls["c6"].renderContentsInPlaceholder( placeholder );
		var h_c7 = document.createElement( "a" );
		var t_c8 = document.createTextNode( "aaA" );
		this.appendChild( h_c7, t_c8 );
		this.appendChild( placeholder, h_c7 );
		this._templateControls["c9"].renderContentsInPlaceholder( placeholder );

	}
	c4 = new TPanel( {
				"ID" : "p2"
				} );
	c1.addTemplateChildControl( "c4", c4 );
	c1.addChildControl( c4 );
	c4.renderChildControls = function( placeholder ){
	
	}
	c5 = new TPanel( {
				"ID" : "panelik"
				} );
	c1.addTemplateChildControl( "c5", c5 );
	c1.addChildControl( c5 );
	c5.renderChildControls = function( placeholder ){
			var h_c10 = document.createElement( "p" );
		var t_c11 = document.createTextNode( "testowty paragraf" );
		this.appendChild( h_c10, t_c11 );
		this.appendChild( placeholder, h_c10 );
		this._templateControls["c12"].renderContentsInPlaceholder( placeholder );
		var h_c13 = document.createElement( "p" );
		var t_c14 = document.createTextNode( "drugi paragraf" );
		this.appendChild( h_c13, t_c14 );
		this.appendChild( placeholder, h_c13 );

	}
	c12 = new TLiteral( {
				"ID" : "xxx",
				"Text" : "xxx1"
				} );
	c5.addTemplateChildControl( "c12", c12 );
	c5.addChildControl( c12 );
	c12.renderChildControls = function( placeholder ){
	
	}
	c6 = new TPanel([]);
	c1.addTemplateChildControl( "c6", c6 );
	c1.addChildControl( c6 );
	c6.renderChildControls = function( placeholder ){
	
	}
	c9 = new TRepeater([]);
	c1.addTemplateChildControl( "c9", c9 );
	c1.addChildControl( c9 );
	c9.renderChildControls = function( placeholder ){
	
	}
};
