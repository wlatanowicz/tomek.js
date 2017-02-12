import BaseRenderer from "./BaseRenderer";
import TemplateNode from "../template/TemplateNode";
import HtmlNode from "../template/HtmlNode";
import ComponentNode from "../template/ComponentNode";
import TextNode from "../template/TextNode";
import StencilNode from "../template/StencilNode";

import Attribute from '../template/Attribute';

export default class StencilRenderer extends BaseRenderer {

	root:TemplateNode;

	constructor(node:TemplateNode, debug: number, language: string ){
		super( debug, language );
		this.root = node;
	}

	render(){
		this.renderRenderers(this.root);
	}

	renderRenderers(node:TemplateNode){
		for (let i = 0; i < node.children.length; i++ ){
			let child = node.children[i];

			if ( child instanceof HtmlNode ){
				this.renderHtmlNode(child);
			}
			else if ( child instanceof ComponentNode ){
				this.renderComponentNode(child);
			}
			else if ( child instanceof StencilNode ){
				//skip
			}
			else if ( child instanceof TextNode ){
				this.renderTextNode(child);
			}
			else {
				//render_initializers?
			}

		}
	}

	renderHtmlNode( node:HtmlNode ){
		var render_in = "placeholder";
		if ( node.parent !== this.root ){
			render_in = this.getVarname( node.parent );
		}

		if ( node.namespace !== null ){
			this.addOutput( "var " + this.getVarname(node) + " = document.createElementNS( \"" + node.namespace + "\", \"" + node.tag + "\" );" );
		} else {
			this.addOutput( "var " + this.getVarname(node) + " = document.createElement( \"" + node.tag + "\" );" );
		}

		for (let i = 0; i < node.attributes.length; i++ ){
			let attribute:Attribute = node.attributes[i];

			if ( attribute.namespace == null ){
				if ( attribute.name === "style" ){
					this.addOutput( this.getVarname(node)+".style.cssText = "+attribute.value.getExpression( this.language )+";" );
				}else{
					this.addOutput( this.getVarname(node) + ".setAttribute( \""+attribute.name+"\", "+attribute.value.getExpression( this.language )+" );" );
				}
			}else{
				this.addOutput( this.getVarname(node) + ".setAttributeNS( \""+attribute.namespace+"\", \""+attribute.name+"\", "+attribute.value.getExpression( this.language )+" );" );
			}
		}

		this.renderRenderers(node);

		this.addOutput(render_in + ".appendChild( " +this.getVarname(node)+ " );");

	}

	renderComponentNode( node:ComponentNode ){
		var render_in = "placeholder";
		if ( node.parent !== this.root ){
			render_in = this.getVarname( node.parent );
		}
		this.addOutput( "this._templateControls[\""+this.getVarname( node )+"\"].renderContentsInPlaceholder( "+render_in+" );" );
	}

	renderTextNode( node:TextNode ){
		 if ( ! node.getStripSpaces()
		 	|| node.raw.trim().length > 0 ){

			var render_in = "placeholder";
			if ( node.parent !== this.root ){
				render_in = this.getVarname( node.parent );
			}

			this.addOutput( "var "+this.getVarname(node)+" = document.createTextNode( "+node.expression.getExpression( this.language )+" );" );
			this.addOutput( render_in + ".appendChild( " + this.getVarname(node) + " );" );
		 }
	}

}