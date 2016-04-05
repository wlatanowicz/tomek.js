/// <reference path="typings/tsd.d.ts" />

import Builder from './builder/Builder';
import DictionaryProvider from './dictionary/DictionaryProvider';
import path = require('path');
import minimist = require('minimist');

var argv = minimist(process.argv.slice(2));
var config = require('./../test/application.json');
var base_dir = path.resolve("..");

var language = 'en';
DictionaryProvider.strict = true;


var builder = new Builder( base_dir, config, language );
builder.app = 'test';
builder.build = 'test_build';
//builder.loadDictionaries();
builder.cleanupDestination();
builder.processMains();
builder.processResources();
