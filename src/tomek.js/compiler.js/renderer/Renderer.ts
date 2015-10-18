import DocumentNode from "../template/DocumentNode";
import TemplateNode from "../template/TemplateNode";
import StencilNode from "../template/StencilNode";
import ComponentNode from "../template/ComponentNode";

import BaseRenderer from "./BaseRenderer";
import StencilRenderer from "./StencilRenderer";


export default class Renderer extends BaseRenderer {

	dependencies: string[];
	controlName: string;

	constructor( controlName:string ){
		super();
		this.controlName = controlName;
		this.dependencies = [];
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
			this.addOutput( this.getVarname( node )+".attachEvent( \""+event.event+"\", "+event.boundFunction+" );" );
		}

		var r = new StencilRenderer(node);
		r.render();
		if ( r.output.length > 0 ){
			this.addOutput(this.getVarname(node) + ".renderTemplateChildControls = function( placeholder ){");
			this.addOutput(r.output);
			this.addOutput("}");
		}

		for (let i = 0; i < node.children.length; i++ ){
			let child = node.children[i];
			if ( child instanceof StencilNode ){
				this.addOutput(this.getVarname(node) + ".set" + child.propertyName + "Tmplate( function( item ){");
				this.pushIndent();
				this.addOutput("var ExpressionContext = item;\n");
				this.renderInitializers(child);
				this.popIndent();
				this.addOutput("} );");
			}
		}

	}

	getOutput() {

		var txt: string = "";

		for (var i = 0; i < this.dependencies.length; i++ ){
			var dependency = this.dependencies[i];
			if ( dependency !== this.controlName ){

				if ( false ){ //@TODO
					txt += "//= require \"" + dependency + "-tpl\"\n";
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

	addDependency(dependency:string){
		for (var i = 0; i < this.dependencies.length;i++){
			if ( this.dependencies[i] == dependency ){
				return;
			}
		}
		this.dependencies.push(dependency);
	}

}