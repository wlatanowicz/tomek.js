# To change this template, choose Tools | Templates
# and open the template in the editor.

class StencilNode < TemplateNode
	
	@property_name
	
	def property_name
		@property_name
	end
	
	def initialize node
    super
		@property_name = node.name.to_s
  end
	
end
