var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StencilNode_1 = require("../template/StencilNode");
var ComponentNode_1 = require("../template/ComponentNode");
var BaseRenderer_1 = require("./BaseRenderer");
var Renderer = (function (_super) {
    __extends(Renderer, _super);
    function Renderer(controlName) {
        _super.call(this);
        this.controlName = controlName;
        this.dependencies = [];
    }
    Renderer.prototype.render = function (doc) {
        this.renderInitializers(doc);
    };
    Renderer.prototype.renderInitializers = function (node) {
        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            if (child instanceof ComponentNode_1["default"]) {
                this.renderInitializer(child);
            }
            else if (child instanceof StencilNode_1["default"]) {
            }
            else {
                this.renderInitializers(child);
            }
        }
    };
    Renderer.prototype.renderInitializer = function (node) {
    };
    return Renderer;
})(BaseRenderer_1["default"]);
exports.__esModule = true;
exports["default"] = Renderer;
