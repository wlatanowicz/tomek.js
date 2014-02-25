feature('Tests environment', function() {
	summary(
		'Pre-test to check if test libs work well'
	);

	scenario('Check Jasmine', function() {
		var x;

		given('Set variable to false', function() {
			x = false;
		});
		when('Set variable to true', function() {
			x = true;
		});
		then('Value should be true', function() {
			expect( x ).toBe(true)
		});
		when('Set variable to false', function() {
			x = false;
		});
		then('Value should be false', function() {
			expect( x ).not.toBe(true)
		});
	});

	scenario('Check Prototype', function() {
		var div;

		given('Set variable to null', function() {
			div = null;
		});
		when('Set variable to container', function() {
			div = $( 'container' );
		});
		then('Element id should be container', function() {
			expect( div.id ).toBe( 'container' );
		});
	});
	
});
