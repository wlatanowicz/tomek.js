# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'json'

class TextExpression
 
	@str
	
	def initialize str
    @str = str.to_s
  end
	
	def to_s
		@str.strip
	end
	
	def js_expression
		escape_js_string @str.strip
	end
	
	def escape_js_string str
		str.to_json
	end
	
	
	
end
