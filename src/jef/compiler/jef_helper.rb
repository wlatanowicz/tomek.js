# To change this template, choose Tools | Templates
# and open the template in the editor.

$LOAD_PATH << File.dirname(__FILE__) 

require 'compiler'
require 'find'

class JefHelper
	
  @APP_DIR
  @BUILD_DIR
	
  ROOT_DIR      = File.expand_path(File.join( File.dirname(__FILE__), '..' ) )
  FRAMEWORK_DIR = File.join(ROOT_DIR, 'framework')
  COMPAT_DIR = File.join(ROOT_DIR, 'compatibility')
  EXTERNAL_DIR  = File.join(ROOT_DIR, 'external')
	TEMP_DEST_DIR = File.join(ROOT_DIR, 'tmp')

  TEST_DIR      = File.join(ROOT_DIR, 'test')
  TEST_UNIT_DIR = File.join(TEST_DIR, 'unit')
  TMP_DIR       = File.join(ROOT_DIR, 'tmp')
	APP_YML				= 'application.yml'
  
  VERSION       = IO.read(File.join(ROOT_DIR, 'VERSION'))
	
  # Possible options for PDoc syntax highlighting, in order of preference.
  SYNTAX_HIGHLIGHTERS = [:pygments, :coderay, :none]

  %w[sprockets hike tilt rack multi_json pdoc unittest_js caja_builder uglifier execjs].each do |name|
    $:.unshift File.join( EXTERNAL_DIR, name, 'lib')
  end

	def initialize
		@APP_DIR       = File.join(ROOT_DIR, 'app')
		@BUILD_DIR     = File.join(ROOT_DIR, 'build')
	end
	
	def empty_tmp
		dir_path = TEMP_DEST_DIR
		Dir.foreach(dir_path) do |f|
			fn = File.join(dir_path, f)
			FileUtils.rm_rf( "#{fn}" ) if f != '.' && f != '..' && f != '.svn'
		end
	end
	
	def empty_build
		dir_path = @BUILD_DIR
		Dir.foreach(dir_path) do |f|
			fn = File.join(dir_path, f)
			FileUtils.rm_rf( "#{fn}" ) if f != '.' && f != '..' && f != '.svn'
		end
	end
	
  def has_git?
    begin
      `git --version`
      return true
    rescue Error => e
      return false
    end
  end
  
  def require_git
    return if has_git?
    puts "\nJEF requires Git in order to load its dependencies."
    puts "\nMake sure you've got Git installed and in your path."
    puts "\nFor more information, visit:\n\n"
    puts "  http://book.git-scm.com/2_installing_git.html"
    exit
  end
  
	def compile_templates
		c = Compiler.new TEMP_DEST_DIR 
		basedir = @APP_DIR
		templates = YAML.load(IO.read(File.join(@APP_DIR, APP_YML)))['TEMPLATES']
		templates.each do |r|
			pat = File.join( basedir, r )
			Dir[pat].each do |p|
				c.compile p
			end
		end
		
	end
  
  def sprocketize minify

    require_sprockets
		
		require_uglifier if minify
		
		mains = YAML.load(IO.read(File.join(@APP_DIR, APP_YML)))['MAINS']
		mains.each do |m|
			
			target = File.join( @BUILD_DIR, m )
			target_dir = File.dirname( target )
			FileUtils.mkdir_p target_dir			
			
			env = Sprockets::Environment.new
			env.prepend_path @APP_DIR
			env.prepend_path TEMP_DEST_DIR
			
			Find.find( FRAMEWORK_DIR ) do |e| 
				env.prepend_path e if File.directory?(e)
			end
			
			env.prepend_path File.dirname( File.join( @APP_DIR, m ) )
			
			js = env[ m ].to_s
			
			if ENV['compat_ie8'] == 'yes' then
				js = File.read( File.join( COMPAT_DIR, 'IE8.js' ) ) + "\n" + js
			end
			
			js = Uglifier.compile( js, :output => { :comments => :none } ) if minify
			
			file = File.new( target, "w" )
			file.write( js )
			file.close
		end
		
  end
	
	def copy_resources
		basedir = @APP_DIR
		res = YAML.load(IO.read(File.join(@APP_DIR, APP_YML)))['RESOURCES']
		res.each do |r|
			pat = File.join( basedir, r )
			Dir[pat].each do |p|
				target = File.join( @BUILD_DIR, p.to_s[basedir.to_s.length+1,9999] )
				FileUtils.mkdir_p File.dirname( target )
				FileUtils.copy_file( p, target )
			end
		end
	end
  
	# Required by Sprockets
	def require_hike
		require_submodule( "Hike", "git://github.com/sstephenson/hike.git", "hike" )
	end
	
	# Required by Sprockets
	def require_tilt
		require_submodule( "tilt", "git://github.com/rtomayko/tilt.git", "tilt" )
	end
	
	# Required by Sprockets
	def require_rack
		require_submodule( "rack", "git://github.com/rack/rack.git", "rack" )
	end
	
	# Required by Sprockets
	def require_multi_json
		require_submodule( "multi_json", "git://github.com/intridea/multi_json.git", "multi_json" )
	end
	
  def require_sprockets
		require_hike
		require_tilt
		require_rack
		require_multi_json
    require_submodule('Sprockets', 'git://github.com/sstephenson/sprockets.git', 'sprockets')
  end
	
	def require_execjs
		require_submodule( 'ExecJS', 'https://github.com/sstephenson/execjs.git', 'execjs' )
	end
	
	def require_uglifier
		require_execjs
    require_submodule('Uglifier', 'https://github.com/lautis/uglifier.git', 'uglifier')
	end
    
  def get_submodule(name, git_path, path)
    require_git
    puts "\nYou seem to be missing #{name}. Obtaining it via git...\n\n"
    
    return true if Kernel.system("git clone #{git_path} external/#{path}")
    # If we got this far, something went wrong.
    puts "\nLooks like it didn't work. Try it manually:\n\n"
    puts "  $ git submodule init"
    puts "  $ git submodule update external/#{path}"
    false
  end
  
  def require_submodule(name, git_path, path)
    begin
      require path
    rescue LoadError => e
      # Wait until we notice that a submodule is missing before we bother the
      # user about installing git. (Maybe they brought all the files over
      # from a different machine.)
      missing_file = e.message.sub('no such file to load -- ', '')
      if missing_file == path
        # Missing a git submodule.
        retry if get_submodule(name, git_path, path)
      else
        # Missing a gem.
        puts "\nIt looks like #{name} is missing the '#{missing_file}' gem. Just run:\n\n"
        puts "  $ gem install #{missing_file}"
        puts "\nand you should be all set.\n\n"
      end
      exit
    end
  end
  
end
