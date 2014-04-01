# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

class Dictionary
	
	@@DICTIONARIES
	@@TARGET_LANGUAGE
	
	def translate str
		@@TARGET_LANGUAGE+"@" + str
	end

	def self.set_dictionaries dicts
		@@DICTIONARIES = dicts
	end
	
	def self.set_target_langugae lang
		@@TARGET_LANGUAGE = lang
	end
	
end