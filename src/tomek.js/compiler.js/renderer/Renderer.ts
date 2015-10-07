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

	}

}