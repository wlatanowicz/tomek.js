component( 'TTemplateControl', function(){
	feature('Expression rendering', function() {
		summary(
			'Tests if simple validator work'
		);

		scenario('Render template', function() {
			$( 'container' ).update('');
			var c;

			given('Create new control', function() {
				c = new TTestControl008( { 'Placeholder' : 'container' } );
			});
			
			when('Render control', function() {
				c.render();
			});
			
			then('Should be no errors', function() {
				expect( $$( '.err' ).length ).toEqual( 0 );
			});
			
			when('Click the button', function() {
				c.$('B').getElement().click();
			});
			
			then('Should be one error', function() {
				expect( $$( '.err' ).length ).toEqual( 1 );
			});
			
			when('Fill form and click the button', function() {
				c.$('TB').getElement().value = "test";
				c.$('B').getElement().click();
			});
			
			then('Should be no errors', function() {
				expect( $$( '.err' ).length ).toEqual( 0 );
			});
			
		});
		
	});
});