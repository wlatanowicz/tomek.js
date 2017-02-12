function checkOrder( el ){
	var txt = $( el ).textContent;
	var ar = txt.split(/[\s]+/);
	var ar2 = [];
	for ( var i =0; i<ar.length; i++ ){
		if ( ar[i].length > 0 ){
			ar2.push( ar[i] );
		}
	}
	for ( var i=1; i<ar2.length; i++ ){
		if ( ar2[i-1] >= ar2[i] ){
			return false;
		}
	}
	return true;
}

component( 'TTemplateControl', function(){
	feature('Expression rendering', function() {
		summary(
			'Tests if template renders contents in correct order'
		);

		scenario('Render template', function() {
			$( 'container' ).update('');
			var c;

			given('Create new control', function() {
				c = new TTestControl014( { 'Placeholder' : 'container' } );
			});
			
			when('Render control', function() {
				c.render();
			});
			
			then('Order should be ascending', function() {
				expect( checkOrder( $('container') ) ).toBe( true );
			});
			
			when('Rerender control', function() {
				c.render();
			});
			
			then('Order should be ascending', function() {
				expect( checkOrder( $('container') ) ).toBe( true );
			});
			
		});
		
	});
});