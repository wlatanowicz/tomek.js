# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'renderer/base_renderer'
require 'renderer/stencil_renderer'

class Renderer < BaseRenderer
	
	@dependencies
	@control
	
	def initialize control
		@output = ""
		@control = control
		@dependencies = []
	end
	
	def render doc
		render_initializers doc
	end
	
	def render_initializer node
		@dependencies.push( node.classname ) unless @dependencies.include?( node.classname )
		
		init_in = "this"
		parent_component = node.parent;
		while ( parent_component != nil and ! parent_component.instance_of? ComponentNode ) do
			parent_component = parent_component.parent
		end

		if ( parent_component != nil && parent_component.variable_name != 'placeholder' )then
			init_in = varname( parent_component )
		end
		add_output varname( node )+" = new "+node.classname+"("+node.attributes_json+");"
		add_output init_in+".addTemplateChildControl( \""+varname( node )+"\", "+varname( node )+" );"
		add_output init_in+".addChildControl( "+varname( node )+" );"
		
		r = StencilRenderer.new node
		r.render
		add_output varname( node )+".renderChildControls = function(){"
		add_output "\tvar placeholder = this.getContainer();";
		add_output r.output
		add_output "}"
		
		render_initializers node
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
				@output +
				"};\n";
			
		return txt
	end
	
	def render_initializers node
		node.children.each do |n|
			
			if ( n.instance_of? ComponentNode ) then
				render_initializer n
			else
				render_initializers n
			end
			
		end
	end
	
end
