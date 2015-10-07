import TemplateNode from '../template/TemplateNode';
import TextNode from '../template/TextNode';
import ComponentNode from '../template/ComponentNode';
import StencilNode from '../template/StencilNode';
import HtmlNode from '../template/HtmlNode';
import DocumentNode from '../template/DocumentNode';

export default  class BaseRenderer {
	
	indent: number;
	output: string;

	constructor(){
		this.indent = 1;
		this.output = "";
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
			this.addOutputWithoutIndent(indent + lines[i]);
		}
	}

	addOutputWithoutIndent( input:string ){
		this.output += input + "\n";
	}

	varname( n ){
		if ( n === null ){
			return "placeholdeer";
		}
		if (n instanceof HtmlNode) {
			return "h_" + n.variablename;
		}
		if (n instanceof ComponentNode) {
			return n.variablename;
		}
		if ( n instanceof StencilNode ){
			return "item";
		}
		if ( n instanceof TextNode ){
			return "t_"+n.variablename;
		}
		throw "error";
		
	}

}