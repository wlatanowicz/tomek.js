# To change this template, choose Tools | Templates
# and open the template in the editor.

$LOAD_PATH << File.dirname(__FILE__) 

require 'compiler'

module JefHelper
	
  ROOT_DIR      = File.expand_path(File.join( File.dirname(__FILE__), '..' ) )
  APP_DIR       = File.join(ROOT_DIR, 'app')
  FRAMEWORK_DIR = File.join(ROOT_DIR, 'framework')
  DOC_DIR       = File.join(ROOT_DIR, 'doc')
  BUILD_DIR     = File.join(ROOT_DIR, 'build')
  EXTERNAL_DIR  = File.join(ROOT_DIR, 'external')
	TEMP_DEST_DIR = File.join(ROOT_DIR, 'tmp', 'templates')

  TEST_DIR      = File.join(ROOT_DIR, 'test')
  TEST_UNIT_DIR = File.join(TEST_DIR, 'unit')
  TMP_DIR       = File.join(TEST_UNIT_DIR, 'tmp')
	APP_YML				= 'application.yml'
  
  # Possible options for PDoc syntax highlighting, in order of preference.
  SYNTAX_HIGHLIGHTERS = [:pygments, :coderay, :none]

  %w[sprockets hike tilt rack multi_json pdoc unittest_js caja_builder].each do |name|
    $:.unshift File.join( EXTERNAL_DIR, name, 'lib')
  end

  def self.has_git?
    begin
      `git --version`
      return true
    rescue Error => e
      return false
    end
  end
  
  def self.require_git
    return if has_git?
    puts "\nJEF requires Git in order to load its dependencies."
    puts "\nMake sure you've got Git installed and in your path."
    puts "\nFor more information, visit:\n\n"
    puts "  http://book.git-scm.com/2_installing_git.html"
    exit
  end
  
	def self.compile_templates
		c = Compiler.new TEMP_DEST_DIR 
		basedir = APP_DIR
		templates = YAML.load(IO.read(File.join(APP_DIR, APP_YML)))['TEMPLATES']
		templates.each do |r|
			pat = File.join( basedir, r )
			Dir[pat].each do |p|
				c.compile p
			end
		end
		
	end
  
  def self.sprocketize

    require_sprockets
		
		mains = YAML.load(IO.read(File.join(APP_DIR, APP_YML)))['MAINS']
		mains.each do |m|
			env = Sprockets::Environment.new
			env.prepend_path APP_DIR
			env.prepend_path TEMP_DEST_DIR
			env.prepend_path FRAMEWORK_DIR
			js = env[ m ].to_s
			file = File.new( File.join( BUILD_DIR, m ), "w")
			file.write( js )
			file.close
		end
		
  end
	
	def self.copy_resources
		basedir = APP_DIR
		res = YAML.load(IO.read(File.join(APP_DIR, APP_YML)))['RESOURCES']
		res.each do |r|
			pat = File.join( basedir, r )
			Dir[pat].each do |p|
				target = File.join( BUILD_DIR, p.to_s[basedir.to_s.length+1,9999] )
				FileUtils.mkdir_p File.dirname( target )
				FileUtils.copy_file( p, target )
			end
		end
	end
  
  def self.build_doc_for(file)
    rm_rf(DOC_DIR)
    mkdir_p(DOC_DIR)
    hash = current_head
    index_header = <<EOF
<h1 style="margin-top: 31px; height: 75px; padding: 1px 0; background: url(images/header-stripe-small.png) repeat-x;">
  <a href="http://prototypejs.org" style="padding-left: 120px;">
    <img src="images/header-logo-small.png" alt="Prototype JavaScript Framework API" />
  </a>
</h1>
EOF
    PDoc.run({
      :source_files => Dir[File.join('src', 'prototype', '**', '*.js')],
      :destination  => DOC_DIR,
      :index_page   => 'README.markdown',
      :syntax_highlighter => syntax_highlighter,
      :markdown_parser    => :bluecloth,
      :src_code_text => "View source on GitHub &rarr;",
      :src_code_href => proc { |obj|
        "https://github.com/sstephenson/prototype/blob/#{hash}/#{obj.file}#L#{obj.line_number}"
      },
      :pretty_urls => false,
      :bust_cache  => false,
      :name => 'Prototype JavaScript Framework',
      :short_name => 'Prototype',
      :home_url => 'http://prototypejs.org',
      :version => JefHelper::VERSION,
      :index_header => index_header,
      :footer => 'This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.',
      :assets => 'doc_assets'
    })
  end
  
  def self.syntax_highlighter
    if ENV['SYNTAX_HIGHLIGHTER']
      highlighter = ENV['SYNTAX_HIGHLIGHTER'].to_sym
      require_highlighter(highlighter, true)
      return highlighter
    end
    
    SYNTAX_HIGHLIGHTERS.detect { |n| require_highlighter(n) }
  end
  
  def self.require_highlighter(name, verbose=false)
    case name
    when :pygments
      success = system("pygmentize -V > /dev/null")
      if !success && verbose
        puts "\nYou asked to use Pygments, but I can't find the 'pygmentize' binary."
        puts "To install, visit:\n"
        puts "  http://pygments.org/docs/installation/\n\n"
        exit
      end
      return success # (we have pygments)
    when :coderay
      begin
        require 'coderay'
      rescue LoadError => e
        if verbose
          puts "\nYou asked to use CodeRay, but I can't find the 'coderay' gem. Just run:\n\n"
          puts "  $ gem install coderay"
          puts "\nand you should be all set.\n\n"
          exit
        end
        return false
      end
      return true # (we have CodeRay)
    when :none
      return true
    else
      puts "\nYou asked to use a syntax highlighter I don't recognize."
      puts "Valid options: #{SYNTAX_HIGHLIGHTERS.join(', ')}\n\n"
      exit
    end
  end
  
	def self.require_hike
		require_submodule( "Hike", "git://github.com/sstephenson/hike.git", "hike" )
	end
	
	def self.require_tilt
		require_submodule( "tilt", "git://github.com/rtomayko/tilt.git", "tilt" )
	end
	
	def self.require_rack
		require_submodule( "rack", "git://github.com/rack/rack.git", "rack" )
	end
	
	def self.require_multi_json
		require_submodule( "multi_json", "git://github.com/intridea/multi_json.git", "multi_json" )
	end
	
  def self.require_sprockets
		require_hike
		require_tilt
		require_rack
		require_multi_json
    require_submodule('Sprockets', 'git://github.com/sstephenson/sprockets.git', 'sprockets')
  end
  
  def self.require_pdoc
    require_submodule('PDoc', 'pdoc')
  end
  
  def self.require_unittest_js
    require_submodule('UnittestJS', 'unittest_js')
  end
  
  def self.require_caja_builder
    require_submodule('CajaBuilder', 'caja_builder')
  end
  
  def self.get_submodule(name, git_path, path)
    require_git
    puts "\nYou seem to be missing #{name}. Obtaining it via git...\n\n"
    
    return true if Kernel.system("git clone #{git_path} external/#{path}")
    # If we got this far, something went wrong.
    puts "\nLooks like it didn't work. Try it manually:\n\n"
    puts "  $ git submodule init"
    puts "  $ git submodule update external/#{path}"
    false
  end
  
  def self.require_submodule(name, git_path, path)
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
