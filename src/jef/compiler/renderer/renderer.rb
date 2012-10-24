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
		add_render_command "var "+node.variable_name+" = document.createElement( '"+node.tag+"' );"
		node.attributes.each do |a|
			add_render_command node.variable_name+".setAttribute( '"+a.name+"', "+a.value.js_expression+" );"
		end
		add_render_command node.parent.variable_name+".appendChild( "+node.variable_name+" );"
		render_contents node
	end
	
	def render_component_node node
		@dependencies.push( node.classname ) unless @dependencies.include?( node.classname )
		
		add_init_command "var "+node.variable_name+" = new "+node.classname+"("+node.attributes_json+");"
		add_init_command "this.addChildControl( '"+node.variable_name+"', "+node.variable_name+" );"
		
		add_render_command "var "+node.variable_name+" = this.getChildControl( '"+node.variable_name+"' );"
		add_render_command "this.renderChildControl( "+node.variable_name+", "+node.parent.variable_name+" );"
		
		render_contents node
	end
	
	def render_text_node node
		add_render_command node.parent.variable_name+".appendChild( document.createTextNode( "+node.get_js_expression+" ) );"
	end
	
	def output
		txt = "//= compat\n"
		
		@dependencies.each do |c|
			txt += "//= require \""+c+"\"\n"
		end
		
		txt += "\n"
		
		txt += "//= require \""+@control+"\"\n"
		txt += "\n"
		
		txt += @control+".prototype.createChildControls = function(){\n" +
				@init +
				"};\n" +
				"\n\n" +
				@control+".prototype.renderContents = function( placeholder ){\n" +
				@render +
				"};\n"
		return txt
	end
	
	def render_contents node
		node.children.each do |n|
			
			if ( n.instance_of? HtmlNode ) then
				render_html_node n
			elsif ( n.instance_of? ComponentNode ) then
				render_component_node n
			elsif ( n.instance_of? TextNode ) then
				render_text_node n
			else
				#error
			end
			
		end
	end
	
end
