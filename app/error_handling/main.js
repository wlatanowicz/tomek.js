//= require TErrorRouter
//= require TErrorHandler
//= require CustomErrorHandler
//= require ErrorHandling-tpl

TErrorRouter.register();
TErrorRouter.addHandler( new TErrorHandler() );
TErrorRouter.addHandler( new CustomErrorHandler() );

var c = new ErrorHandling( { 'Placeholder' : 'container' } );
c.render();

