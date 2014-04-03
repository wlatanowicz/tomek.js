# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'template/template_node'

class ComponentNode < TemplateNode
  
	@classname
	
	def classname
		@classname
	end
	
	def initialize node
		if ( node.is_a?( String ) )
			@classname = node
			node = nil
		else
			@classname = node.name.to_s
		end
    super
  end
		
end
