import Includer from  './Includer';
import ResourceCopier from  './ResourceCopier';
import DictionaryLoader from '../dictionary/DictionaryLoader';
import DictionaryProvider from '../dictionary/DictionaryProvider';

import glob = require('glob');
import path = require('path');
import fs = require('fs');
import mkdirp = require('mkdirp');

export default class Builder {

	mains: string[];
	templates: string[];
	resources: string[];
	dictionaries: string[];
	dictionary_function: string;

	language: string;

	tmp: string;
	base_dir: string;

	app: string;
	framework: string;
	lib: string;
	
	build: string;

	minify: boolean;
	debug: number;

	constructor( base_dir: string, config, language:string = null ){
		this.mains = config.mains;
		this.resources = config.resources || [];
		this.dictionaries = config.dictionaries || [];
		this.dictionary_function = config.dictionary_function || null;
		this.build = config.target || 'build';
		
		this.base_dir = base_dir;

		this.language = language;

		this.tmp = 'tmp';

		this.framework = 'framework';
		this.app = 'app';
		this.lib = 'lib';

		this.minify = false;
		this.debug = 0;
	}

	getSourcePaths(): string[]{
		return [
			path.join(this.base_dir, this.app),
			path.join(this.base_dir, this.framework),
			path.join(this.base_dir, this.lib)
		];
	}

	loadDictionaries(){
		for (let i = 0; i < this.dictionaries.length; i++ ){
			let dict_path = this.dictionaries[i];
			let dicts = glob.sync(path.join(this.base_dir, this.app, dict_path));
			for (let j = 0; j < dicts.length; j++ ){
				this.loadDictionary(dicts[j]);
			}
		}
		
		if ( this.dictionary_function ){
			var dp = new DictionaryProvider();
			var dict = dp.getDynamicDictionary();
			dict.setTranslateFunction( this.dictionary_function );
		}
	}

	loadDictionary( path:string ){
		var dl = new DictionaryLoader();
		dl.loadXml( path );
	}

	processMains(){
		for (let source in this.mains){
			let sourceFile = path.join(this.base_dir, this.app, source);
			let targetFile = path.join(this.base_dir, this.build, this.mains[source]);
			this.processMain(sourceFile, targetFile);
		}
	}

	processMain( file:string, target:string ){
		var browserify = require("browserify");
		var pathmodify = require('pathmodify');

		mkdirp.sync( path.dirname( target ) );

		var bundleFs = fs.createWriteStream(target);

		var options = require(path.join(this.base_dir, this.app, "tsconfig.json")).compilerOptions;

		options.baseUrl = this.base_dir;

		let pathmodifyOptions = {
			mods: [
				pathmodify.mod.dir('@app', path.join(this.base_dir, this.app)),
				pathmodify.mod.dir('@framework', path.join(this.base_dir, this.framework)),
			]
		};

		browserify()
            .add(file)
			.plugin(pathmodify, pathmodifyOptions)
            .plugin("tsify", options)
            .bundle()
            .pipe(bundleFs);
	}

	processResources(){
		for (let i = 0; i < this.resources.length; i++ ){
			this.processResource(this.resources[i]);
		}
	}

	processResource( path:string ){
		var rc = new ResourceCopier( this.base_dir, this.app, this.build, path );
		rc.copy();
	}
	
	cleanupDestination(){
		var dest = path.join( this.base_dir, this.build );
		this.rmDir( dest, false );
	}
	
	rmDir( dirPath, includeCurrent ){
		try {
			var files = fs.readdirSync(dirPath);
		}catch(e){
			return;
		}
		if ( files.length > 0 ){
			for (var i = 0; i < files.length; i++) {
				var filePath = dirPath + '/' + files[i];
				if ( fs.statSync( filePath ).isFile() ){
					fs.unlinkSync( filePath );
				}else{
					this.rmDir( filePath, true );
				}
			}
		}
		if ( includeCurrent ){
			fs.rmdirSync( dirPath );
		}
    };


}