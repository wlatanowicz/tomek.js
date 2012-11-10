# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'parser/parser'
require 'renderer/renderer'

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
		doc = p.parse( str )

		r = Renderer.new ctrl;
		r.render( doc )
		js = r.output

		file = File.new( File.join( @output_dir, ctrl+"-tpl.js" ), "w")
		file.write( js )
		file.close
	end
	
end
