# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'json'

class TomekTestHelper < TomekHelper
	
	def initialize
		@APP_DIR       = File.join(ROOT_DIR, 'test')
		@BUILD_DIR     = File.join(ROOT_DIR, 'test_build')
	end

	def index_file
		return File.join( @BUILD_DIR, 'index.html' )
	end
	
	def update_tests
		
		
		file = File.join(@APP_DIR, APP_YML)
		json_file = File.join(@APP_DIR, "test_list.js")
		app = YAML.load_file( file )
		
		newapp = Hash.new
		
		test_mains_list = []
		test_list = []
		test_dir = File.join( @APP_DIR, 'tests' )
		
		Dir.foreach(test_dir) do |f|
			if ! f.start_with?( '.' ) then
				test_mains_list.push File.join( "tests", f, "main.js" )
				test_list.push f
			end
		end
		
		newapp['MAINS'] = test_mains_list
		newapp['TEMPLATES'] = app['TEMPLATES']
		newapp['RESOURCES'] = app['RESOURCES']

		
		File.open( file, 'w' ) do |io|
			YAML.dump( newapp, io )
		end
		
		json = JSON.generate( test_list )
		
		File.open( json_file, 'w' ) do |io|
			io.write "var TESTS = "+json+";"
		end
		
 	end
	
end
