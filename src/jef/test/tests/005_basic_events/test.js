component( 'TEventResponderMixin', function(){
	feature('Button clicked', function() {
		summary(
			'Tests if event is triggered after DOM event'
		);

		scenario('Click button using click() DOM method', function() {
			var c;
			$( 'container' ).update('');

			given('Create new template with button and render', function() {
				c = new TTestControl005( { 'Placeholder' : 'container' } );
				c.render();
				c.clicks = 0;
				c.lastSender = null;
			});
			
			when('Run click()', function() {
				$( 'button' ).click();
			});
			
			then('Click counter should be increased', function() {
				expect( c.clicks ).toEqual( 1 );
			});
			then('Sender should be button 1', function() {
				expect( c.lastSender ).toBe( c.findChildControlByID( 'Button' ) );
			});
			
			when('Run click() again', function() {
				$( 'button2' ).click();
			});
			
			then('Click counter should be increased more', function() {
				expect( c.clicks ).toEqual( 2 );
			});
			then('Sender should be button 2', function() {
				expect( c.lastSender ).toBe( c.findChildControlByID( 'Button2' ) );
			});
			
			when('Run click() again', function() {
				$( 'button' ).click();
			});
			
			then('Click counter should be increased even more', function() {
				expect( c.clicks ).toEqual( 3 );
			});
			then('Sender should be button 1', function() {
				expect( c.lastSender ).toBe( c.findChildControlByID( 'Button' ) );
			});
			
		});
	});

	feature('Event triggered programmaticaly', function() {
		summary(
			'Tests if event is triggered programmaticaly'
		);

		scenario('Trigger event using triggerEvent method', function() {
			var c;
			$( 'container' ).update('');

			given('Create new template with button and render', function() {
				c = new TTestControl005( { 'Placeholder' : 'container' } );
				c.render();
				c.clicks = 0;
				c.lastSender = null;
			});
			
			when('Run triggerEvent()', function() {
				c.findChildControlByID( 'Button' ).triggerEvent( 'Click', null );
			});
			
			then('Click counter should be increased', function() {
				expect( c.clicks ).toEqual( 1 );
			});
			then('Sender should be button 1', function() {
				expect( c.lastSender ).toBe( c.findChildControlByID( 'Button' ) );
			});
			
			when('Run triggerEvent() on button 2', function() {
				c.findChildControlByID( 'Button2' ).triggerEvent( 'Click', null );
			});
			
			then('Click counter should be increased more', function() {
				expect( c.clicks ).toEqual( 2 );
			});
			then('Sender should be button 2', function() {
				expect( c.lastSender ).toBe( c.findChildControlByID( 'Button2' ) );
			});
			
			when('Run triggerEvent() on button 1 again', function() {
				c.findChildControlByID( 'Button' ).triggerEvent( 'Click', null );
			});
			
			then('Click counter should be increased even more', function() {
				expect( c.clicks ).toEqual( 3 );
			});
			then('Sender should be button 1', function() {
				expect( c.lastSender ).toBe( c.findChildControlByID( 'Button' ) );
			});
						
		});
	});

});
