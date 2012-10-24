# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'template/template_node'

class TextNode < TemplateNode
  
	@expression
	
	def initialize str
    super nil
		@expression = TextExpression.new str
  end
	
	def get_js_expression
		return @expression.js_expression
	end
	
end
