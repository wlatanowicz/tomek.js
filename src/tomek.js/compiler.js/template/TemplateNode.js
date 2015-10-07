/// <reference path="../typings/libxmljs/libxmljs.d.ts" />
var Attribute_1 = require('./Attribute');
var EventAttribute_1 = require('./EventAttribute');
var TemplateNode = (function () {
    function TemplateNode(xmlNode) {
        if (xmlNode === void 0) { xmlNode = null; }
        this.attributes = [];
        this.events = [];
        this.children = [];
        this.parent = null;
        this.variableName = null;
        this.stripSpaces = null;
        if (xmlNode !== null) {
            var children = xmlNode.childNodes();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.namespace() !== null
                    && child.namespace().href() == 'property') {
                    this.attributes.push(new Attribute_1["default"](child));
                }
                if (child.namespace() !== null
                    && child.namespace().href() == 'event') {
                    this.events.push(new EventAttribute_1["default"](xmlNode));
                }
            }
            var attrs = xmlNode.attrs();
            for (var j = 0; j < attrs.length; j++) {
                var attr = attrs[j];
                if (attr.namespace() !== null
                    && attr.namespace().href() == 'tomek') {
                    this.processOption(attr.name(), attr.value());
                }
                else if (attr.namespace() !== null
                    && attr.namespace().href() == 'event') {
                    this.events.push(new EventAttribute_1["default"](attr));
                }
                else {
                    this.attributes.push(new Attribute_1["default"](attr));
                }
            }
        }
    }
    TemplateNode.prototype.processOption = function (name, value) {
        if (name == 'StripWhitespace') {
            if (value.toLowerCase() == 'yes') {
                this.stripSpaces = true;
            }
            if (value.toLowerCase() == 'no') {
                this.stripSpaces = false;
            }
        }
    };
    TemplateNode.prototype.getStripSpaces = function () {
        if (this.stripSpaces !== null) {
            return this.stripSpaces;
        }
        if (this.parent !== null) {
            return this.parent.getStripSpaces();
        }
        return TemplateNode.DEFAULT_STRIP_SPACES;
    };
    TemplateNode.prototype.addChild = function (node) {
        node.parent = this;
        this.children.push(node);
    };
    TemplateNode.prototype.getVariableName = function () {
        if (this.variableName === null) {
            TemplateNode.variableNameNumber++;
            this.variableName = "c" + TemplateNode.variableNameNumber;
        }
        return this.variableName;
    };
    TemplateNode.variableNameNumber = 0;
    TemplateNode.DEFAULT_STRIP_SPACES = true;
    return TemplateNode;
})();
exports.__esModule = true;
exports["default"] = TemplateNode;
