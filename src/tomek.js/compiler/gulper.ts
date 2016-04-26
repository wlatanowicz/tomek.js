/// <reference path="typings/tsd.d.ts" />

import GulpBuilder from './gulper/GulpBuilder';
import DictionaryProvider from './dictionary/DictionaryProvider';
import path = require('path');
import minimist = require('minimist');

var argv = minimist(process.argv.slice(2));
var config = require('./../app/application.json');
var base_dir = path.resolve("..");
var language = null;

if ( argv['language'] ){
	language = argv['language'];
}

if ( argv['strict-dictionary'] ){
	DictionaryProvider.strict = true;
}else{
	DictionaryProvider.strict = false;
}

var builder = new GulpBuilder( base_dir, config, language );
builder.loadDictionaries();
builder.cleanupDestination();

if ( argv['one-template'] ){
	builder.processOneTemplate( argv['one-template'] );
}else{
	builder.processMains();
}
