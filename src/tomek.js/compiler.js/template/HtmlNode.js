/// <reference path="../typings/libxmljs/libxmljs.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TemplateNode_1 = require('./TemplateNode');
var HtmlNode = (function (_super) {
    __extends(HtmlNode, _super);
    function HtmlNode(xmlNode) {
        _super.call(this);
        this.tag = xmlNode.name();
        if (xmlNode.namespace() !== null) {
            this.namespace = xmlNode.namespace().href();
        }
    }
    return HtmlNode;
})(TemplateNode_1["default"]);
exports.__esModule = true;
exports["default"] = HtmlNode;
