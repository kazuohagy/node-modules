/**
 * Specificity as defined by Selectors spec.
 *
 * {@link https://www.w3.org/TR/selectors/#specificity}
 *
 * Three levels: for id, class, tag (type).
 *
 * Extra level(s) used in HTML styling don't fit the scope of this package
 * and no space reserved for them.
 */
export declare type Specificity = [number, number, number];
/**
 * The `*` selector.
 *
 * {@link https://www.w3.org/TR/selectors/#the-universal-selector}
 *
 * `parseley` considers tag name and universal selectors to be unrelated entities
 * for simplicity of processing.
 */
export declare type UniversalSelector = {
    type: 'universal';
    namespace: string | null;
    specificity: Specificity;
};
/**
 * Tag name (type) selector.
 *
 * {@link https://www.w3.org/TR/selectors/#type-selectors}
 *
 * `parseley` considers tag name and universal selectors to be unrelated entities
 * for simplicity of processing.
 */
export declare type TagSelector = {
    type: 'tag';
    name: string;
    namespace: string | null;
    specificity: Specificity;
};
/**
 * Class selector.
 *
 * {@link https://www.w3.org/TR/selectors/#class-html}
 */
export declare type ClassSelector = {
    type: 'class';
    name: string;
    specificity: Specificity;
};
/**
 * Id selector.
 *
 * {@link https://www.w3.org/TR/selectors/#id-selectors}
 */
export declare type IdSelector = {
    type: 'id';
    name: string;
    specificity: Specificity;
};
/**
 * Attribute presence selector.
 *
 * {@link https://www.w3.org/TR/selectors/#attribute-selectors}
 *
 * `parseley` considers attribute presence and value selectors to be unrelated entities
 * for simplicity of processing.
 */
export declare type AttrabutePresenceSelector = {
    type: 'attrPresence';
    name: string;
    namespace: string | null;
    specificity: Specificity;
};
/**
 * Attribute value selector.
 *
 * {@link https://www.w3.org/TR/selectors/#attribute-selectors}
 *
 * `parseley` considers attribute presence and value selectors to be unrelated entities
 * for simplicity of processing.
 */
export declare type AttrabuteValueSelector = {
    type: 'attrValue';
    name: string;
    namespace: string | null;
    matcher: '=' | '~=' | '|=' | '^=' | '$=' | '*=';
    value: string;
    modifier: 'i' | 's' | null;
    specificity: Specificity;
};
/**
 * Represents a selectors combinator with what's on the left side of it.
 *
 * {@link https://www.w3.org/TR/selectors/#combinators}
 */
export declare type Combinator = {
    type: 'combinator';
    combinator: ' ' | '+' | '>' | '~' | '||';
    left: CompoundSelector;
    specificity: Specificity;
};
/**
 * Any thing representing a single condition on an element.
 *
 * {@link https://www.w3.org/TR/selectors/#simple}
 *
 * `parseley` deviates from the spec here by adding `Combinator` to the enumeration.
 * This is done for simplicity of processing.
 *
 * Combinator effectively considered an extra condition on a specific element
 * (*"have this kind of element in relation"*).
 */
export declare type SimpleSelector = UniversalSelector | TagSelector | ClassSelector | IdSelector | AttrabutePresenceSelector | AttrabuteValueSelector | Combinator;
/**
 * Compound selector - a set of conditions describing a single element.
 *
 * {@link https://www.w3.org/TR/selectors/#compound}
 *
 * {@link https://www.w3.org/TR/selectors/#complex}
 *
 * Important note: due to the way `parseley` represents combinators,
 * every compound selector is also a complex selector with everything
 * connected from the left side.
 * Specificity value also includes any extra weight added by the left side.
 *
 * If there is a combinator in the selector - it is guaranteed to be
 * the last entry in the list of inner selectors.
 */
export declare type CompoundSelector = {
    type: 'compound';
    list: SimpleSelector[];
    specificity: Specificity;
};
/**
 * Represents a comma-separated list of compound selectors.
 *
 * {@link https://www.w3.org/TR/selectors/#selector-list}
 *
 * As this kind of selector can combine different ways to match elements,
 * a single specificity value doesn't make sense for it and therefore absent.
 */
export declare type ListSelector = {
    type: 'list';
    list: CompoundSelector[];
};
/**
 * Any kind of selector supported by `parseley`.
 */
export declare type Selector = ListSelector | CompoundSelector | SimpleSelector;
