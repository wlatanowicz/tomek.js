function pausecomp(millis)
 {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}

component( 'TTemplateControl', function(){
	feature('Expression rendering', function() {
		summary(
			'Tests if template renders expressions and static texts'
		);

		scenario('Render template', function() {
			$( 'container' ).update('');
			window.location.hash = '';
			var c;

			given('Create new control', function() {
				c = new TTestControl015();
				c.Placeholder = 'container';
			});
			
			when('Render control', function() {
				c.render();
			});
			
			then('No routeview control should be visible', function() {
				expect( $('t1') ).toBe( null );
				expect( $('t2') ).toBe( null );
			});
			
			when('Go to #/tabs/one', function() {
				window.location.hash = "/tabs/one";
				pausecomp( 500 );
			});
			
			then('Tab One should be visible, Tab Two should not be visible', function() {
				expect( $('t1') ).not.toBe( null );
				expect( $('t2') ).toBe( null );
			});
			
			when('Go to #/tabs/two/xxx', function() {
				window.location.hash = "/tabs/two/xxx";
				pausecomp( 500 );
			});
			
			then('Tab Two should be visible, Tab One should not be visible', function() {
				expect( $('t2') ).not.toBe( null );
				expect( $('t1') ).toBe( null );
			});
			
			then('Tab Two text should be "xxx"', function() {
				expect( $('t2').textContent ).toEqual( "xxx" );
			});
			
			when('Go to #/tabs/two/yyy', function() {
				window.location.hash = "/tabs/two/yyy";
				pausecomp( 500 );
			});
			
			then('Tab Two should be visible, Tab One should not be visible', function() {
				expect( $('t2') ).not.toBe( null );
				expect( $('t1') ).toBe( null );
			});
			
			then('Tab Two text should be "yyy"', function() {
				expect( $('t2').textContent ).toEqual( "yyy" );
			});
			
			when('Go to #/tabs/three/yyy', function() {
				window.location.hash = "/tabs/three/yyy";
				pausecomp( 500 );
			});
			
			then('Tab Three should be visible, Tab One and Tab Two should not be visible', function() {
				expect( $('t3') ).not.toBe( null );
				expect( $('t2') ).toBe( null );
				expect( $('t2') ).toBe( null );
			});
			
			when('Go to #/tabs/three', function() {
				window.location.hash = "/tabs/three";
				pausecomp( 500 );
			});
			
			then('Tab Three should be visible, Tab One and Tab Two should not be visible', function() {
				expect( $('t3') ).not.toBe( null );
				expect( $('t2') ).toBe( null );
				expect( $('t2') ).toBe( null );
			});
			
			when('Go to #/tabs/trzy', function() {
				window.location.hash = "/tabs/trzy";
				pausecomp( 500 );
			});
			
			then('Tab Three should be visible, Tab One and Tab Two should not be visible', function() {
				expect( $('t3') ).not.toBe( null );
				expect( $('t2') ).toBe( null );
				expect( $('t2') ).toBe( null );
			});
			
		});
		
	});
});