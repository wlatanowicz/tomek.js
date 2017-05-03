component( 'TTemplateControl', function(){
	feature('Expression rendering', function() {
		summary(
			'Tests if simple validator work'
		);

		scenario('Render template', function() {
			$( 'container' ).update('');
			var c;

			given('Create new control', function() {
				c = new TTestControl008();
				c.Placeholder = 'container';
			});
			
			when('Render control', function() {
				c.render();
			});
			
			then('Should be no errors', function() {
				expect( $$( '.err' ).length ).toEqual( 0 );
			});
			
			when('Click the button', function() {
				c.$('B').Element.click();
			});
			
			then('Should be one error', function() {
				expect( $$( '.err' ).length ).toEqual( 1 );
			});
			
			when('Fill form and click the button', function() {
				c.$('TB').Element.value = "test";
				c.$('B').Element.click();
			});
			
			then('Should be no errors', function() {
				expect( $$( '.err' ).length ).toEqual( 0 );
			});
			
		});
		
	});
});