//= require "TContent"
//= require "THtmlElement"
//= require "TTextElement"
//= require "TPanel"
//= require "TLiteral"
//= require "TRepeater"

//= require "TMyControl"

TMyControl.prototype.createChildControls = function(){
var placeholder = this;
	var v1 = new TContent( {
				"OnClick" : "<a>alert( 'ok' );</a>"
				} );
	placeholder.addChildControl( v1 );
	var v2 = new THtmlElement("p",  {
				"class" : "paragraph"
				} );
	v1.addChildControl( v2 );
	var v3 = new TTextElement("ąćół akkkkka");
	v2.addChildControl( v3 );
	var v4 = new TPanel( {
				"ID" : "p2"
				} );
	v2.addChildControl( v4 );
	var v5 = new TPanel( {
				"ID" : "panelik"
				} );
	v2.addChildControl( v5 );
	var v6 = new THtmlElement("p", []);
	v5.addChildControl( v6 );
	var v7 = new TTextElement("testowty paragraf");
	v6.addChildControl( v7 );
	var v8 = new TLiteral( {
				"ID" : "xxx",
				"Text" : "xxx"
				} );
	v5.addChildControl( v8 );
	var v9 = new THtmlElement("p", []);
	v5.addChildControl( v9 );
	var v10 = new TTextElement("drugi paragraf");
	v9.addChildControl( v10 );
	var v11 = new TPanel([]);
	v1.addChildControl( v11 );
	var v12 = new THtmlElement("a",  {
				"href" : "[%= this.getText() %]"
				} );
	v1.addChildControl( v12 );
	var v13 = new TTextElement("aaA");
	v12.addChildControl( v13 );
	var v14 = new TRepeater([]);
	v1.addChildControl( v14 );
};
