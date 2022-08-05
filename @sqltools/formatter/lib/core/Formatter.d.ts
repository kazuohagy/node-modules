import { Config, Token } from './types';
import Tokenizer from './Tokenizer';
export default class Formatter {
    cfg: Config;
    tokenizer: Tokenizer;
    private tokenOverride?;
    private tokens;
    private previousReservedWord;
    private previousNonWhiteSpace;
    private indentation;
    private inlineBlock;
    private params;
    private index;
    constructor(cfg: Config, tokenizer: Tokenizer, tokenOverride?: (token: Token, previousToken?: Token) => Token);
    format(query: string): string;
    getFormattedQueryFromTokens(): string;
    formatWhitespace(token: Token, query: string): string;
    formatReserved(token: Token, query: string): string;
    formatLineComment(token: Token, query: string): string;
    formatBlockComment(token: Token, query: string): string;
    indentComment(comment: string): string;
    formatTopLevelReservedWordNoIndent(token: Token, query: string): string;
    formatTopLevelReservedWord(token: Token, query: string): string;
    formatNewlineReservedWord(token: Token, query: string): string;
    equalizeWhitespace(value: string): string;
    formatOpeningParentheses(token: Token, query: string): string;
    formatClosingParentheses(token: Token, query: string): string;
    formatPlaceholder(token: Token, query: string): string;
    formatComma(token: Token, query: string): string;
    formatWithSpaceAfter(token: Token, query: string): string;
    formatWithoutSpaces(token: Token, query: string): string;
    formatWithSpaces(token: Token, query: string): string;
    formatReservedWord(value: string): string;
    formatQuerySeparator(token: Token, query: string): string;
    addNewline(query: string): string;
    previousToken(): Token;
    formatCase(value: string): string;
}