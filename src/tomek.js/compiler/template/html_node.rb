# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'template/template_node'

class HtmlNode < TemplateNode
  
	@tag
	@namespace
	
	def tag
		@tag
	end
	
	def namespace
		@namespace
	end
	
	def initialize node
    super
		@tag = node.name.to_s
		@namespace = nil
		if ( node.namespace != nil )
			@namespace = node.namespace.href.to_s
		end
  end
	
end
