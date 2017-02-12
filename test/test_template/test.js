component( 'TTemplateControl', function(){
	feature('Expression rendering', function() {
		summary(
			'Tests if template renders expressions and static texts'
		);

		scenario('Render template', function() {
			$( 'container' ).update('');
			var c;

			given('Create new control', function() {
				c = new TTestControl__NUM__( { 'Placeholder' : 'container' } );
			});
			
			when('Render control', function() {
				c.render();
			});
			
			then('Expression text should be rendered', function() {
				expect( 'text' ).toEqual( 'text' );
			});
			
		});
		
	});
});