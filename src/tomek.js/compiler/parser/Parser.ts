/// <reference path="../typings/libxmljs/libxmljs.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

import fs = require('fs');
import libxmljs = require('libxmljs');

import TemplateNode from '../template/TemplateNode';
import TextNode from '../template/TextNode';
import ComponentNode from '../template/ComponentNode';
import StencilNode from '../template/StencilNode';
import HtmlNode from '../template/HtmlNode';
import DocumentNode from '../template/DocumentNode';

export default class Parser {

	constructor() {

	}

	parseFile(path: string) {
		var content: string = fs.readFileSync(path, { "encoding": "UTF8" });
		return this.parse(content);
	}

	parse(xmlString: string) {
		var xml: libxmljs.Element = libxmljs.parseXmlString(xmlString).root();
		var docNode: TemplateNode = new DocumentNode();
		this.parseRecursive(docNode, xml);
		return docNode;
	}

	parseRecursive(parsedParent: TemplateNode, xmlNode: libxmljs.Element) {
		var children: libxmljs.Element[] = xmlNode.childNodes();
		for (var i = 0; i < children.length; i++) {
			let parsedNode = this.createNode(children[i]);
			if (parsedNode !== null) {
				parsedParent.addChild(parsedNode);
				this.parseRecursive(parsedNode, children[i]);
			}
		}
	}

	createNode(xmlNode: libxmljs.Element): TemplateNode {
		if (xmlNode.name() == 'text' ) {
			if (xmlNode.text().length > 0) {
				return new TextNode(xmlNode.text());
			 }
		}else
		if (xmlNode.type() == 'element') {
			if (xmlNode.namespace() !== null && xmlNode.namespace().href() == 'component') {
				return new ComponentNode(xmlNode);
			}
			else if (xmlNode.namespace() !== null && xmlNode.namespace().href() == 'stencil') {
				return new StencilNode(xmlNode);
			}
			else if (xmlNode.namespace() !== null && xmlNode.namespace().href() == 'property') {
				//skip
			}
			else if (xmlNode.namespace() !== null && xmlNode.namespace().href() == 'tomek'){
				//skip
			}
			else {
				return new HtmlNode(xmlNode);
			}
		}
		return null;
	}

}
