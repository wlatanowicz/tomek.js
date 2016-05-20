//= require TErrorRouter
//= require TErrorHandler
//= require ErrorHandling-tpl

var c = new ErrorHandling( { 'Placeholder' : 'container' } );
c.render();

TErrorRouter.register();
TErrorRouter.addHandler( new TErrorHandler() );
