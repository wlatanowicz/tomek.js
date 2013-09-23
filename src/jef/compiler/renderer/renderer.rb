# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'renderer/base_renderer'
require 'renderer/stencil_renderer'

class Renderer < BaseRenderer
	
	@dependencies
	@control
	
	def initialize control
		super
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
		while ( parent_component != nil and
					! ( parent_component.instance_of? ComponentNode or parent_component.instance_of? StencilNode ) ) do
			parent_component = parent_component.parent
		end

		if ( parent_component != nil && parent_component.variable_name != 'placeholder' )then
			init_in = varname( parent_component )
		end
		add_output "var "+varname( node )+" = new "+node.classname+"("+node.attributes_json+");"
		add_output init_in+".addTemplateChildControl( \""+varname( node )+"\", "+varname( node )+" );"
		
		node.events.each do |e|
			add_output varname( node )+".attachEvent( '"+e.event+"', "+e.bound_function+" );"
		end
		
		r = StencilRenderer.new node
		r.render
		if ( r.output.length > 0 ) then
			add_output varname( node )+".renderChildControls = function( placeholder ){"
			add_output r.output
			add_output "}"
		end
		
		node.children.each do |n|
			
			if ( n.instance_of? StencilNode ) then
				add_output varname( node )+".set"+n.property_name+"Template( function( item ){"
				push_indent
				render_initializers n
				pop_indent
				add_output "} );"
			end
			
		end

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
			elsif ( n.instance_of? StencilNode ) then
				#skip
			else
				render_initializers n
			end
			
		end
	end
	
end
