feature('Nested template controls', function() {
	summary(
		'Check if controls defined by templates',
		'are rendering when nested'
	);

	scenario('Control with div in control', function() {
		var c;

		given('new control', function() {
			c = new TTestControl003a( { 'Placeholder' : 'container' } );
		});
		when('render()', function() {
			c.render();
		});
		then('inner control should render it\'s contents - a div element', function() {
			var div = $( 'inner_div' );
			expect( div.tagName.toLowerCase() ).toBe( 'div' );
			expect( div.innerHTML ).toBe( 'ok' );
		});
		then('inner_div should be directly in outer_div', function() {
			var inner_div = $( 'inner_div' );
			var outer_div = $( 'outer_div' );
			expect( inner_div.parentNode ).toEqual( outer_div );
		});
	});
});
