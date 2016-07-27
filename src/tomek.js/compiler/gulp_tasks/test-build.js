var gulp = require('gulp');

gulp.task('tomek-test-build', function () {
	var path = require('path');
	var minimist = require('minimist');
	var Builder = require('./../builder/Builder');
	var DictionaryProvider = require('./../dictionary/DictionaryProvider');
	
	var argv = minimist(process.argv.slice(2));
	var config = require('./../../test/application.json');
	var base_dir = path.resolve(".");
	var language = 'en';
	DictionaryProvider["default"].strict = true;
	var builder = new Builder["default"](base_dir, config, language);
	builder.app = 'test';
	builder.build = 'test_build';
	//builder.loadDictionaries();
	builder.cleanupDestination();
	builder.processMains();
	builder.processResources();
});