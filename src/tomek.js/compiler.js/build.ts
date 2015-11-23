/// <reference path="typings/tsd.d.ts" />

import Builder from './builder/Builder';
import path = require('path');

var config = require('./../app/application.json');
var base_dir = path.resolve("..");

var builder = new Builder( base_dir, config );
builder.loadDictionaries();
builder.processMains();
builder.processResources();
