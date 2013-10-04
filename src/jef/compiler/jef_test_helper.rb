# To change this template, choose Tools | Templates
# and open the template in the editor.

class JefTestHelper < JefHelper
	
	def initialize
		@APP_DIR       = File.join(ROOT_DIR, 'test')
		@BUILD_DIR     = File.join(ROOT_DIR, 'test_build')
	end

	def index_file
		return File.join( @BUILD_DIR, 'index.html' )
	end
	
	def update_tests
		
		
		file = File.join(@APP_DIR, APP_YML)
		app = YAML.load_file( file )
		
		newapp = Hash.new
		
		test_list = []
		test_dir = File.join( @APP_DIR, 'tests' )
		
		Dir.foreach(test_dir) do |f|
			test_list.push File.join( "tests", f, "main.js" ) if ! f.start_with?( '.' )
		end
		
		newapp['MAINS'] = test_list
		newapp['TEMPLATES'] = app['TEMPLATES']
		newapp['RESOURCES'] = app['RESOURCES']

		
		File.open( file, 'w' ) do |io|
			YAML.dump( newapp, io )
		end
		
 	end
	
end
