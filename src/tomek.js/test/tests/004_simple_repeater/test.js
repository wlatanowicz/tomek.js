component( 'TRepeater', function(){
	feature('Empty TRepeater test', function() {
		summary(
			'Tests if repeater behaves corectly when no data passed'
		);

		scenario('Render repeater without data', function() {
			var c;
			$( 'container' ).update('');

			given('Create new template with repeater', function() {
				c = new TTestControl004( { 'Placeholder' : 'container' } );
			});
			
			when('Render the control', function() {
				c.render();
			});
			
			then('Only one item should be rendered', function() {
				expect( $$( '#container span' ).length ).toEqual( 1 );
			});
			then('Empty item should be rendered', function() {
				expect( $$( '#container span.empty' ).length ).toEqual( 1 );
			});
			then('No footers, headers and data items should be rendered', function() {
				expect( $$( '#container span.footer, #container span.header, #container span.item' ).length ).toEqual( 0 );
			});
			
		});
	});
	
	feature('TRepeater with data test', function() {
		summary(
			'Tests if repeater behaves corectly when data passed'
		);

		scenario('Render repeater with three items', function() {
			var c;
			var ds = ['a','b','c'];
			$( 'container' ).update('');

			given('Create new template with repeater', function() {
				c = new TTestControl004( { 'Placeholder' : 'container' } );
			});
			
			when('Set the data and render the control', function() {
				c.findChildControlByID('Rep').setDataSource( ds );
				c.render();
			});
			
			then('count(ds)+2 items should be rendered', function() {
				expect( $$( '#container span' ).length ).toEqual( ds.length+2 );
			});
			then('Empty item should not be rendered', function() {
				expect( $$( '#container span.empty' ).length ).toEqual( 0 );
			});
			then('One header should be rendered', function() {
				expect( $$( '#container span.header' ).length ).toEqual( 1 );
			});
			then('One footer should be rendered', function() {
				expect( $$( '#container span.footer' ).length ).toEqual( 1 );
			});
			then('count(ds) data items should be rendered', function() {
				expect( $$( '#container span.item' ).length ).toEqual( ds.length );
			});
			then('Data items should have proper texts and ids', function() {
				for ( var i=0; i<ds.length; i++ ){
					var item = $( 'item_'+i );
					expect( item.innerHTML.trim() ).toEqual( 'Item-'+ds[i].trim() );
					expect( item.hasClassName( 'item' ) ).toBeTruthy();
				}
			});
			
		});

		scenario('Render repeater with three items and update to five items', function() {
			var c;
			var ds = ['a','b','c'];
			var ds2 = [ 'A', 'B', 'C', 'D', 'E' ];
			$( 'container' ).update('');

			given('Create new template with repeater', function() {
				c = new TTestControl004( { 'Placeholder' : 'container' } );
			});
			
			when('Set the data and render the control', function() {
				c.findChildControlByID('Rep').setDataSource( ds );
				c.render();
			});
			
			then('count(ds)+2 items should be rendered', function() {
				expect( $$( '#container span' ).length ).toEqual( ds.length + 2 );
			});
			
			when('Set the new data and render the control', function() {
				c.findChildControlByID('Rep').setDataSource( ds2 );
				c.render();
			});
			
			then('count(ds2)+2 items should be rendered', function() {
				expect( $$( '#container span' ).length ).toEqual( ds2.length + 2 );
			});
			then('Empty item should not be rendered', function() {
				expect( $$( '#container span.empty' ).length ).toEqual( 0 );
			});
			then('One header should be rendered', function() {
				expect( $$( '#container span.header' ).length ).toEqual( 1 );
			});
			then('One footer should be rendered', function() {
				expect( $$( '#container span.footer' ).length ).toEqual( 1 );
			});
			then('count(ds2) data items should be rendered', function() {
				expect( $$( '#container span.item' ).length ).toEqual( ds2.length );
			});
			then('Data items should have proper texts and ids', function() {
				for ( var i=0; i<ds2.length; i++ ){
					var item = $( 'item_'+i );
					expect( item.innerHTML.trim() ).toEqual( 'Item-'+ds2[i].trim() );
					expect( item.hasClassName( 'item' ) ).toBeTruthy();
				}
			});
			
		});

		scenario('Render repeater with three items and update to no items', function() {
			var c;
			var ds = ['a','b','c'];
			$( 'container' ).update('');

			given('Create new template with repeater', function() {
				c = new TTestControl004( { 'Placeholder' : 'container' } );
			});
			
			when('Set the data and render the control', function() {
				c.findChildControlByID('Rep').setDataSource( ds );
				c.render();
			});
			
			then('count(ds)+2 items should be rendered', function() {
				expect( $$( '#container span' ).length ).toEqual( ds.length + 2 );
			});
			
			when('Set the new data and render the control', function() {
				c.findChildControlByID('Rep').setDataSource( [] );
				c.render();
			});

			then('Only one item should be rendered', function() {
				expect( $$( '#container span' ).length ).toEqual( 1 );
			});
			then('Empty item should be rendered', function() {
				expect( $$( '#container span.empty' ).length ).toEqual( 1 );
			});
			then('No footers, headers and data items should be rendered', function() {
				expect( $$( '#container span.footer, #container span.header, #container span.item' ).length ).toEqual( 0 );
			});
			
		});

	});


});
