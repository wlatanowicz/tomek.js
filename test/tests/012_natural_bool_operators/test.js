component( 'TTemplateControl', function(){
	feature('Expression rendering', function() {
		summary(
			'Tests if template renders expressions and static texts'
		);

		scenario('Render template', function() {
			$( 'container' ).update('');
			var c;

			given('Create new control', function() {
				c = new TTestControl012();
				c.Placeholder = 'container';
			});
			
			when('Render control', function() {
				c.render();
			});
			
			then('Literal L1 should be rendered', function() {
				expect( $('container').innerHTML.indexOf( 'L1' ) != -1 ).toBeTruthy();
			});
			
			then('Literal L2 should NOT be rendered', function() {
				expect( $('container').innerHTML.indexOf( 'L2' ) != -1 ).toBeFalsy();
			});
			
			then('Literal L3 should be rendered', function() {
				expect( $('container').innerHTML.indexOf( 'L3' ) != -1 ).toBeTruthy();
			});
			
		});
		
	});
});