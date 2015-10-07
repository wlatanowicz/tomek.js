/// <reference path="../typings/libxmljs/libxmljs.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TemplateNode_1 = require('./TemplateNode');
var ComponentNode_1 = require('./ComponentNode');
var StencilNode = (function (_super) {
    __extends(StencilNode, _super);
    function StencilNode(xmlNode) {
        _super.call(this);
        this.propertyName = xmlNode.name();
        this.placeholderNode = new ComponentNode_1["default"]("TContent");
        this.placeholderNode.parent = this;
        this.children.push(this.placeholderNode);
    }
    StencilNode.prototype.addChild = function (node) {
        this.placeholderNode.addChild(node);
    };
    return StencilNode;
})(TemplateNode_1["default"]);
exports.__esModule = true;
exports["default"] = StencilNode;
