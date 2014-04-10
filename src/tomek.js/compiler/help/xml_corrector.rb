# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.


class XmlCorrector
	
	def correct xml, e

		i = 1
		margin  = 4
		
		xml.lines.each do |line|
			if ( i == ( e.line - margin ) or
					i == ( e.line + margin ) )
					puts "..."
			end
			
			if ( i > ( e.line - margin ) and
						i < ( e.line + margin ) )
				if ( i == e.line )
					print line.red
				else
					print line
				end
			end
			i = i+1
		end
		
	end
	
end