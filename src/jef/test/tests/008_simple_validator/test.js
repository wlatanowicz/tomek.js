var x;

component( 'TRepeater', function(){
	feature('Empty TRepeater test', function() {
		summary(
			'Tests if repeater behaves corectly when no data passed'
		);

		scenario('Render repeater without data', function() {
			var c;
			var ds = [
					['a','b','c'],
					['A','B','C'],
					['1','2','3'],
					['!','@','#']
				];
			$( 'container' ).update('');

			given('Create new template with nested repeaters and bind 2-dim array to repeater', function() {
				c = new TTestControl008( { 'Placeholder' : 'container' } );
				x =c ;
				//c.findChildControlByID('Rep').setDataSource( ds );
			});
			
			when('Render the control', function() {
				c.render();
			});
			
			then('count(ds) items should be rendered', function() {
				expect( $$( '#container .item' ).length ).toEqual( ds.length );
			});
			then('sum( count(ds[i]) over i ) inner items should be rendered', function() {
				var total = 0;
				for ( var i=0; i<ds.length; i++ ){
					total += ds[i].length;
				}
				expect( $$( '#container .inneritem' ).length ).toEqual( total );
			});
			
			then('Inner items should be rendered with proper texts', function() {
				for ( var i=0; i<ds.length; i++ ){
					for ( var j=0; j<ds[i].length; j++ ){
						var els = $$( '#container #item_'+i+' .inneritem_'+j );
						expect( els.length ).toEqual( 1 );
						expect( els[0].innerHTML ).toEqual( 'Item_'+ds[i][j] );
					}
				}
			});
			
		});
	});
	
});
