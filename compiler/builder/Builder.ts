import Includer from  './Includer';
import ResourceCopier from  './ResourceCopier';
import DictionaryLoader from '../dictionary/DictionaryLoader';
import DictionaryProvider from '../dictionary/DictionaryProvider';

import glob = require('glob');
import path = require('path');
import fs = require('fs');
import mkdirp = require('mkdirp');
import Compiler from "../compiler/Compiler";

export default class Builder {

    mains: string[];
    templates: string[];
    resources: string[];
    dictionaries: string[];
    dictionary_function: string;

    language: string;

    tmp: string;
    base_dir: string;

    app: string;
    framework: string;
    lib: string;

    build: string;

    minify: boolean;
    debug: number;

    compiler: Compiler;

    constructor( base_dir: string, config, language:string = null, debug_level: number = 0 ){
        this.mains = config.mains;
        this.resources = config.resources || [];
        this.dictionaries = config.dictionaries || [];
        this.dictionary_function = config.dictionary_function || null;
        this.build = config.target || 'build';

        this.base_dir = base_dir;

        this.language = language;

        this.tmp = 'tmp';

        this.framework = 'framework';
        this.app = 'app';
        this.lib = 'lib';

        this.minify = false;
        this.debug = debug_level;

        this.compiler = null;
    }

    getSourcePaths(): string[]{
        return [
            path.join(this.base_dir, this.app),
            path.join(this.base_dir, this.framework),
            path.join(this.base_dir, this.lib)
        ];
    }

    getCompiler(): Compiler
    {
        if (this.compiler === null) {
            this.compiler = new Compiler(this.getSourcePaths(), this.debug, this.language);
        }
        return this.compiler;
    }

    loadDictionaries(){
        for (let i = 0; i < this.dictionaries.length; i++ ){
            let dict_path = this.dictionaries[i];
            let dicts = glob.sync(path.join(this.base_dir, this.app, dict_path));
            for (let j = 0; j < dicts.length; j++ ){
                this.loadDictionary(dicts[j]);
            }
        }

        if ( this.dictionary_function ){
            var dp = new DictionaryProvider();
            var dict = dp.getDynamicDictionary();
            dict.setTranslateFunction( this.dictionary_function );
        }
    }

    loadDictionary( path:string ){
        var dl = new DictionaryLoader();
        dl.loadXml( path );
    }

    processMains(done: Function){
        let mainCount = 0;
        let finishedCount = 0;
        let mains = {};

        for (let source in this.mains) {
            if (typeof source == 'number' || source.match(/[0-9]+/)) {
                let extended = glob.sync(path.join(this.base_dir, this.app, this.mains[source]));
                for (let j = 0; j < extended.length; j++) {
                    let source = extended[j];
                    source = source.substr(path.join(this.base_dir, this.app).length)
                    mains[source] = source.replace(/\.ts$/, ".js");
                }
            } else {
                mains[source] = this.mains[source];
            }
        }

        for (let source in mains){
            mainCount++;
        }
        if (finishedCount >= mainCount) {
            done();
        }

        for (let source in mains){
            let sourceFile = path.join(this.base_dir, this.app, source);
            let targetFile = path.join(this.base_dir, this.build, mains[source]);
            this.processMain(sourceFile, targetFile, function () {
                finishedCount++;
                if (finishedCount >= mainCount) {
                    done();
                }
            });
        }
    }

    processMain( file:string, target:string, done: Function){
        console.log("  |- bundle (webpack): " + file + " => " + target);

        var webpack = require("webpack");

        var pluginList = [];
        if (this.minify) {
            pluginList.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
        }

        var builder = this;
        var webpackConfig = {
            entry: file, //"./app/hello_world/main.ts",
            output: {
                filename: path.basename(target),//"main.js",
                path: path.dirname(target)//__dirname + "/build/hello_world/"
            },

                // Enable sourcemaps for debugging webpack's output.
            devtool: "source-map",

            resolve: {
                // Add '.ts' and '.tsx' as resolvable extensions.
                extensions: [".ts"],
//                root: path.resolve(__dirname),
                alias: {
                    "@app": path.resolve('./app'),
                    "@framework": path.resolve('./framework'),
                    "@tests": path.resolve('./test/tests')
                }
            },

            module: {
                loaders: [
                    // All files with a '.ts' extension will be handled by 'ts-loader'.
                    {
                        test: /\.ts$/,
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    },

                    {
                        test: /\.tpl$/,
                        loader: "webpack-callback-loader",
                        query: {
                            callback: function (src) {
                                var path = this.resourcePath;
                                return builder.getCompiler().compileToStrCached(path, path + ".ts");
                            }
                        }
                    },

                    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                    {
                        enforce: "pre",
                        test: /\.js$/,
                        loader: "source-map-loader"
                    }
                ]
            },

            plugins: pluginList
        };


        webpack(webpackConfig, function(err, stats) {
            done();
            if (err) {
                throw err;
            }
            if (stats.hasErrors()) {
                var jsonStats = stats.toJson();
                console.log(jsonStats.errors);
            }
        });
    }

    processResources(){
        for (let i = 0; i < this.resources.length; i++ ){
            this.processResource(this.resources[i]);
        }
    }

    processResource( path:string ){
        var rc = new ResourceCopier( this.base_dir, this.app, this.build, path );
        rc.copy();
    }

    cleanupDestination(){
        var dest = path.join( this.base_dir, this.build );
        this.rmDir( dest, false );
    }

    rmDir( dirPath, includeCurrent ){
        try {
            var files = fs.readdirSync(dirPath);
        }catch(e){
            return;
        }
        if ( files.length > 0 ){
            for (var i = 0; i < files.length; i++) {
                var filePath = dirPath + '/' + files[i];
                if ( fs.statSync( filePath ).isFile() ){
                    fs.unlinkSync( filePath );
                }else{
                    this.rmDir( filePath, true );
                }
            }
        }
        if ( includeCurrent ){
            fs.rmdirSync( dirPath );
        }
    };


}