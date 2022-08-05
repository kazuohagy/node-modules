/**
 * Result object returned by InsertQueryBuilder execution.
 */
var InsertResult = /** @class */ (function () {
    function InsertResult() {
        /**
         * Contains inserted entity id.
         * Has entity-like structure (not just column database name and values).
         */
        this.identifiers = [];
        /**
         * Generated values returned by a database.
         * Has entity-like structure (not just column database name and values).
         */
        this.generatedMaps = [];
    }
    InsertResult.from = function (queryResult) {
        var result = new this();
        result.raw = queryResult.raw;
        return result;
    };
    return InsertResult;
}());
export { InsertResult };

//# sourceMappingURL=InsertResult.js.map
