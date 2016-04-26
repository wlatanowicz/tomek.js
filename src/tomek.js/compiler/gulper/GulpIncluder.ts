import Compiler from '../compiler/Compiler';
import Includer from  '../builder/Includer';

import glob = require('glob');
import path = require('path') ;
import fs = require('fs');
import md5 = require('md5');
import mkdirp = require('mkdirp');

import uglify = require("uglify-js");

export default class GulpIncluder extends Includer{

	process( source_file:string ){
		console.log( "Processing: "+source_file );
		var contents : string = fs.readFileSync( source_file, "utf8" );
		contents = this.processContents( contents );
		console.log( "  |- include: "+source_file );
		console.log("  \\- done." );
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
		console.log( "  |- include: "+file );
		var contents = fs.readFileSync( file, "utf8" );
		contents = this.processContents( contents );
		return "";
	}

}