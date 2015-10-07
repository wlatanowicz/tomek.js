/// <reference path="../typings/libxmljs/libxmljs.d.ts" />

import libxmljs = require('libxmljs');

import TextExpression from "./TextExpression";

export default class Attribute {
	
	name: string;
	value: TextExpression;
	namespace: string;

	constructor(attr) {

		if (attr instanceof libxmljs.Element) {
			this.name = attr.name();
			this.value = new TextExpression(attr.text());
		} else {
			//means it is libxmljs.Attribute
			//attr instanceof libxmljs.Attribute FAILS!

			this.name = attr.name();
			if (attr.namespace() !== null){
				this.namespace = attr.namespace().name();
			}
			this.value = new TextExpression(attr.value());
		}

	}

	

}