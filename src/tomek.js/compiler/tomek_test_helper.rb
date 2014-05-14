# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'json'

class TomekTestHelper < TomekHelper
	
	def initialize
		@APP_DIR       = File.join(ROOT_DIR, 'test')
		@BUILD_DIR     = File.join(ROOT_DIR, 'test_build')
		Dictionary.set_app_dir( @APP_DIR )
		Dictionary.set_dictionaries( YAML.load(IO.read(File.join(@APP_DIR, APP_YML)))['DICTIONARIES'] )
		Dictionary.set_target_langugae( TARGET_LANGUAGE )
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
	
	def create_test name
		
		template = File.join( @APP_DIR, 'test_template' )
		test_dir = File.join( @APP_DIR, 'tests' )
		
		last_num = 0;
		Dir.foreach(test_dir) do |f|
			if ! f.start_with?( '.' ) then
				num = f.split( "_" )[0].to_i
				last_num = num if ( num > last_num )
			end
		end
		
		new_num = (last_num+1).to_s.rjust( 3, '0' )
		
		new_dir = File.join( test_dir, new_num+"_"+name )
		Dir.mkdir( new_dir )
		
		Dir.foreach( template ) do |f|
			if ! f.start_with?( '.' ) then
				
				File.open( File.join( new_dir, f ).gsub( "__NUM__", new_num ), 'w') do |file|
					file.write( IO.read( File.join( template, f ) ).gsub( "__NUM__", new_num ) )
				end
				
			end
		end
		
		update_tests
		
	end
	
end