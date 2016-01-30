/// <reference path="typings/tsd.d.ts" />

import Builder from './builder/Builder';
import DictionaryProvider from './dictionary/DictionaryProvider';
import path = require('path');
import minimist = require('minimist');

var argv = minimist(process.argv.slice(2));
var config = require('./../app/application.json');
var base_dir = path.resolve("..");
var language = null;
var minify = true;

if ( argv['language'] ){
	language = argv['language'];
}

if ( argv['strict-dictionary'] ){
	DictionaryProvider.strict = true;
}else{
	DictionaryProvider.strict = false;
}

if ( argv['minify'] === false
	|| argv['debug'] == true ){
	minify = false;
}

var builder = new Builder( base_dir, config, language );
builder.minify = minify;
builder.loadDictionaries();
builder.cleanupDestination();
builder.processMains();
builder.processResources();
