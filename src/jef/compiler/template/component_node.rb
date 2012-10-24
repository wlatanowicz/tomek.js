# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'template/template_node'

class ComponentNode < TemplateNode
  
	@classname
	
	def classname
		@classname
	end
	
	def initialize node
    super
		@classname = node.name.to_s
  end
	
end
