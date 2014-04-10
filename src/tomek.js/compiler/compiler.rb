# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'parser/parser'
require 'renderer/renderer'
require 'help/colorize'
require 'help/xml_corrector'

class Compiler
	
	@output_dir
	@suffix
	
	def initialize output
		@output_dir = output
		@suffix = ".tpl"
	end
	
	def compile input_file
		ctrl = File.basename( input_file, @suffix )
		
		str = File.read( input_file )

		p = Parser.new
		
		begin
			doc = p.parse( str )
		rescue Nokogiri::XML::SyntaxError => e
			file_name = File.basename( input_file ).red
			puts "Error parsing template #{file_name}: #{e}"
			puts "Part of your XML:"
			c = XmlCorrector.new
			c.correct str, e
			exit
		end

		r = Renderer.new ctrl;
		r.render( doc )
		js = r.output

		file = File.new( File.join( @output_dir, ctrl+"-tpl.js" ), "w")
		file.write( js )
		file.close
	end
	
end
