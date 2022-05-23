import { Token } from "../lexer/types.ts";

// Macro definitions.
export type MacroDefData = {
    name: string,
    params: string[],
    body: string
}

// Keep track of parser state.
export type ParserState = {
    tokens: Token[],
    position: number,
    tree: AST,
    macroDefs: MacroDefData[]
}

// These nodes never have any children. Their data
// contains raw strings which will be written to
// the LaTeX files as-is.
export enum LeafType {
    WORD,
    AT_DELIM,
    RAW_TEX,
    TEX_INLINE_MATH,
    TEX_DISPLAY_MATH,
    LATEX_INLINE_MATH,
    LATEX_DISPLAY_MATH,
}

// These nodes always have children. They may or may
// not contain extra data about the node.
export enum BranchType {
    // Emphasis
    ITALIC, BOLD, UNDERLINE, STRIKETHROUGH,

    // SECTIONS
    SECTION, SUBSECTION, SUBSUBSECTION,
    SECTION_STAR, SUBSECTION_STAR, SUBSUBSECTION_STAR,

    // Links/Images
    LINK, IMAGE,

    // Lists
    ITEMIZE, ENUMERATE,

    // Paragraph
    PARAGRAPH
}

export type NodeData = string | null;

// Each node is either a leaf node or a branch node.
export type NodeType = LeafType | BranchType;

// The tree structure.
export type Node = {
    col: number,
    row: number,
    type: NodeType,
    data: NodeData,
    position: number
    children?: Node[],
};

// The AST is a list of nodes.
export type AST = Node[]

// Macro definitions. Note this isn't included
// in NodeData because it's attached separately
// to the state (in the macroDefs list).
export type MacroDefData = {
    name: string,
    params: string[],
    body: string
}

// Errors. Right now unimplemented.
export type ParserError = ParseError

// Keep track of parser state.
export type ParserState = {
    tokens: Token[],
    position: number,
    tree: AST,
    macroDefs: MacroDefData[],
    errors: ParserError[]
}
