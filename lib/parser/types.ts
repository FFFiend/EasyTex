import { Token } from "../lexer/types.ts";
import { Node } from "./node.ts";
import { UnrecognizedTokenError } from "./errors.ts";

// Re-export types.
export { Node } from "./node.ts";

// These nodes never have any children. Their data
// contains raw strings which will be written to
// the LaTeX files as-is.
export enum LeafType {
    // Plain word
    WORD,
    // @xyz
    AT_DELIM,
    // TEX <<< EOF ... EOF
    HEREDOC_TEX,
    // $ ... $
    TEX_INLINE_MATH,
    // $$ ... $$
    TEX_DISPLAY_MATH,
    // \( ... \)
    LATEX_INLINE_MATH,
    // \[ ... \]
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
    ITEMIZE, ENUMERATE, LIST_ITEM,

    // Paragraph
    PARAGRAPH
}

// Each node is either a leaf node or a branch node.
export type NodeType = LeafType | BranchType;

// All nodes that carry data have at least
// a lexeme and rightPad field.
export type BaseNodeData = {
    lexeme: string,
    rightPad: string
}

// Enclosed nodes (BOLD, ITALIC, etc.)
export type EnclosedNodeData = BaseNodeData & {
    leftPad: string
}

// RAW_TEX
export type RawTexData = BaseNodeData & {
    // The delimiter used.
    delimiter: string
}

// LINK and IMAGE
export type LinkImageData = BaseNodeData & {
    // The image path or uri for links.
    ref: string,
    leftPad: string
}

// TeX macro/command calls inside document
// TODO: Currently we don't parse macro calls
// TODO: so this has no use for now.
export type MacroCallData = BaseNodeData & {
    name: string,
    args: string[]
}

export type NodeData
    = BaseNodeData
    | EnclosedNodeData
    | RawTexData
    | LinkImageData
    | MacroCallData
    | null;

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
export type ParserError = UnrecognizedTokenError

// Keep track of parser state.
export type ParserState = {
    tokens: Token[],
    position: number,
    tree: AST,
    macroDefs: MacroDefData[],
    errors: ParserError[]
}
