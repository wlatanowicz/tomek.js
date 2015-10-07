/// <reference path="../typings/libxmljs/libxmljs.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var libxmljs = require('libxmljs');
var TemplateNode_1 = require('./TemplateNode');
var ComponentNode = (function (_super) {
    __extends(ComponentNode, _super);
    function ComponentNode(xmlNode) {
        if (xmlNode instanceof libxmljs.Element) {
            _super.call(this, xmlNode);
            this.classname = xmlNode.name();
        }
        else if (typeof xmlNode == "string") {
            _super.call(this);
            this.classname = xmlNode;
        }
    }
    return ComponentNode;
})(TemplateNode_1["default"]);
exports.__esModule = true;
exports["default"] = ComponentNode;
