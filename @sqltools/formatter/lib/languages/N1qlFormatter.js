"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var abstract_1 = __importDefault(require("./utils/abstract"));
var N1qlFormatter = (function (_super) {
    __extends(N1qlFormatter, _super);
    function N1qlFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    N1qlFormatter.prototype.getTokenizerConfig = function () {
        return {
            reservedWords: reservedWords,
            reservedTopLevelWords: reservedTopLevelWords,
            reservedNewlineWords: reservedNewlineWords,
            reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
            stringTypes: ["\"\"", "''", '``'],
            openParens: ['(', '[', '{'],
            closeParens: [')', ']', '}'],
            namedPlaceholderTypes: ['$'],
            lineCommentTypes: ['#', '--'],
            specialWordChars: []
        };
    };
    return N1qlFormatter;
}(abstract_1["default"]));
exports["default"] = N1qlFormatter;
var reservedWords = [
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'ANY',
    'ARRAY',
    'AS',
    'ASC',
    'BEGIN',
    'BETWEEN',
    'BINARY',
    'BOOLEAN',
    'BREAK',
    'BUCKET',
    'BUILD',
    'BY',
    'CALL',
    'CASE',
    'CAST',
    'CLUSTER',
    'COLLATE',
    'COLLECTION',
    'COMMIT',
    'CONNECT',
    'CONTINUE',
    'CORRELATE',
    'COVER',
    'CREATE',
    'DATABASE',
    'DATASET',
    'DATASTORE',
    'DECLARE',
    'DECREMENT',
    'DELETE',
    'DERIVED',
    'DESC',
    'DESCRIBE',
    'DISTINCT',
    'DO',
    'DROP',
    'EACH',
    'ELEMENT',
    'ELSE',
    'END',
    'EVERY',
    'EXCEPT',
    'EXCLUDE',
    'EXECUTE',
    'EXISTS',
    'EXPLAIN',
    'FALSE',
    'FETCH',
    'FIRST',
    'FLATTEN',
    'FOR',
    'FORCE',
    'FROM',
    'FUNCTION',
    'GRANT',
    'GROUP',
    'GSI',
    'HAVING',
    'IF',
    'IGNORE',
    'ILIKE',
    'IN',
    'INCLUDE',
    'INCREMENT',
    'INDEX',
    'INFER',
    'INLINE',
    'INNER',
    'INSERT',
    'INTERSECT',
    'INTO',
    'IS',
    'JOIN',
    'KEY',
    'KEYS',
    'KEYSPACE',
    'KNOWN',
    'LAST',
    'LEFT',
    'LET',
    'LETTING',
    'LIKE',
    'LIMIT',
    'LSM',
    'MAP',
    'MAPPING',
    'MATCHED',
    'MATERIALIZED',
    'MERGE',
    'MISSING',
    'NAMESPACE',
    'NEST',
    'NOT',
    'NULL',
    'NUMBER',
    'OBJECT',
    'OFFSET',
    'ON',
    'OPTION',
    'OR',
    'ORDER',
    'OUTER',
    'OVER',
    'PARSE',
    'PARTITION',
    'PASSWORD',
    'PATH',
    'POOL',
    'PREPARE',
    'PRIMARY',
    'PRIVATE',
    'PRIVILEGE',
    'PROCEDURE',
    'PUBLIC',
    'RAW',
    'REALM',
    'REDUCE',
    'RENAME',
    'RETURN',
    'RETURNING',
    'REVOKE',
    'RIGHT',
    'ROLE',
    'ROLLBACK',
    'SATISFIES',
    'SCHEMA',
    'SELECT',
    'SELF',
    'SEMI',
    'SET',
    'SHOW',
    'SOME',
    'START',
    'STATISTICS',
    'STRING',
    'SYSTEM',
    'THEN',
    'TO',
    'TRANSACTION',
    'TRIGGER',
    'TRUE',
    'TRUNCATE',
    'UNDER',
    'UNION',
    'UNIQUE',
    'UNKNOWN',
    'UNNEST',
    'UNSET',
    'UPDATE',
    'UPSERT',
    'USE',
    'USER',
    'USING',
    'VALIDATE',
    'VALUE',
    'VALUED',
    'VALUES',
    'VIA',
    'VIEW',
    'WHEN',
    'WHERE',
    'WHILE',
    'WITH',
    'WITHIN',
    'WORK',
    'XOR'
];
var reservedTopLevelWords = [
    'DELETE FROM',
    'EXCEPT ALL',
    'EXCEPT',
    'EXPLAIN DELETE FROM',
    'EXPLAIN UPDATE',
    'EXPLAIN UPSERT',
    'FROM',
    'GROUP BY',
    'HAVING',
    'INFER',
    'INSERT INTO',
    'LET',
    'LIMIT',
    'MERGE',
    'NEST',
    'ORDER BY',
    'PREPARE',
    'SELECT',
    'SET CURRENT SCHEMA',
    'SET SCHEMA',
    'SET',
    'UNNEST',
    'UPDATE',
    'UPSERT',
    'USE KEYS',
    'VALUES',
    'WHERE'
];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = [
    'AND',
    'INNER JOIN',
    'JOIN',
    'LEFT JOIN',
    'LEFT OUTER JOIN',
    'OR',
    'OUTER JOIN',
    'RIGHT JOIN',
    'RIGHT OUTER JOIN',
    'XOR'
];
