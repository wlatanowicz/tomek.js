import TemplateNode from '../template/TemplateNode';
import TextNode from '../template/TextNode';
import ComponentNode from '../template/ComponentNode';
import StencilNode from '../template/StencilNode';
import HtmlNode from '../template/HtmlNode';
import DocumentNode from '../template/DocumentNode';

export default class BaseRenderer {
		
	debug: number;
	language: string;

	indent: number;
	output: string;

	constructor( debug: number, language:string ){
		this.indent = 1;
		this.output = "";
		this.language = language;
		this.debug = debug;
	}

	pushIndent(){
		this.indent += 1;
	}

	popIndent(){
		if ( this.indent > 1 ){
			this.indent -= 1;
		}
	}

	addOutput( input:string ){
		var indent = (new Array(this.indent + 1).join("\t"));
		var lines = input.split("\n");
		for ( var i = 0; i < lines.length; i++ ){
			if ( lines[i].trim().length > 0 ){
				this.addOutputWithoutIndent(indent + lines[i]);
			}
		}
	}

	addOutputWithoutIndent( input:string ){
		this.output += input + "\n";
	}

	getVarname( n ):string{
		if ( n === null ){
			return "placeholdeer";
		}
		if (n instanceof HtmlNode) {
			return "h_" + n.getVariableName();
		}
		if (n instanceof ComponentNode) {
			return n.getVariableName();
		}
		if ( n instanceof StencilNode ){
			return "item";
		}
		if ( n instanceof TextNode ){
			return "t_" + n.getVariableName();
		}
		throw "error";
		
	}

	getAttributesJson(node:TemplateNode):string{
		if (node.attributes.length == 0) {
			return '[]';
		}

		var attrs = [];
		for (let i = 0; i < node.attributes.length;i++){
			let a = node.attributes[i];
			attrs.push( "\"" + a.name + "\" : " + a.value.getExpression( this.language ) );
		}

		return " {\n\t\t\t\t" + attrs.join( ",\n\t\t\t\t" )+"\n\t\t\t\t} ";
	}

}