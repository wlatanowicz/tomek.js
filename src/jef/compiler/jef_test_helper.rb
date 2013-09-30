# To change this template, choose Tools | Templates
# and open the template in the editor.

class JefTestHelper < JefHelper
	
	def initialize
		@APP_DIR       = File.join(ROOT_DIR, 'test')
		@BUILD_DIR     = File.join(ROOT_DIR, 'test_build')
	end

end
