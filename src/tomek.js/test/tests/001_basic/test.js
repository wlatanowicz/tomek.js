component( 'TTemplateControl', function(){
	feature('Expression rendering', function() {
		summary(
			'Tests if template renders expressions and static texts'
		);

		scenario('Render simple template', function() {
			$( 'container' ).update('');
			var c;

			given('Create new control', function() {
				c = new TTestControl001( { 'Placeholder' : 'container' } );
			});
			
			when('Render control', function() {
				c.render();
			});
			
			then('Expression text should be rendered', function() {
				expect( $('s1').innerHTML ).toEqual( c.getTestText() );
			});
			then('Static text should be rendered', function() {
				expect( $('s2').innerHTML ).toEqual( 'Static text' );
			});
			
		});

		scenario('Rerender template with expression', function() {
			$( 'container' ).update('');
			var c;
			var e1 = 'EXPRESSION TEXT ONE';
			var e2 = 'expression text two';

			given('Create new control', function() {
				c = new TTestControl001( { 'Placeholder' : 'container' } );
			});
			
			when('Set value and render control', function() {
				c.setTestText( e1 )
				c.render();
			});
			
			then('Expression text should be rendered', function() {
				expect( $('s1').innerHTML ).toEqual( e1 );
			});
			
			when('Set new value and rerender control', function() {
				c.setTestText( e2 )
				c.render();
			});
			
			then('Expression text should change', function() {
				expect( $('s1').innerHTML ).not.toEqual( e1 );
				expect( $('s1').innerHTML ).toEqual( e2 );
			});
			
		});
		
	});
});