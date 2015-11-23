import Dictionary from  './Dictionary';
import DynamicDictionary from  './DynamicDictionary';

export default class DictionaryProvider {

	static strict = true;

	static dictionaries = {};
	static dynamicDictionary = null;

	getDictionary( language: string ){

		if ( language == null ){
			return this.getDynamicDictionary();
		}

		if ( ! DictionaryProvider.dictionaries[language] ){
			DictionaryProvider.dictionaries[language] = new Dictionary( language, DictionaryProvider.strict );
		}

		return DictionaryProvider.dictionaries[language];
	}

	getDynamicDictionary():DynamicDictionary{
		if ( DictionaryProvider.dynamicDictionary == null ){
			DictionaryProvider.dynamicDictionary = new DynamicDictionary();
		}
		return DictionaryProvider.dynamicDictionary;
	}

}