
import Parser from "../parser/Parser";
import Renderer from "../renderer/Renderer";

import path = require('path');
import fs = require('fs');
import glob = require('glob');

export default class Compiler {

	source_paths: string[];
	language: string;
	debug: number;

	constructor( source_paths:string[], debug: number, language: string ) {
		this.source_paths = source_paths;
		this.language = language;
		this.debug = debug;
	}

	compile( source_file: string, target_file: string ) {
		var parser = new Parser();
		var control = parser.parseFile( source_file );
		var control_name = path.basename( source_file, '.tpl' );
		var renderer = new Renderer( control_name, this.source_paths, this.debug, this.language );

		renderer.render( control );

		fs.writeFileSync( target_file, renderer.getOutput(), 'utf8' );
	}

}
