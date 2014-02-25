# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'json'

class TextExpression
 
	class JSString < String
		
	end
	
	class JSExpression < String
		
	end
	
	@str
	
	def initialize str
		parts = []
		
		mode = "text"
		part = ""
		
		i = 0
		str = str.to_s.strip
		l = str.length
		
		while i < ( l + 1 ) do
		
			if mode == "text" and ( i >= l or str[i,3] == "[%=" ) then
				mode = "expr"
				i += 3
				
				part = part.strip
				if part.length > 0 then
					part = part.to_json
					parts.push part
				end
				
				part = ""
			end
			
			if mode == "expr" and ( i >= l or str[i,2] == "%]" ) then
				mode = "text"
				i += 2
				
				part = part.strip
				if part.length > 0 then
					part = "( new TExpression( function(){ return ("+part+"); }.bind( ExpressionContext ) ) )"
					parts.push part
				end
				
				part = ""
			end
			
			if ( i < l ) then
				part += str[i,1]
			end
			
			i += 1
		end

    @str = parts.join( "+" )
  end
	
	def to_s
		@str
	end
	
	def js_expression
		@str
	end
	
	def escape_js_string str
		str.to_json
	end
	
	
	
end
