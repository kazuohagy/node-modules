"use strict";
exports.__esModule = true;
exports.TokenTypes = void 0;
var TokenTypes;
(function (TokenTypes) {
    TokenTypes["WHITESPACE"] = "whitespace";
    TokenTypes["WORD"] = "word";
    TokenTypes["STRING"] = "string";
    TokenTypes["RESERVED"] = "reserved";
    TokenTypes["RESERVED_TOP_LEVEL"] = "reserved-top-level";
    TokenTypes["RESERVED_TOP_LEVEL_NO_INDENT"] = "reserved-top-level-no-indent";
    TokenTypes["RESERVED_NEWLINE"] = "reserved-newline";
    TokenTypes["OPERATOR"] = "operator";
    TokenTypes["NO_SPACE_OPERATOR"] = "no-space-operator";
    TokenTypes["OPEN_PAREN"] = "open-paren";
    TokenTypes["CLOSE_PAREN"] = "close-paren";
    TokenTypes["LINE_COMMENT"] = "line-comment";
    TokenTypes["BLOCK_COMMENT"] = "block-comment";
    TokenTypes["NUMBER"] = "number";
    TokenTypes["PLACEHOLDER"] = "placeholder";
    TokenTypes["SERVERVARIABLE"] = "servervariable";
})(TokenTypes = exports.TokenTypes || (exports.TokenTypes = {}));
