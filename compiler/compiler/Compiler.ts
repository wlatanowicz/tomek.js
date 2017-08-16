
import Parser from "../parser/Parser";
import Renderer from "../renderer/Renderer";

import path = require('path');
import fs = require('fs');
import glob = require('glob');
import {Md5} from 'ts-md5/dist/md5';

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
        fs.writeFileSync(target_file, this.compileToStr(source_file), {encoding: "utf8"});
    }

    compileToStr(sourceFile: string): string
    {
        var parser = new Parser();
        var control = parser.parseFile( sourceFile );
        var control_name = path.basename( sourceFile, '.tpl' );
        var renderer = new Renderer( control_name, this.source_paths, this.debug, this.language );

        renderer.render( control );
        return renderer.getOutput();
    }

    compileToStrCached(sourceFile: string, cacheFile: string): string
    {
        let compiled: string = null;
        let md5 = Md5.hashAsciiStr(fs.readFileSync(sourceFile, 'utf-8'));
        let now = new Date();
        let header = {
            "source" : sourceFile,
            "md5" : md5,
            "mtime": fs.statSync(sourceFile).mtime.toISOString(),
            "date" : now.toISOString()
        };
        let headerText = "/*" + JSON.stringify(header) + "*/\n";

        if (fs.existsSync(cacheFile)) {
            let cachedFile = fs.readFileSync(cacheFile).toString('utf-8');
            let firstLine = cachedFile.split("\n", 1)[0];
            if (firstLine.substr(0, 3) == "/*{"
                && firstLine.substr(-3) == "}*/") {


                try{
                    let cachedHeader = JSON.parse(firstLine.substr(2, firstLine.length - 4));
                    if (cachedHeader.source == header.source
                        && cachedHeader.md5 == header.md5
                        && cachedHeader.mtime == header.mtime) {
                        compiled = cachedFile;
                        console.log("  |- template (cached): " + sourceFile);
                    }
                }catch(ex) {
                    compiled = null;
                }

            }
        }

        if (compiled == null) {
            console.log("  |- template (compiled): " + sourceFile);
            compiled = this.compileToStr(sourceFile);
            console.log("  | \\ save compiled template: " + cacheFile);
            fs.writeFileSync(cacheFile, headerText + compiled);
        }
        return compiled;
    }
}
