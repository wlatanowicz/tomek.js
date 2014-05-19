component( 'TTemplateControl', function(){
	feature('Expression rendering', function() {
		summary(
			'Tests if template renders expressions and static texts'
		);

		scenario('Render template', function() {
			$( 'container' ).update('');
			var c;
			var wc;

			given('Create new control', function() {
				c = new TTestControl009( { 'Placeholder' : 'container' } );
				wc = c.findChildControlByID( 'WC' );
			});
			
			when('Render control', function() {
				c.render();
			});
			
			then('Expression text should be rendered', function() {
				expect( $( wc.getElement() ).innerHTML.trim() ).toEqual( 'test' );
			});
			
			when('Class added', function() {
				wc.setCssClass( 'red' );
				c.render();
			});
			
			then('className should change', function() {
				expect( $( wc.getElement() ).className ).toEqual( 'red' );
			});
			
			when('Class changed', function() {
				wc.setCssClass( 'green' );
				c.render();
			});
			
			then('className should change again', function() {
				expect( $( wc.getElement() ).className ).toEqual( 'green' );
			});
			
		});
		
	});
});