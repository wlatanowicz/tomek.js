/// <reference path="../typings/libxmljs/libxmljs.d.ts" />

import libxmljs  = require('libxmljs');
import TemplateNode from './TemplateNode';
import ComponentNode from './ComponentNode';

export default class StencilNode extends TemplateNode {

	propertyName: string;
	placeholderNode: TemplateNode;

	constructor( xmlNode: libxmljs.Element ){
		super();
		this.propertyName = xmlNode.name();
		this.placeholderNode = new ComponentNode("TContent");
		this.placeholderNode.parent = this;
		this.children.push( this.placeholderNode );
	}

	addChild(node: TemplateNode) {
		this.placeholderNode.addChild(node);
	}

}