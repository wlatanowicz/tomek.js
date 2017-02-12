component( 'TTemplateControl', function(){
	feature('Expression rendering', function() {
		summary(
			'Tests if template renders expressions and static texts'
		);

		scenario('Render template', function() {
			$( 'container' ).update('');
			var c;

			given('Create new control', function() {
				c = new TTestControl011( { 'Placeholder' : 'container' } );
			});
			
			when('Render control', function() {
				c.render();
			});
			
			then('All options should be rendered', function() {
				expect( $$( 'select option:nth-child(1)' )[0].innerHTML.trim() ).toEqual( 'AA' );
				expect( $$( 'select option:nth-child(2)' )[0].innerHTML.trim() ).toEqual( 'BB' );
				expect( $$( 'select option:nth-child(3)' )[0].innerHTML.trim() ).toEqual( 'CC' );
				expect( $$( 'select option:nth-child(4)' )[0].innerHTML.trim() ).toEqual( 'DD' );
			});
			
			then('All options should have correct values', function() {
				expect( $$( 'select option:nth-child(1)' )[0].value ).toEqual( 'a' );
				expect( $$( 'select option:nth-child(2)' )[0].value ).toEqual( 'b' );
				expect( $$( 'select option:nth-child(3)' )[0].value ).toEqual( 'c' );
				expect( $$( 'select option:nth-child(4)' )[0].value ).toEqual( 'd' );
			});
			
			then('Third option should be disabled', function() {
				expect( $$( 'select option:nth-child(1)' )[0].disabled ).toBeFalsy();
				expect( $$( 'select option:nth-child(2)' )[0].disabled ).toBeFalsy();
				expect( $$( 'select option:nth-child(3)' )[0].disabled ).toBeTruthy();
				expect( $$( 'select option:nth-child(4)' )[0].disabled ).toBeFalsy();
			});
			
		});
		
	});
});