var requireDir = require('require-dir');
var tasks = requireDir('./compiler/gulp_tasks');
var gulp = require('gulp');
var exec = require( 'child_process' ).exec;


gulp.task('build', ['tomek-build'] );
gulp.task('test-create', ['tomek-test-create'] );
gulp.task('test-build', ['tomek-test-build'] );

gulp.task( 'watch', function () {
	gulp.watch( [ './app/**/*' ], [ 'tomek-build' ] );
} );


gulp.task( 'tsc', function ( cb ) {
	exec( './node_modules/tsc/bin/tsc --module commonjs compiler/*.ts', {
		encoding : 'utf8',
		timeout : 0,
		maxBuffer : 1000 * 1024,
		killSignal : 'SIGTERM',
		cwd : null,
		env : null
	}, function ( err, stdout, stderr ) {
		console.log( stdout );
		console.log( stderr );
		cb( err );
	} );

} );