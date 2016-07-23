var requireDir = require('require-dir');
var tasks = requireDir('./compiler/gulp_tasks');
var gulp = require('gulp');


gulp.task('build', ['tomek-build'] );
gulp.task('test-create', ['tomek-test-create'] );
gulp.task('test-build', ['tomek-test-build'] );
