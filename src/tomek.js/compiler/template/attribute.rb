# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'rubygems'
require 'nokogiri'
require 'template/text_expression'

class Attribute
	
	@name
	@value
	
  def initialize node, value = ""
    
		if ( node.instance_of? Nokogiri::XML::Element ) then
			@name = node.name.to_s
			@value = TextExpression.new node.text
		elsif ( node.instance_of? Nokogiri::XML::Attr ) then
			@name = node.name
			@value = TextExpression.new node.value
		elsif ( node.instance_of? String and value.instance_of? String ) then
			@name = node
			@value = TextExpression.new value
		else
			@name = "unknown"
			@value = TextExpression.new ""
		end
		
  end
	
	def name
		@name
	end
	
	def value
		@value
	end
	
	def to_s
		@name + " = " + @value.to_s
	end
	
end
