# To change this template, choose Tools | Templates
# and open the template in the editor.

class BaseRenderer
  
	@output
	@indent

	def initialize junk
		@indent = 1
    @output = ""
  end
	
	def push_indent
		@indent = @indent+1
	end
	
	def pop_indent
		@indent = @indent-1 unless @indent <= 0
	end
	
	def add_output str
		indent = "\t" * @indent.to_i
		str.split("\n").each do |line|
			add_output_no_indent indent + line
		end
	end
	
	def add_output_no_indent str
		@output = @output + str + "\n"
	end
	
	def varname n
		if ( n == nil ) then
			return "placeholder"
		elsif ( n.instance_of? HtmlNode ) then
			return "h_"+n.variable_name
		elsif ( n.instance_of? ComponentNode ) then
			return n.variable_name
		elsif ( n.instance_of? StencilNode ) then
			return "item"
		elsif ( n.instance_of? TextNode ) then
			return "t_"+n.variable_name
		else
			#error
		end
	end
	
end
