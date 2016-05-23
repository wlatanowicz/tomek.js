//= require TErrorRouter
//= require TErrorHandler
//= require CustomErrorHandler
//= require ErrorHandling-tpl

var c = new ErrorHandling( { 'Placeholder' : 'container' } );
c.render();

TErrorRouter.register();
TErrorRouter.addHandler( new TErrorHandler() );
TErrorRouter.addHandler( new CustomErrorHandler() );