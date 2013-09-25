# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'rubygems'
require 'nokogiri'

class TemplateNode
	
	@attributes
	@events
	@children
	@parent
	
	
	@@last_auto_id = 0
	
	@id
	
	# Creates a template node from document node
	# and parses properties and events
  def initialize node
    @children = []
		@attributes = []
		@events = []
		
		if ( node != nil ) then
			
			node.children.each do |i|
				if ( i.namespace != nil ) then
					if ( i.namespace.href == 'property' ) then
						@attributes.push Attribute.new i
					elsif( i.namespace.href == 'event' ) then
						@events.push Event.new i
					end
				end
			end
			
			node.attribute_nodes.each do |a|
				if ( a.namespace == nil ) then
					@attributes.push Attribute.new a
				elsif ( a.namespace.href == 'event' ) then
					@events.push Event.new a
				end
			end
			
		end
		
  end
	
	# Adds child node and assigns self to it as parent
	def add_child c
		c.parent= self
		@children.push c 
	end
	
	# Gets list of child nodes
	def children
		@children
	end
	
	# Gets parent node
	def parent
		@parent
	end
	
	# Sets parent node
	def parent= p
		@parent = p
	end
	
	# Gets attribute list
	def attributes
		@attributes
	end
	
	# Gets event list
	def events
		@events
	end
	
	# Renders attributes as JSON hash-object
	def attributes_json
		if @attributes.length <= 0
			return "[]"
		end
		
		attrs = []
		@attributes.each do |a|
			attrs.push "\"" + a.name + "\" : " + a.value.js_expression
		end
		" {\n\t\t\t\t"+( attrs.join ",\n\t\t\t\t" )+"\n\t\t\t\t} "
	end
	
	# Ensures the node has a template variable name
	def ensure_id
		if @id == nil
			@@last_auto_id = @@last_auto_id + 1
			@id = "c"+@@last_auto_id.to_s
		end
	end
	
	# Returns template variable name
	def variable_name
		ensure_id
		@id
	end
	
	def description
		ret = to_s + "\n"
		@attributes.each do |a|
			ret = ret + "     | "+a.to_s+"\n"
		end
		
		@children.each do |n|
			n.description.each_line do |line|
				ret = ret + "  " + line
			end
		end
		return ret
	end
	
end
