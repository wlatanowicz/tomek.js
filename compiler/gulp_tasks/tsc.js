var gulp = require('gulp');

gulp.task( 'tsc', function () {
    var exec = require( 'child_process' ).execSync;
    exec('./node_modules/tsc/bin/tsc --project compiler', {stdio:[0,1,2]});
} );
