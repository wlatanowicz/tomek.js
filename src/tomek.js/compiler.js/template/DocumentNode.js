/// <reference path="../typings/libxmljs/libxmljs.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TemplateNode_1 = require('./TemplateNode');
var DocumentNode = (function (_super) {
    __extends(DocumentNode, _super);
    function DocumentNode() {
        _super.call(this, null);
    }
    DocumentNode.prototype.getVariableName = function () {
        return "placeholder";
    };
    return DocumentNode;
})(TemplateNode_1["default"]);
exports.__esModule = true;
exports["default"] = DocumentNode;
