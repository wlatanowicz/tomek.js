/// <reference path="typings/tsd.d.ts" />

import Builder from './builder/Builder';
import DictionaryProvider from './dictionary/DictionaryProvider';
import path = require('path');
import minimist = require('minimist');

var argv = minimist(process.argv.slice(2));
var config = require('./../app/application.json');
var base_dir = path.resolve("..");
var language:string = null;
var minify = true;
var debug_level = 0;

if ( argv['language'] ){
	language = argv['language'];
}

if ( argv['strict-dictionary'] ){
	DictionaryProvider.strict = true;
}else{
	DictionaryProvider.strict = false;
}

if ( argv['minify'] === false ){
	minify = false;
}

if ( argv['debug'] === true ){
	debug_level = 3;
	minify = false;
}

if ( argv['debug-level'] > 0 ){
	debug_level = argv['debug-level'];
	minify = false;
}

var builder = new Builder( base_dir, config, language );
builder.minify = minify;
builder.debug = debug_level;
builder.loadDictionaries();
builder.cleanupDestination();
builder.processMains();
builder.processResources();
