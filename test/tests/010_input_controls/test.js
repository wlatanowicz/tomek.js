component( 'TTemplateControl', function(){
	feature('Expression rendering', function() {
		summary(
			'Tests if template renders expressions and static texts'
		);

		scenario('Render template', function() {
			$( 'container' ).update('');
			var c;
			
			var c_tb;
			var c_cb;
			var c_ddl;

			given('Create new control', function() {
				c = new TTestControl010();
				c.Placeholder = 'container';
				c_tb = c.findChildControlsByType( TextBox )[0];
				c_cb = c.findChildControlsByType( CheckBox )[0];
				c_ddl = c.findChildControlsByType( DropDownList )[0];
			});
			
			when('Set initial values', function() {
				c_tb.Text = 'test1';
				c_ddl.Value = 'b';
			});
			
			when('Render control', function() {
				c.render();
			});
			
			then('Values should match', function() {
				expect( c_tb.Text ).toEqual( 'test1' );
				expect( c_tb.Element.value ).toEqual( 'test1' );
				expect( c_ddl.Value ).toEqual( 'b' );
				expect( $F( c_ddl.Element ) ).toEqual( 'b' );
			});
			
			when('Values changed by Tomek', function() {
				c_tb.Text = 'test2';
			});
			
			then('Values should match', function() {
				expect( c_tb.Text ).toEqual( 'test2' );
				expect( c_tb.Element.value ).toEqual( 'test2' );
			});
			
			when('Values changed by DOM', function() {
				c_tb.Element.value = 'test3';
			});
			
			then('Values should match', function() {
				expect( c_tb.Text ).toEqual( 'test3' );
				expect( c_tb.Element.value ).toEqual( 'test3' );
			});
			
			when('Rerender control', function() {
				c.render();
			});
			
			then('Values should match', function() {
				expect( c_tb.Text ).toEqual( 'test3' );
				expect( c_tb.Element.value ).toEqual( 'test3' );
			});
			
		});
		
	});
});