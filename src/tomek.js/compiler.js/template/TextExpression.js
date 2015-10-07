var TextExpression = (function () {
    function TextExpression(expr) {
        this.epression = this.createExpressionString(expr);
    }
    TextExpression.prototype.createExpressionString = function (str) {
        var parts = [];
        var l = str.length;
        var i = 0;
        var part = "";
        var mode = "text";
        while (i < (l + 1)) {
            if (mode == "text" && str.substring(i, i + 3) == "[%@") {
                mode = "trans";
                i += 3;
                if (part.length > 0) {
                    parts.push(JSON.stringify(part));
                }
                part = "";
            }
            if (mode == "text" && str.substring(i, i + 3) == "[%=") {
                mode = "expr";
                i += 3;
                if (part.length > 0) {
                    parts.push(JSON.stringify(part));
                }
                part = "";
            }
            if (mode == "trans" && str.substring(i, i + 2) == "%]") {
                mode = "text";
                i += 2;
                if (part.length > 0) {
                    //@TODO
                    var translation = "";
                    parts.push(JSON.stringify(translation));
                }
                part = "";
            }
            if (mode == "expr" && str.substring(i, i + 2) == "%]") {
                mode = "text";
                i += 2;
                if (part.length > 0) {
                    //@TODO
                    var expr_part = "( new TExpression( function(){ return (" + part + "); }.bind( ExpressionContext ) ) )";
                    parts.push(expr_part);
                }
                part = "";
            }
            if (i < l) {
                part += str.substring(i, i + 1);
            }
            i += 1;
        }
        if (parts.length <= 0) {
            parts.push("");
        }
        return parts.join("+");
    };
    return TextExpression;
})();
exports.__esModule = true;
exports["default"] = TextExpression;
