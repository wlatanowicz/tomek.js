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
				if (attr.namespace() !== null
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

	detailedDescription(){
		return "";
	}

	description():string {
		var ret = "---- ";
		ret += this.constructor.toString().match(/\w+/g)[1];
		ret += " ( "+this.detailedDescription()+" ) \n";

		for (let i = 0; i < this.events.length; i++ ){
			let event = this.events[i];
			ret += "   |e|  " + event.event + " = " + event.function;
		}

		for (let i = 0; i < this.attributes.length; i++ ){
			let attribute = this.attributes[i];
			ret += "   |a|  " + (attribute.namespace != null ? attribute.namespace + ":" : "") + attribute.name + " = " + attribute.value + "\n";
		}

		for (let i = 0; i < this.children.length; i++ ){
			let tmp = this.children[i].description().split("\n");
			for (let j = 0; j < tmp.length; j++ ){
				ret += "   + " + tmp[j] + "\n";
			}
		}

		return ret;

	}

}