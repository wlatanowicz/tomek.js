var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./compiler/gulp_tasks');

gulp.task('build', ['tomek-build'] );

gulp.task( 'watch', function () {
	gulp.watch( [ './app/**/*' ], [ 'tomek-build' ] );
} );
