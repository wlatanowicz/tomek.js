var gulp = require('gulp');

gulp.task('tomek-compile', [], function(){
    var glob = require("glob");
    var path = require('path');
    var Compiler = require('./../compiler/Compiler').default;

    var base_dir = path.resolve(".");
    var files = glob.sync(path.join(base_dir, "app", '**', "*.tpl"));

    var source_paths = [
        path.join(base_dir, "app"),
        path.join(base_dir, "framework")
    ];

    for (var i=0; i<files.length; i++) {
        var compiler = new Compiler( source_paths, 0, 'en');
        console.log( "  |- template (compiled): "+files[i]+" => "+files[i]+".ts" );
        compiler.compile(files[i], files[i]+".ts");
    }
});

gulp.task('tomek-build', ['tomek-check-tsc'], function (done) {
	var Builder = require('./../builder/Builder');
	var DictionaryProvider = require('./../dictionary/DictionaryProvider');
    var Compiler = require('./../compiler/Compiler').default;
	var path = require('path');
	var minimist = require('minimist');
	
	var argv = minimist(process.argv.slice(2));
	var base_dir = path.resolve(".");
    var config_file = path.join(base_dir, 'app', 'application.json');
    var config = require(config_file);

    var source_paths = [
        path.join(base_dir, "app"),
        path.join(base_dir, "framework")
    ];

	var language = null;
	var minify = true;
	var debug_level = 0;
	
	if (argv['language']) {
		language = argv['language'];
	}
	if (argv['strict-dictionary']) {
		DictionaryProvider["default"].strict = true;
	}
	else {
		DictionaryProvider["default"].strict = false;
	}
	if (argv['minify'] === false) {
		minify = false;
	}
	if (argv['debug'] === true) {
		debug_level = 3;
		minify = false;
	}
	if (argv['debug-level'] > 0) {
		debug_level = argv['debug-level'];
		minify = false;
	}
	
	var builder = new Builder["default"]( base_dir, config, language );
	builder.compiler = new Compiler( source_paths, 0, 'en');

    builder.minify = minify;
	builder.debug = debug_level;
	builder.loadDictionaries();
	builder.cleanupDestination();
	builder.processMains(function(){
		done();
	});
	builder.processResources();
});
