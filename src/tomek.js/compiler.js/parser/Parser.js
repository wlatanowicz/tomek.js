/// <reference path="../typings/libxmljs/libxmljs.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
var fs = require('fs');
var libxmljs = require('libxmljs');
var TextNode_1 = require('../template/TextNode');
var ComponentNode_1 = require('../template/ComponentNode');
var StencilNode_1 = require('../template/StencilNode');
var HtmlNode_1 = require('../template/HtmlNode');
var DocumentNode_1 = require('../template/DocumentNode');
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.parseFile = function (path) {
        var content = fs.readFileSync(path, { "encoding": "UTF8" });
        return this.parse(content);
    };
    Parser.prototype.parse = function (xmlString) {
        var xml = libxmljs.parseXmlString(xmlString).root();
        var docNode = new DocumentNode_1["default"]();
        this.parseRecursive(docNode, xml);
        return docNode;
    };
    Parser.prototype.parseRecursive = function (parsedParent, xmlNode) {
        var children = xmlNode.childNodes();
        for (var i = 0; i < children.length; i++) {
            var parsedNode = this.createNode(children[i]);
            if (parsedNode !== null) {
                parsedParent.addChild(parsedNode);
                this.parseRecursive(parsedNode, children[i]);
            }
        }
    };
    Parser.prototype.createNode = function (xmlNode) {
        if (xmlNode.name() == 'text') {
            if (xmlNode.text().length > 0) {
                return new TextNode_1["default"](xmlNode.text());
            }
        }
        else if (xmlNode.type() == 'element') {
            if (xmlNode.namespace() !== null && xmlNode.namespace().href() == 'component') {
                return new ComponentNode_1["default"](xmlNode);
            }
            else if (xmlNode.namespace() !== null && xmlNode.namespace().href() == 'stencil') {
                return new StencilNode_1["default"](xmlNode);
            }
            else {
                return new HtmlNode_1["default"](xmlNode);
            }
        }
        return null;
    };
    return Parser;
})();
exports.__esModule = true;
exports["default"] = Parser;
