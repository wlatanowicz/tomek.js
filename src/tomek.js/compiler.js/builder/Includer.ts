import glob = require('glob');
import path = require('path') ;
import fs = require('fs');

export default class Includer{

	source_paths: string[];

	included: string[];

	constructor( source_paths:string[] ){
		this.source_paths = source_paths;
		this.included = [];
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

	replaceCallback( x:string, matches:string ):string{
		var includedFile = matches;
		includedFile += ".js";

		if ( this.isIncluded( includedFile ) ){
			return "";
		}

		this.included.push( includedFile );

		var file = this.findFileByName(includedFile);
		if ( file === null ){
			throw "Cannot find file " + matches;
		}
		console.log( "  |- "+file );
		var contents = fs.readFileSync( file, "utf8" );
		contents = this.processContents( contents );
		return contents;
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


}