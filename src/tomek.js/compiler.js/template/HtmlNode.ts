/// <reference path="../typings/libxmljs/libxmljs.d.ts" />

import libxmljs = require('libxmljs');
import TemplateNode from './TemplateNode';

export default class HtmlNode extends TemplateNode {
		tag: string;
	namespace: string;

	constructor(xmlNode:libxmljs.Element){
		super();
		this.tag = xmlNode.name();
		if ( xmlNode.namespace() !== null ){
			this.namespace = xmlNode.namespace().href();
		}else{
			this.namespace = null;
		}
	}

}