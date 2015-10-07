var TextNode_1 = require('../template/TextNode');
var ComponentNode_1 = require('../template/ComponentNode');
var StencilNode_1 = require('../template/StencilNode');
var HtmlNode_1 = require('../template/HtmlNode');
var BaseRenderer = (function () {
    function BaseRenderer() {
        this.indent = 1;
        this.output = "";
    }
    BaseRenderer.prototype.pushIndent = function () {
        this.indent += 1;
    };
    BaseRenderer.prototype.popIndent = function () {
        if (this.indent > 1) {
            this.indent -= 1;
        }
    };
    BaseRenderer.prototype.addOutput = function (input) {
        var indent = (new Array(this.indent + 1).join("\t"));
        var lines = input.split("\n");
        for (var i = 0; i < lines.length; i++) {
            this.addOutputWithoutIndent(indent + lines[i]);
        }
    };
    BaseRenderer.prototype.addOutputWithoutIndent = function (input) {
        this.output += input + "\n";
    };
    BaseRenderer.prototype.varname = function (n) {
        if (n === null) {
            return "placeholdeer";
        }
        if (n instanceof HtmlNode_1["default"]) {
            return "h_" + n.variablename;
        }
        if (n instanceof ComponentNode_1["default"]) {
            return n.variablename;
        }
        if (n instanceof StencilNode_1["default"]) {
            return "item";
        }
        if (n instanceof TextNode_1["default"]) {
            return "t_" + n.variablename;
        }
        throw "error";
    };
    return BaseRenderer;
})();
exports.__esModule = true;
exports["default"] = BaseRenderer;
