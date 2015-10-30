
import glob = require('glob');
import path = require('path');
import fs = require('fs');

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
			let targetDir = path.dirname(target);
			this.mkdirp(targetDir);

			fs.createReadStream( file ).pipe(fs.createWriteStream( target ));

		}

	}

	mkdirp(dir: string) {
		var baseDir = path.dirname(dir);
		if ( ! fs.existsSync( baseDir ) ){
			this.mkdirp( baseDir );
		}
		if ( ! fs.existsSync( dir ) ){
			fs.mkdirSync(dir);
		}
	}

}