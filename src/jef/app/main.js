
//= require TMyControl-tpl
//= require TMyForm-tpl

var c = new TMyForm( { 'Placeholder' : 'container' } );
c.render();

//var r = c.findControlById( 'Rep' );

c.findChildControlByID( 'Btn' ).attachEvent( 'Click', c.buttonClicked.bind( c ) );
