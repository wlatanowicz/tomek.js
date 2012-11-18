# To change this template, choose Tools | Templates
# and open the template in the editor.

class Renderer
	
	@dependencies
	@control
	@render
	@init
	
	def initialize control
		@render = ""
		@init = ""
		@control = control
		@dependencies = []
	end
	
	def add_render_command str
		@render = @render + "\t" + str + "\n"
	end
	
	def add_init_command str
		@init = @init + "\t" + str + "\n"
	end
	
	def render doc
		render_contents doc
	end
	
	def render_html_node node
		@dependencies.push( 'THtmlElement' ) unless @dependencies.include?( 'THtmlElement' )
		
		init_in = "this"
		if ( node.parent != nil )then
			init_in = node.parent.variable_name
		end
		add_init_command "var "+node.variable_name+" = new THtmlElement(\""+node.tag+"\", "+node.attributes_json+");"
		add_init_command init_in+".addChildControl( "+node.variable_name+" );"
		
		render_contents node
	end
	
	def render_component_node node
		@dependencies.push( node.classname ) unless @dependencies.include?( node.classname )
		
		init_in = "this"
		if ( node.parent != nil )then
			init_in = node.parent.variable_name
		end
		add_init_command "var "+node.variable_name+" = new "+node.classname+"("+node.attributes_json+");"
		add_init_command init_in+".addChildControl( "+node.variable_name+" );"
		
		render_contents node
	end
	
	def render_stencil_node node
		
	end
	
	def render_text_node node
		@dependencies.push( 'TTextElement' ) unless @dependencies.include?( 'TTextElement' )
		
		init_in = "this"
		if ( node.parent != nil )then
			init_in = node.parent.variable_name
		end
		add_init_command "var "+node.variable_name+" = new TTextElement("+node.get_js_expression+");"
		add_init_command init_in+".addChildControl( "+node.variable_name+" );"
	end
	
	def output
#		txt = "//= compat\n"
		txt = ""
		
		@dependencies.each do |c|
			txt += "//= require \""+c+"\"\n"
		end
		
		txt += "\n"
		
		txt += "//= require \""+@control+"\"\n"
		txt += "\n"
		
		txt += @control+".prototype.createChildControls = function(){\n" +
				"var placeholder = this;\n"+
				@init +
				"};\n";
		return txt
	end
	
	def render_contents node
		node.children.each do |n|
			
			if ( n.instance_of? HtmlNode ) then
				render_html_node n
			elsif ( n.instance_of? ComponentNode ) then
				render_component_node n
			elsif ( n.instance_of? StencilNode ) then
				render_stencil_node n
			elsif ( n.instance_of? TextNode ) then
				render_text_node n
			else
				#error
			end
			
		end
	end
	
end
