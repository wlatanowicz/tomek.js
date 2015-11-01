import Compiler from '../compiler/Compiler';

import glob = require('glob');
import path = require('path') ;
import fs = require('fs');
import md5 = require('md5');

export default class Includer{

	source_paths: string[];
	tmp: string;
	language: string;

	included: string[];
	compiled;

	constructor( source_paths:string[], tmp: string, language: string ){
		this.source_paths = source_paths;
		this.included = [];
		this.compiled = {};
		this.tmp = tmp;
	}

	process( source_file:string, target_file:string ){
		console.log( "Includer: "+source_file+" => "+target_file );
		var contents : string = fs.readFileSync( source_file, "utf8" );
		contents = this.processContents( contents );
		console.log("  \\- END" );
		fs.writeFileSync( target_file, contents, "utf8" );
	}

	processContents( contents: string ){
		var regexp = /\/\/= require ["']?([\w\.-]+)["']?/g;
		return contents.replace( regexp, this.replaceCallback.bind(this) );
	}

	replaceCallback( x:string, includedFile:string ):string{

		if ( this.isIncluded( includedFile ) ){
			return "";
		}

		this.included.push( includedFile );

		var file = this.findFileByInclude(includedFile);
		if ( file === null ){
			throw "Cannot find file " + includedFile;
		}
		console.log( "  |- "+file );
		var contents = fs.readFileSync( file, "utf8" );
		contents = this.processContents( contents );
		return contents;
	}

	findFileByInclude( includename:string ):string{
		var filename = includename;
		if ( filename.slice( -4 ) == '-tpl' ){
			//change old -tpl notation to new .tpl
			filename = filename.slice(0, -4) + ".tpl";
		}

		if ( filename.slice( -4 ) != '.tpl'
			&& filename.slice( -3 ) != '.js' ){
			filename += '.js';
		}

		if ( filename.slice(-3) == '.js' ){
			return this.findFileByName(filename);
		}

		if ( filename.slice(-4) == '.tpl' ){
			return this.findCompiledTemplate(filename);
		}

		return null;

	}

	findFileByName( filename:string ):string{
		var file: string = null;
		for (let i = 0; i < this.source_paths.length; i++ ){						
			let files = glob.sync(path.join(this.source_paths[i], '**', filename));
			if ( files.length > 0 ){
				return files[0];
			}
		}
		return null;
	}


	isIncluded( filename: string ){
		for (let i = 0; i < this.included.length; i++ ){
			if ( this.included[i] == filename ){
				return true;
			}
		}
		return false;
	}

	findCompiledTemplate(name:string){
		var key = name;
		if ( this.language != null ){
			key += "." + this.language;
		}

		if ( this.compiled[key] ){
			return this.compiled[key];
		}

		var file = this.findFileByName(name);

		if ( file != null ){
			let chksum = md5(file).substring( 0, 10 );
			let target_file = path.join(this.tmp, key + "."+chksum+".js" );
 			let compiler = new Compiler( this.source_paths );
			compiler.compile(file, target_file);
			this.compiled[key] = target_file;
			return target_file;
		}

		return null;

	}


}