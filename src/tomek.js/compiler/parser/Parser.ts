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

	entities = {
		'nbsp' : '160'
	};

	constructor() {

	}

	fixEntities( str: string ){
		for( let htmle in this.entities ){
			let xmle = this.entities[htmle];
			str = str.replace( new RegExp( '&'+htmle+';', 'g' ), '&#'+xmle+';' )
		}
		return str;
	}

	parseFile(path: string) {
		var content: string = fs.readFileSync(path, { "encoding": "UTF8" });
		
		if ( content.substring( 0, 5 ) !== "<?xml" ){
			content = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>" + "\n" +
						"<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >" + "\n" +
						content +
						"</template>";
		}
		
		return this.parse( this.fixEntities( content ) );
	}

	parse(xmlString: string) {
		var xml: libxmljs.Element = libxmljs.parseXmlString(xmlString).root();
		var docNode: TemplateNode = new DocumentNode();
		if ( ! this.needsTopLevelContentControl( xml ) ){
			this.parseRecursive( docNode, xml );
		}else{
			var topLevelContentControl = new ComponentNode( "TContent" );
			docNode.addChild( topLevelContentControl );
			this.parseRecursive( topLevelContentControl, xml );
		}
		return docNode;
	}
	
	needsTopLevelContentControl( topXmlNode: libxmljs.Element ){
		var children: libxmljs.Element[] = topXmlNode.childNodes();
		var componentControlCount = 0;
		for (var i = 0; i < children.length; i++) {
			var xmlNode = children[i];
			if (xmlNode.name() == 'text' ) {
				if (xmlNode.text().length > 0) {
					return true;
				 }
			}else
			if (xmlNode.type() == 'element') {
				if (xmlNode.namespace() !== null && xmlNode.namespace().href() == 'component') {
					componentControlCount++;
				}else if (xmlNode.namespace() !== null && xmlNode.namespace().href() == 'tomek'){
					//skip
				}else{
					return true;
				}
			}
		}
		
		return componentControlCount > 1;
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
