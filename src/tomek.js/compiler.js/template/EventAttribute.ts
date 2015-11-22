import libxmljs = require('libxmljs');

export default class EventAttribute {
	
	event: string;
	function: string;
	
	constructor( xmlNode ){

		if ( xmlNode instanceof libxmljs.Element ){
			this.event = xmlNode.name();
			this.function = xmlNode.text();
		}else{
			//means it is libxmljs.Attribute
			//attr instanceof libxmljs.Attribute FAILS!
			this.event = xmlNode.name();
			this.function = xmlNode.value();
		}

	}

	getBoundFunction(){
		var realFunction = this.function;
		if ( realFunction.substring( 0, 1 ) == '.' ){
			realFunction = "SourceTemplateControl"+realFunction;
		}
		var functionPath = realFunction.split(".");
		functionPath.pop();
		return realFunction + ".bind( " + (functionPath.join(".")) + " )";
	}

	//@TODO

}