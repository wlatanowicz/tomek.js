
import glob = require('glob');
import path = require('path');
import fs = require('fs');
import mkdirp = require('mkdirp');
import fse = require('fs-extra');

export default class ResourceCopier {

	full_app_dir: string;
	full_build_dir: string;
	source_path: string;

	constructor( base_dir:string, app_dir:string, build_dir:string, source_path:string ){
		this.full_app_dir = path.join( base_dir, app_dir );
		this.full_build_dir = path.join( base_dir, build_dir );
		this.source_path = source_path;
	}

	copy(){

		var files = glob.sync(path.join(this.full_app_dir, this.source_path));

		for (let i = 0; i < files.length; i++ ){
			let file = files[i];
			let relPath = file.substr(this.full_app_dir.length);
			let target = path.join(this.full_build_dir, relPath);

			this.doCopy( file, target );

		}

	}
	
	doCopy( src: string, target: string ){
		if ( fs.lstatSync( src ).isDirectory() ){
			this.copyDir( src, target );
		}else
		if ( fs.lstatSync( src ).isFile() ){
			this.copyFile( src, target );
		}else{
			throw "Unsupported resource type: "+src;
		}
	}
	
	copyFile( src: string, target: string ){
		let targetDir = path.dirname( target );
		mkdirp.sync( targetDir );
		fse.copySync( src, target );
	}

	copyDir( src: string, target: string ){
		mkdirp.sync( target );
		var files = fs.readdirSync( src );
		for (let i = 0; i < files.length; i++ ){
			let innerSrc = path.join( src, files[i] );
			let innerTarget = path.join( target, files[i] );
			this.doCopy( innerSrc, innerTarget );
		}
	}

}