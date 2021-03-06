
Event.observe( window, 'load', onLoad );

function onLoad(){
	bindTestList();
}

function bindTestList(){
	var txt = '';
	
	for ( var j=0; j<TESTS.length; j++ ){
		
		var t = TESTS[j]
		
		txt += '<li>'
		txt += '<a id="test_link_'+t+'" href="#'+t+'" onclick="runTest( \''+t+'\' ); return false;">'
		txt += t
		txt += '</a>'
		txt += ' <span id="result_ph_'+t+'"></span>'
		txt += '</li>'

	}
	
	$( 'test_list' ).update( txt );
	updateSummary();
}

function autoRun(){
	runTest( TESTS[0], true );
}

function runTest( test, autocontinue ){
	var next_test = null;
	
	if ( autocontinue ){
		for ( var i=0; i<TESTS.length; i++ ){
			if ( TESTS[i] == test && (i+1)<TESTS.length ){
				next_test = TESTS[i+1];
				break;
			}
		}
	}

	highlightCurrentTest( test );
	updateSummary();
	
	Event.stopObserving( 'test_place', 'load' );
	Event.observe( 'test_place', 'load', checkCurrentTest.bind( this, test, next_test ) );
	$( 'test_place' ).src = 'tests/'+test+'/index.html';
}

function highlightCurrentTest( test ){
	$$( '.test_current' ).each( function(n){
		n.removeClassName( 'test_current' );
	});
	
	$( 'test_link_'+test ).className = 'test_current';
	
	if ( ! $( 'result_ph_'+test ).hasClassName( 'test_wait' ) ){
		$( 'result_ph_'+test ).className = 'test_wait';
	}
	
	if ( $( 'result_ph_'+test ).hasClassName( 'test_wait2' ) ){
		$( 'result_ph_'+test ).removeClassName( 'test_wait2' );
	}else{
		$( 'result_ph_'+test ).addClassName( 'test_wait2' );
	}
}

function testFinished( test, next_test, result ){
	
	if ( result == 'ok' ){
		$( 'result_ph_'+test ).className = 'test_ok';
	}
	if ( result == 'fail' ){
		$( 'result_ph_'+test ).className = 'test_fail';
	}
	if ( result == 'error' ){
		$( 'result_ph_'+test ).className = 'test_error';
	}
	
	updateSummary();
	
	if ( next_test ){
		highlightCurrentTest( next_test );
		setTimeout( runTest.bind( this, next_test, true ), 500 );
	}
}

function checkCurrentTest( test, next_test, depth ){
	
	if ( ! depth ){
		depth = 0;
	}
	
	var passes = [];
	var fails = [] 

	var f = $( 'test_place' );
	var fb = $( f.contentWindow.document.body );
	
	if ( fb ){
		passes = fb.select( ".runner.passed" );
		fails = fb.select( ".runner.failed" );
	}
	
	if ( fails.length == 1 && passes.length == 0 ){
		testFinished( test, next_test, 'fail' );
	}else
	if ( passes.length == 1 && fails.length == 0 ){
		testFinished( test, next_test, 'ok' );
	}else
	if ( depth > 50 ){
		testFinished( test, next_test, 'error' );
	}else{
		highlightCurrentTest( test );
		setTimeout( checkCurrentTest.bind( this, test, next_test, parseInt( depth, 10 )+1 ), 150 );
	}
	
}

function updateSummary(){
	var txts = [];
	var txts2 = [];
	txts.push( 'Tests: ' + TESTS.length );
	txts.push( 'Runned: ' + $$( '.test_ok,.test_fail,.test_error' ).length );
	txts2.push( 'Passed: ' + $$( '.test_ok' ).length );
	txts2.push( 'Failed: ' + $$( '.test_fail' ).length );
	txts2.push( 'Errors: ' + $$( '.test_error' ).length );
	$( 'summary' ).update( txts.join( " | " ) + "<br/>" + txts2.join( " | " ) );
}