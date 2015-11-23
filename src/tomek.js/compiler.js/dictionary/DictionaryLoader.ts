import DictionaryProvider from  './DictionaryProvider';

import fs = require('fs');
import libxmljs = require('libxmljs');

export default class DictionaryLoader {

	loadXml( file:string ){
		var content: string = fs.readFileSync( file, { "encoding": "UTF8" });
		var xml: libxmljs.Element = libxmljs.parseXmlString(content).root();
		
		var lang = xml.find('file')[0].attr('target-language').value();

		var dp = new DictionaryProvider();
		var dict = dp.getDictionary( lang );

		var units = xml.find('/xliff/file/body/trans-unit');

		for (var i = 0; i < units.length; i++ ){
			var unit = units[i];
			var source = unit.find('source')[0].text();
			var target = unit.find('target')[0].text();

			dict.setTranslation(source, target);
		}
	}
	

}