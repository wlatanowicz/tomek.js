import Compiler from '../compiler/Compiler';
import Includer from  './Includer';
import ResourceCopier from  './ResourceCopier';

import glob = require('glob');
import path = require('path');

export default class Builder {

	mains: string[];
	templates: string[];
	resources: string[];
	dictionaries: string[];

	tmp: string;
	base_dir: string;

	app: string;
	framework: string;
	build: string;


	constructor( base_dir:string, config ){
		this.mains = config.mains;
		this.templates = config.templates;
		this.resources = config.resources;
		this.dictionaries = config.dictionaries;
		this.base_dir = base_dir;

		this.tmp = 'tmp';

		this.framework = 'framework';
		this.app = 'app';
		this.build = 'build';
	}

	getSourcePaths(): string[]{
		return [
			path.join(this.base_dir, this.app),
			path.join(this.base_dir, this.framework),
			path.join(this.base_dir, this.tmp)
		];
	}

	compileTemplates(){
		for (let i = 0; i < this.templates.length; i++ ){
			let template_path = this.templates[i];
			let templates = glob.sync(path.join(this.base_dir, this.app, template_path));
			for (let j = 0; j < templates.length; j++ ){
				this.compileTemplate(templates[j]);
			}
		}
	}

	compileTemplate( file:string ){
		let compiler = new Compiler( path.join( this.base_dir, this.tmp ), this.getSourcePaths() );
		compiler.compile(file);
	}

	processMains(){
		for ( let i = 0; i < this.mains.length; i++ ){
			let mains = glob.sync(path.join(this.base_dir, this.app, this.mains[i]));
			for ( let j = 0; j < mains.length; j++ ){
				this.processMain( mains[j] );
			}
		}
	}

	processMain( file:string ){
		var includer = new Includer( this.getSourcePaths() );
		var relPath:string = file.substring( path.join( this.base_dir, this.app ).length );
		var target:string = path.join( this.base_dir, this.build, relPath );
		includer.process( file, target );
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


}