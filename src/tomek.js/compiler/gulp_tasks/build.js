var gulp = require('gulp');

gulp.task('tomek-build', function () {
	var Builder = require('./../builder/Builder');
	var DictionaryProvider = require('./../dictionary/DictionaryProvider');
	var path = require('path');
	var minimist = require('minimist');
	
	var argv = minimist(process.argv.slice(2));
	var config = require('./../../app/application.json');
	var base_dir = path.resolve(".");

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
	builder.minify = minify;
	builder.debug = debug_level;
	builder.loadDictionaries();
	builder.cleanupDestination();
	builder.processMains();
	builder.processResources();
});