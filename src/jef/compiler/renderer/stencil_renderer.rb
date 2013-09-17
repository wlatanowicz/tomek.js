# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'renderer/base_renderer'

class StencilRenderer < BaseRenderer
	
	@root
	
  def initialize root
		@output = ""
    @root = root
  end
	
	def render
		render_renderers @root
	end
	
	def add_output str
		super "\t"+str
	end
	
	def output
		@output
	end
	
	def render_html_node node
		render_in = "placeholder";
		if ( node.parent != @root )then
			render_in = varname( node.parent )
		end
		add_output "var "+varname( node )+" = document.createElement( \""+node.tag+"\" );"
		node.attributes.each do |a|
			puts a
			add_output varname( node ) + ".setAttribute( \"" + a.name + "\", " + a.value.js_expression + " );";
		end
		
		render_renderers node
		add_output render_in+".appendChild( "+varname( node )+" );"
		
	end
	
	def render_component_node node
		render_in = "placeholder"
		if ( node.parent != @root )then
			render_in = varname( node.parent )
		end
		add_output "this._templateControls[\""+varname( node )+"\"].renderContentsInPlaceholder( "+render_in+" );"
		
	end
	
	def render_text_node node
		render_in = "placeholder";
		if ( node.parent != @root )then
			render_in = varname( node.parent )
		end
		add_output "var "+varname( node )+" = document.createTextNode( "+node.get_js_expression+" );"
		add_output render_in+".appendChild( "+varname( node )+" );"
	end
	
	def render_renderers node
		node.children.each do |n|
			
			if ( n.instance_of? HtmlNode ) then
				render_html_node n
			elsif ( n.instance_of? ComponentNode ) then
				render_component_node n
			elsif ( n.instance_of? StencilNode ) then
			#	render_stencil_node n
			elsif ( n.instance_of? TextNode ) then
				render_text_node n
			else
				render_initializers n
			end
			
		end
	end

end
