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
		this.dependencies = [];
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

		this.addOutput( "var "+ this.getVarname(node) + " = new " + node.classname + "( " + this.getAttributesJson(node) + " );" );
		this.addOutput(init_in + ".addTemplateChildControl( \"" + this.getVarname(node) + "\", " + this.getVarname(node) + " );" );

		for (let i = 0; i < node.events.length; i++ ){
			let event = node.events[i];
			if ( this.debug >= 1 ){
				this.addOutput( "if ( " + event.getFunction()+" ) {" );
				this.pushIndent();
			}
			this.addOutput( this.getVarname(node) + ".attachEvent( \"" + event.event + "\", " + event.getBoundFunction()+" );" );
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
				this.addOutput(this.getVarname(node) + ".set" + child.propertyName + "Template( function( item ){");
				this.pushIndent();
				this.addOutput("var ExpressionContext = item;\n");
				this.renderInitializers(child);
				this.popIndent();
				this.addOutput("} );");
			}
		}

		this.renderInitializers(node);

	}

	getOutput() {

		var txt: string = "";

		for (var i = 0; i < this.dependencies.length; i++ ){
			var dependency = this.dependencies[i];
			if ( dependency !== this.controlName ){

				if ( this.existsFileByName( dependency + ".tpl" ) ){ //@TODO
					txt += "//= require \"" + dependency + ".tpl\"\n";
				} else {
					txt += "//= require \"" + dependency + "\"\n";
				}

			}
		}

		txt += "\n";
		txt += "//= require \"" + this.controlName + "\"\n";
		txt += "\n";

		txt += this.controlName+".prototype.createChildControls = function(){\n" +
				"\tvar ExpressionContext = this;\n" +
				"\tvar SourceTemplateControl = this;\n" +
				this.output +
				"};\n";

		return txt;

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