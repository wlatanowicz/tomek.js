# To change this template, choose Tools | Templates
# and open the template in the editor.

class StencilNode < TemplateNode
	
	@property_name
	@placeholder_node
	
	def property_name
		@property_name
	end
	
	def initialize node
    super
		@property_name = node.name.to_s
		@placeholder_node = ComponentNode.new "TContent"
		@placeholder_node.parent= self
		@children.push @placeholder_node
  end
	
	def add_child c
		@placeholder_node.add_child c
	end
	
end
