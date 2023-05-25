import { Lexer, createToken, ILexingResult } from 'chevrotain'

export const Identifier = createToken({
  name: 'Identifier',
  pattern: /[a-zA-Z]\w*/,
})

export const WhiteSpace = createToken({
  name: 'Whitespace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
})
export const Comma = createToken({ name: 'Comma', pattern: /,/ })
export const Assignment = createToken({ name: 'Assignment', pattern: /=/ })
export const Equals = createToken({ name: 'Equals', pattern: /==/ })
export const CurlyBraceLeft = createToken({
  name: 'Curly Brace Left',
  pattern: /{/,
})
export const CurlyBraceRight = createToken({
  name: 'Curly Brace Right',
  pattern: /}/,
})
export const Comment = createToken({ name: 'Comment', pattern: /\/\/.*/ })
export const CommentMultiline = createToken({
  name: 'Comment',
  pattern: /\/\*.*\*\//,
})
export const Integer = createToken({ name: 'Integer', pattern: /0|[1-9]\d*/ })
export const String = createToken({ name: 'String', pattern: /".*"/ })

export const Property = createToken({
  name: 'Property',
  pattern: /"?[a-zA-Z]+\.[a-zA-Z]+"?/,
})
export const Keyword = createToken({
  name: 'Keyword',
  pattern:
    /(workspace)|(model)|(views)|(properties)|(systemLandscape)|(systemContext)|(container)|(system)|(softwareSystem)|(person)|(!include)|(description)|(title)|(technology)|(include)|(exclude)|(autoLayout)|(tb)|(bt)|(lr)|(rl)|(theme)/,
})
export const Relation = createToken({ name: 'Relation', pattern: /->/ })
export const All = createToken({ name: 'All', pattern: /\*/ })
export const URL = createToken({
  name: 'URL',
  pattern:
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/,
})

const allTokens = [
  WhiteSpace,
  Comma,
  CurlyBraceLeft,
  CurlyBraceRight,
  Equals,
  Assignment,
  Comment,
  CommentMultiline,
  Integer,

  // "keywords" appear before the Identifier
  Property,
  // String must be after Property due to the "x.y" option
  String,
  Keyword,
  Relation,
  All,
  URL,

  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
]

const SimplifiedStructurizrLexer = new Lexer(allTokens)

export function lex(inputText: string): ILexingResult {
  const lexingResult = SimplifiedStructurizrLexer.tokenize(inputText)

  return lexingResult
}
