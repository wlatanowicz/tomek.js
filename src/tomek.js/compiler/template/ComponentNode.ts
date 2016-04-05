/// <reference path="../typings/libxmljs/libxmljs.d.ts" />

import libxmljs = require('libxmljs');
import TemplateNode from './TemplateNode';
	
export default class ComponentNode extends TemplateNode {

	classname: string;

	constructor(xmlNode) {
		if (xmlNode instanceof libxmljs.Element) {
			super(xmlNode);
			this.classname = xmlNode.name();
		}
		else if ( typeof xmlNode == "string"){
			super();
			this.classname = xmlNode;
		}
	}

	detailedDescription(){
		return this.classname;
	}

}
