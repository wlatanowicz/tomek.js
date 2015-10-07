/// <reference path="../typings/libxmljs/libxmljs.d.ts" />
var libxmljs = require('libxmljs');
var TextExpression_1 = require("./TextExpression");
var Attribute = (function () {
    function Attribute(attr) {
        if (attr instanceof libxmljs.Element) {
            this.name = attr.name();
            this.value = new TextExpression_1["default"](attr.text());
        }
        else {
            //means it is libxmljs.Attribute
            //attr instanceof libxmljs.Attribute FAILS!
            this.name = attr.name();
            if (attr.namespace() !== null) {
                this.namespace = attr.namespace().name();
            }
            this.value = new TextExpression_1["default"](attr.value());
        }
    }
    return Attribute;
})();
exports.__esModule = true;
exports["default"] = Attribute;
