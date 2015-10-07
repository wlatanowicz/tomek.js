/// <reference path="../typings/libxmljs/libxmljs.d.ts" />

import libxmljs = require('libxmljs');

import Attribute from './Attribute';
import EventAttribute from './EventAttribute';

export default class TemplateNode {

	static variableNameNumber: number = 0;

	attributes: Attribute[];
	events: EventAttribute[];
	children: TemplateNode[];
	parent: TemplateNode;


	variableName: string;

	stripSpaces: boolean;
	static DEFAULT_STRIP_SPACES = true;

	constructor(xmlNode: libxmljs.Element = null) {
		this.attributes = [];
		this.events = [];
		this.children = [];
		this.parent = null;
		this.variableName = null;
		this.stripSpaces = null;

		if ( xmlNode !== null ){

			var children = xmlNode.childNodes();
			for (var i = 0; i < children.length; i++){
				var child = children[i];
				if (child.namespace() !== null
					&& child.namespace().href() == 'property') {
					this.attributes.push(new Attribute(child));
				}
				if (child.namespace() !== null
					&& child.namespace().href() == 'event') {
					this.events.push(new EventAttribute(xmlNode));
				}

			}

			var attrs = xmlNode.attrs();
			for (var j = 0; j < attrs.length; j++ ){
				var attr = attrs[j];
				if ( attr.namespace() !== null
					&& attr.namespace().href() == 'tomek' ){

					this.processOption(attr.name(), attr.value());

				}
				else if ( attr.namespace() !== null
					&& attr.namespace().href() == 'event' ){

					this.events.push(new EventAttribute(attr));

				}else{

					this.attributes.push(new Attribute(attr));

				}
			}
		}

	}

	processOption( name: string, value: string ){
		if ( name == 'StripWhitespace' ){
			if (value.toLowerCase() == 'yes') {
				this.stripSpaces = true;
			}
			if ( value.toLowerCase() == 'no' ){
				this.stripSpaces = false;
			}
		}
	}

	getStripSpaces(){
		if ( this.stripSpaces !== null ){
			return this.stripSpaces;
		}

		if ( this.parent !== null ){
			return this.parent.getStripSpaces();
		}

		return TemplateNode.DEFAULT_STRIP_SPACES;
	}

	addChild(node: TemplateNode) {
		node.parent = this;
		this.children.push(node);
	}

	getVariableName(){
		if ( this.variableName === null ){
			TemplateNode.variableNameNumber++;
			this.variableName = "c" + TemplateNode.variableNameNumber;
		}
		return this.variableName;
	}

}