# To change this template, choose Tools | Templates
# and open the template in the editor.

class BaseRenderer
  
	@output

	def initialize
    @output = ""
  end
	
	def add_output str
		add_output_no_ident "\t" + str
	end
	
	def add_output_no_ident str
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
			render_stencil_node n
		elsif ( n.instance_of? TextNode ) then
			return "t_"+n.variable_name
		else
			#error
		end
	end
	
end
