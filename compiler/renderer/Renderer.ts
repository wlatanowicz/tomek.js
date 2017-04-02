import DocumentNode from "../template/DocumentNode";
import TemplateNode from "../template/TemplateNode";
import StencilNode from "../template/StencilNode";
import ComponentNode from "../template/ComponentNode";

import BaseRenderer from "./BaseRenderer";
import StencilRenderer from "./StencilRenderer";

import glob = require('glob');
import path = require('path');

export default class Renderer extends BaseRenderer {

	dependencies: string[];
	controlName: string;

	source_paths: string[];

	constructor( controlName:string, source_paths:string[], debug: number, language:string ){
		super( debug, language );
		this.controlName = controlName;
		this.dependencies = [
			"TExpression"
		];
		this.source_paths = source_paths;
	}

	render(doc:DocumentNode){
		this.renderInitializers(doc);
	}

	renderInitializers(node:TemplateNode){
		for (var i = 0; i < node.children.length;i++){
			var child = node.children[i];
			if ( child instanceof ComponentNode ){
				this.renderInitializer(child);
			}
			else if ( child instanceof StencilNode ){
				//skip
			}
			else {
				this.renderInitializers(child);
			}
		}
	}

	renderInitializer(node:ComponentNode){

		var init_in:string = "this";
		var parent_component: TemplateNode = node.parent;

		this.addDependency(node.classname);

		while ( parent_component !== null
			&& ! ( parent_component instanceof ComponentNode || parent_component instanceof StencilNode )){
			parent_component = parent_component.parent;
		}

		if ( parent_component !== null
			&& parent_component.getVariableName() != 'placeholder' ){
			init_in = this.getVarname(parent_component);
		}

		if (node.classname[0] == '_') {
			this.addOutput("var " + this.getVarname(node) + " = ServiceContainer.get(\"" + (node.classname.substr(1)) + "\");");
		} else {
			this.addOutput("var " + this.getVarname(node) + " = new " + node.classname + "();");
		}

		for (let i = 0; i < node.attributes.length;i++){
			let a = node.attributes[i];
			this.addOutput(this.getVarname(node) + "." + a.name + " = " + a.value.getExpression( this.language ) ) + ";";
		}
		this.addOutput(init_in + ".addTemplateChildControl( \"" + this.getVarname(node) + "\", " + this.getVarname(node) + " );" );

		for (let i = 0; i < node.events.length; i++ ){
			let event = node.events[i];
			if ( this.debug >= 1 ){
				this.addOutput( "if ( " + event.getFunction()+" ) {" );
				this.pushIndent();
			}
			this.addOutput( this.getVarname(node) + ".event.attach( \"" + event.event + "\", " + event.getBoundFunction()+" );" );
			if ( this.debug >= 1 ){
				this.popIndent();
				this.addOutput( "} else {" );
				this.pushIndent();
				this.addOutput( "throw new TException( \"Cannot attach event in control "+this.controlName+": function "+event.getFunction()+" does not exist. \" );" );
				this.popIndent();
				this.addOutput( "}" );
			}
		}

		var r = new StencilRenderer( node, this.debug, this.language );
		r.render();
		if ( r.output.length > 0 ){
			this.addOutput(this.getVarname(node) + ".renderTemplateChildControls = function( placeholder ){");
			this.addOutput(r.output);
			this.addOutput("};");
		}

		for (let i = 0; i < node.children.length; i++ ){
			let child = node.children[i];
			if ( child instanceof StencilNode ){
				this.addOutput(this.getVarname(node) + "." + child.propertyName + "Template = function( item ){");
				this.pushIndent();
				this.addOutput("var ExpressionContext = item;\n");
				this.renderInitializers(child);
				this.popIndent();
				this.addOutput("};");
			}
		}

		this.renderInitializers(node);

	}

	getOutput() {

		var txt: string = "";

		let imports = this.getImports();

		for (let i in imports) {
			txt += "import " + i + " from " + '"' + imports[i] + '"' + ";\n";
		}

		txt += "\n";

		txt += "export default function template()\n" +
				"{\n" +
				"\tvar ExpressionContext = this;\n" +
				"\tvar SourceTemplateControl = this;\n" +
				this.output +
				"}\n";

		return txt;

	}

	getImports() {
		var imports = {};
		for (var i = 0; i < this.dependencies.length; i++ ){
			var dependency = this.dependencies[i];
			if (dependency[0] === '_') {
			    this.dependencies.push('ServiceContainer');
            }
            else if (dependency !== this.controlName && !imports[dependency]) {
				imports[dependency] = this.findImportForDependency(dependency);
			}
		}
		return imports;
	}

	findImportForDependency(module: string): string{
		var candidates = []
		for (let i=0; i<this.source_paths.length; i++) {
			let files = glob.sync(path.join(this.source_paths[i], "**", module+".ts"));
			candidates = candidates.concat(files);
		}

		if (candidates.length === 1) {
			return candidates[0].slice(0, -3);
		}

		if (candidates.length > 1) {
			throw "Too many candidates for " + module;
		}

		throw "No candidates for " + module;
	}

	existsFileByName( filename:string ):boolean{
		var file: string = null;
		for (let i = 0; i < this .source_paths.length; i++ ){						
			let files = glob.sync(path.join(this.source_paths[i], '**', filename));
				if (files.length > 0 ){
				return true;
			}
		}
		return false;
	}

	addDependency(dependency:string){
		for (var i = 0; i < this.dependencies.length;i++){
			if ( this.dependencies[i] == dependency ){
				return;
			}
		}
		this.dependencies.push(dependency);
	}

}