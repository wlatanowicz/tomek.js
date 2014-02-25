# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'template/template_node'

class HtmlNode < TemplateNode
  
	@tag
	
	def tag
		@tag
	end
	
	def initialize node
    super
		@tag = node.name.to_s
  end
	
end
