
import Parser from "../parser/Parser";
import Renderer from "../renderer/Renderer";

import path = require('path');
import fs = require('fs');
import glob = require('glob');

export default class Compiler {

	destination_dir: string;
	source_paths: string[];

	construcor( destination_dir:string, source_paths:string[] ) {
		this.destination_dir = destination_dir;
		this.source_paths = source_paths;
	}

	compile(source_file: string ) {
		var parser = new Parser();
		var control = parser.parseFile( source_file );

		var control_name = path.basename( source_file, '.tpl' );

		var renderer = new Renderer( control_name );
		renderer.render( control );

		var destination_path = path.join(this.destination_dir, control_name + "-tpl.js");

		fs.writeFileSync( destination_path, renderer.getOutput(), 'utf8' );
	}

}
