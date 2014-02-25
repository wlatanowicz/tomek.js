# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'rubygems'
require 'nokogiri'

class Event
	
	@event
	@function
	
  def initialize node, value = ""
    
		if ( node.instance_of? Nokogiri::XML::Element ) then
			@event = node.name.to_s
			@function = node.text
		elsif ( node.instance_of? Nokogiri::XML::Attr ) then
			@event = node.name
			@function = node.value
		elsif ( node.instance_of? String and value.instance_of? String ) then
			@event = node
			@function = value
		else
			@event = "unknown"
			@function = "null"
		end
		
  end
	
	def event
		@event
	end
	
	def function
		@function.strip
	end
	
	def bound_function
		fun_path = function.split '.'
		fun_path.pop
		obj = fun_path.join '.'
		function + ".bind( "+obj+" )"
	end
	
	def to_s
		"on:"+@event + " = " + @function.to_s
	end
	
end
