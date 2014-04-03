# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

class Dictionary
	
	@@DICTIONARIES
	@@TARGET_LANGUAGE
	@@APP_DIR
	
	@@DICTIONARY = nil
	
	def translate str
		
		ensure_dictionary
		
		if( @@DICTIONARY[ str ] )
			return @@DICTIONARY[ str ]
		end

		return @@TARGET_LANGUAGE+"@" + str
	end

	def self.set_dictionaries dicts
		@@DICTIONARIES = dicts
	end
	
	def self.set_app_dir app
		@@APP_DIR = app
	end
	
	def self.set_target_langugae lang
		@@TARGET_LANGUAGE = lang
	end
	
	def ensure_dictionary
		if ( ! @@DICTIONARY )
			if ( @@DICTIONARIES )
				search_dictionary
			end
		end
	end
	
	def search_dictionary
		basedir = @@APP_DIR
		@@DICTIONARIES.each do |dir|

			pat = File.join( basedir, dir )
			Dir[pat].each do |d|
				str = File.read( d )
				xml = Nokogiri::XML( str )
				lang = xml.xpath( './/file' ).attr( 'target-language' ).to_s
				if ( lang == @@TARGET_LANGUAGE )
					load_dictionary xml
				end
			end
		end
	end
	
	def load_dictionary xml
		if ( ! @@DICTIONARY )
			@@DICTIONARY = Hash.new
		end
		xml.xpath( './/file/body/trans-unit' ).each do |t|
			source = t.xpath( 'source' )
			target = t.xpath( 'target' )
			@@DICTIONARY[ source.text ] = target.text
		end
	end
	
end