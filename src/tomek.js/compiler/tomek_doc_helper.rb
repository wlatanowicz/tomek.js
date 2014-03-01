# To change this template, choose Tools | Templates
# and open the template in the editor.

# gem install treetop
# gem install bluecloth

class TomekDocHelper < TomekHelper

	DOC_DIR = File.join(ROOT_DIR, 'doc')
	
	EXCLUDE = []
	
  def require_pdoc
    require_submodule('PDoc', 'https://github.com/tobie/pdoc.git', 'pdoc')
  end

  def require_highlighter(name, verbose=false)
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

	def build_doc
		files = []
		Dir[File.join( FRAMEWORK_DIR, '**', '*.js' )].each do |f|
			fn = f.to_s[FRAMEWORK_DIR.to_s.length+1,9999]
			target = File.join( TMP_DIR, fn )
			FileUtils.mkdir_p File.dirname( target )
			
			#FileUtils.copy_file( f, target )
			
			target_file = File.new( target, "w+" );
			
			File.open( f, 'r') do |file|
				file.each_line do |line|
					target_file.puts line.strip
				end
			end
			target_file.close
			
			files.push target unless EXCLUDE.include?( fn )
		end
		build_doc_for_files files
	end
	
  def build_doc_for_files files
    #hash = current_head
    index_header = <<EOF
<h1 style="margin-top: 31px; height: 75px; padding: 1px 0; background: url(images/header-stripe-small.png) repeat-x;">
  <a href="http://prototypejs.org" style="padding-left: 120px;">
    <img src="images/header-logo-small.png" alt="Prototype JavaScript Framework API" />
  </a>
</h1>
EOF
    PDoc.run({
      :source_files => files,
      :destination  => DOC_DIR,
      :index_page   => 'README.markdown',
      :syntax_highlighter => syntax_highlighter,
      :markdown_parser    => :bluecloth,
      :src_code_text => "View source on GitHub &rarr;",
      :src_code_href => proc { |obj|
        "https://github.com/sstephenson/prototype/blob/"
      },
      :pretty_urls => false,
      :bust_cache  => false,
      :name => 'JEF JavaScript Framework',
      :short_name => 'JEF',
      :home_url => 'http://jef-framework.org',
      :version => TomekHelper::VERSION,
      :index_header => index_header,
      :footer => 'This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.',
      :assets => 'doc_assets'
    })
  end
  
  def syntax_highlighter
    if ENV['SYNTAX_HIGHLIGHTER']
      highlighter = ENV['SYNTAX_HIGHLIGHTER'].to_sym
      require_highlighter(highlighter, true)
      return highlighter
    end
    
    SYNTAX_HIGHLIGHTERS.detect { |n| require_highlighter(n) }
  end

	def empty_doc
		dir_path = DOC_DIR
		Dir.foreach(dir_path) do |f|
			fn = File.join(dir_path, f)
			FileUtils.rm_rf( "#{fn}" ) if f != '.' && f != '..' && f != '.svn'
		end
	end

end
