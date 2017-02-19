var gulp = require('gulp');

gulp.task('tomek-test-build', ['tomek-check-tsc'], function () {
	var path = require('path');
	var minimist = require('minimist');
	var fs = require('fs');
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

    var testList = fs.readdirSync('./test/tests');
    var regexp = new RegExp('^[0-9]{3}_.+');
    testList = testList.filter(function (e) {
		return regexp.test(e);
	});

    var js = "var TESTS = " + JSON.stringify(testList) + ";";

    fs.writeFileSync(
    	base_dir + "/" + builder.build + "/" + "test_list.js",
    	js
	);
});
