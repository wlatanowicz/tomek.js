import GulpIncluder from  './GulpIncluder';
import Builder from  '../builder/Builder';
import ResourceCopier from  '../builder/ResourceCopier';
import DictionaryLoader from '../dictionary/DictionaryLoader';
import DictionaryProvider from '../dictionary/DictionaryProvider';

import glob = require('glob');
import path = require('path');
import fs = require('fs');

export default class GulpBuilder extends Builder {

	processMain( file:string ){
		var tmp = path.join(this.base_dir, this.tmp);
		var includer = new GulpIncluder( this.getSourcePaths(), tmp, this.language );
		includer.process( file );
	}
	
	processOneTemplate( template:string ){
		console.log( "Processing one template: "+template );
		var tmp = path.join(this.base_dir, this.tmp);
		var includer = new GulpIncluder( this.getSourcePaths(), tmp, this.language );
		var file = includer.findFileByInclude(template);
		console.log( "  |- include: "+file );
		console.log("  \\- done." );
	}

}