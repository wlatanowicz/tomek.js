var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TemplateNode_1 = require("./TemplateNode");
var TextExpression_1 = require("./TextExpression");
var TextNode = (function (_super) {
    __extends(TextNode, _super);
    function TextNode(text) {
        _super.call(this);
        this.raw = text;
        this.expression = new TextExpression_1["default"](text);
    }
    return TextNode;
})(TemplateNode_1["default"]);
exports.__esModule = true;
exports["default"] = TextNode;
