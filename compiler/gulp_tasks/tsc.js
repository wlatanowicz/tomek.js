var gulp = require('gulp');

function compileTypeScript() {
    var exec = require( 'child_process' ).execSync;
    exec('./node_modules/.bin/tsc --project compiler', {stdio:[0,1,2]});
}

gulp.task( 'tomek-tsc', function () {
    compileTypeScript();
} );

gulp.task( 'tomek-check-tsc', function () {
    var fs = require('fs');
    var gutil = require('gulp-util');
    var searchPath = "./compiler/index.js";
    if (! fs.existsSync(searchPath)) {
        gutil.log("Tomek compiler needs compilation");
        compileTypeScript();
    }
} );
