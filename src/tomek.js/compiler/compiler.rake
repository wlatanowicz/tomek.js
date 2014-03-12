# 
# To change this template, choose Tools | Templates
# and open the template in the editor.
 



require 'rake'
require 'rake/packagetask'
require 'yaml'

require_relative 'tomek_helper'
require_relative 'tomek_test_helper'
require_relative 'tomek_doc_helper'

task :default => [:dist]

task :dist => ['dist:build']
task :debug => ['dist:build_debug']

task :clean => ['clean:tmp', 'clean:dist', 'clean:test', 'clean:doc']

task :doc => ['doc:build']

task :test => ['test:build', 'test:run']
task :update_tests => ['test:update']

namespace :dist do
	desc "Builds the application and compresses output."
	task :build => ['clean:tmp', 'clean:dist'] do
		jh = TomekHelper.new
		jh.compile_templates
		jh.copy_resources
		jh.sprocketize true
	end
	
	desc "Builds the application without compressing output."
	task :build_debug => ['clean:tmp', 'clean:dist'] do
		jh = TomekHelper.new
		jh.compile_templates
		jh.copy_resources
		jh.sprocketize false
	end
end

namespace :doc do
  desc "Builds the documentation."
  task :build => [ :require, 'clean:doc' ] do
		jh = TomekDocHelper.new
		jh.build_doc
  end
  
  task :require do
		jh = TomekDocHelper.new
		jh.require_pdoc
  end
end

namespace :test do
  desc 'Runs all the JavaScript tests and collects the results'
  task :run => [:build] do
		jh = TomekTestHelper.new
		url = jh.index_file
		Kernel.system( "open -a Firefox #{url}" )
  end
  
  desc 'Builds test application and environment'
  task :build => ['clean:tmp', 'clean:test'] do
		jh = TomekTestHelper.new
		jh.compile_templates
		jh.copy_resources
		jh.sprocketize true
  end

  desc 'Updates list of tests'
  task :update do
		jh = TomekTestHelper.new
		jh.update_tests
  end

end

namespace :clean do
  
  desc 'Cleans up temp dir'
  task :tmp do
		jh = TomekHelper.new
		jh.empty_tmp
  end

  desc 'Cleans up build dir'
  task :dist do
		jh = TomekHelper.new
		jh.empty_build
  end

  desc 'Cleans up test-build dir'
  task :test do
		jh = TomekTestHelper.new
		jh.empty_build
  end

  desc 'Cleans up doc dir'
  task :doc do
		jh = TomekDocHelper.new
		jh.empty_doc
  end

end

