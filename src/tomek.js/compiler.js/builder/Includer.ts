import glob = require('glob');
import path = require('path') ;
import fs = require('fs');

export default class Includer{

	source_paths: string[];

	constructor( source_paths:string[] ){
		this.source_paths = source_paths;
	}

	process( source_file:string, target_file:string ){
		console.log( "Includer: "+source_file+" => "+target_file );
		var contents : string = fs.readFileSync( source_file, "utf8" );
		contents = this.processContents( contents );
		fs.writeFileSync( target_file, contents, "utf8" );
	}

	processContents( contents: string ){
		var regexp = /\/\/= require ["']?([\w\.-]+)["']?/g;
		return contents.replace( regexp, this.replaceCallback.bind(this) );
	}

	replaceCallback( x:string, matches:string ):string{
		var includedFile = matches;
		includedFile += ".js";
		var file = this.findFileByName(includedFile);
		if ( file === null ){
			throw "Cannot find file " + matches;
		}
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



}