import DictionaryInterface from  './DictionaryInterface';
import Dictionary from  './Dictionary';
import DynamicDictionary from  './DynamicDictionary';

export default class DictionaryProvider {

	static dictionaries = {};
	static dynamicDictionary = null;

	getDictionary( language: string ):DictionaryInterface{

		if ( language == null ){
			return this.getDynamicDictionary();
		}

		if ( ! DictionaryProvider.dictionaries[language] ){
			DictionaryProvider.dictionaries[language] = new Dictionary();
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