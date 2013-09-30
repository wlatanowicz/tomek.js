feature('Car engine startup', function() {
	summary(
		'In order to drive my car around',
		'As a vehicle owner',
		'I want to press a button to start my car'
	);

	scenario('The is stopped with the engine off', function() {
		var car;

		given('My car is parked and not running', function() {
			car = {};
		});
		when('I press the start button', function() {
			car.x = 'x';
		});
		then('The car should start up', function() {
			expect(true).toBe(true)
		});
	});
});
