# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'rubygems'
require 'nokogiri'

class TemplateNode
	
	@attributes
	@children
	@parent
	
	
	@@last_auto_id = 0
	
	@id
	
  def initialize node
    @children = []
		@attributes = []
		
		if ( node != nil ) then
			
			node.children.each do |i|
				if ( i.namespace != nil &&
							i.namespace.href == 'property' ) then
					@attributes.push Attribute.new i
				end
			end
			
			node.attribute_nodes.each do |a|
					@attributes.push Attribute.new a
			end
			
		end
		
  end
	
	def add_child c
		c.parent= self
		@children.push c 
	end
	
	def children
		@children
	end
	
	def parent
		@parent
	end
	
	def parent= p
		@parent = p
	end
	
	def attributes
		@attributes
	end
	
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
	
	def ensure_id
		if @id == nil
			@@last_auto_id = @@last_auto_id + 1
			@id = "v"+@@last_auto_id.to_s
		end
	end
	
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
