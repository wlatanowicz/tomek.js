# To change this template, choose Tools | Templates
# and open the template in the editor.

require 'rubygems'
require 'nokogiri'

require 'template/template'

class Parser
  def initialize
    
  end
	
	def parse_recursive( parent, node )
		
		node.children.each do |ch|
			
			tplnode = create_node ch
			
			if ( tplnode != nil ) then
				parent.add_child tplnode

				parse_recursive tplnode, ch
			end
			
		end
		
	end
	
	def parse( str )
		doc = Nokogiri::XML( str ){ |config|
			config.strict
			config.options |= Nokogiri::XML::ParseOptions::PEDANTIC
		}
		node = DocumentNode.new
		parse_recursive( node, doc.at( "template" ) )
		return node
	end
	
	def create_node ( node )
		if ( node.type == Nokogiri::XML::Node::TEXT_NODE ) then
			if ( node.text.length > 0 )then
				return TextNode.new node
			end
		end
		if ( node.type == Nokogiri::XML::Node::ELEMENT_NODE ) then
			if ( node.namespace != nil && node.namespace.href == 'component' ) then
				return ComponentNode.new node
			elsif ( node.namespace != nil && node.namespace.href == 'stencil' ) then
				return StencilNode.new node
			else
				return HtmlNode.new node
			end
		end
		return nil
	end
	
end
