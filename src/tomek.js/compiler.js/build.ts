/// <reference path="typings/tsd.d.ts" />

import Builder from './builder/Builder';
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

DictionaryProvider.strict = false;

var builder = new Builder( base_dir, config, language );
builder.loadDictionaries();
builder.processMains();
builder.processResources();
