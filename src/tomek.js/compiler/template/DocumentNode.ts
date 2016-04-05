/// <reference path="../typings/libxmljs/libxmljs.d.ts" />

import libxmljs = require('libxmljs');
import TemplateNode from './TemplateNode';

export default class DocumentNode extends TemplateNode {

	constructor(){
		super(null);
	}

	getVariableName(){
		return "placeholder";
	}	

}