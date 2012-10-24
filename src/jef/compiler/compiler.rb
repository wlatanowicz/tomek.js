# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'parser/parser'
require 'renderer/renderer'

class Compiler
	
	@input_dir
	@output_dir
	
	def initialize input, output
		@input_dir = input
		@output_dir = output
	end
	
	def compile ctrl
		str = File.read( @input_dir+"/"+ctrl+".xml" )

		p = Parser.new
		doc = p.parse( str )

		r = Renderer.new ctrl;
		r.render( doc )
		js = r.output

		file = File.new( @output_dir+"/"+ctrl+".tpl.js", "w")
		file.write( js )
		file.close
	end
	
end

ctrl = "TMyControl"

file_base = "/htdocs/JEF"

c = Compiler.new file_base, file_base
c.compile ctrl
