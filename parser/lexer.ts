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

export const Workspace = createToken({
  name: 'Workspace',
  pattern: /workspace/,
})
export const Model = createToken({ name: 'Model', pattern: /model/ })
export const Group = createToken({ name: 'Group', pattern: /group/ })
export const Person = createToken({ name: 'Person', pattern: /person/ })
export const SoftwareSystem = createToken({
  name: 'Software System',
  pattern: /softwareSystem/,
})

export const RelationRight = createToken({
  name: 'Right Relation',
  pattern: /->/,
})
export const RelationLeft = createToken({
  name: 'Relation Left',
  pattern: /<-/,
})

export const Views = createToken({ name: 'Views', pattern: /views/ })
export const SystemContext = createToken({
  name: 'System Context',
  pattern: /systemContext/,
})
export const Theme = createToken({ name: 'Theme', pattern: /theme/ })

const allTokens = [
  WhiteSpace,
  Comma,
  CurlyBraceLeft,
  CurlyBraceRight,
  Assignment,
  Comment,
  CommentMultiline,
  Integer,
  String,
  // "keywords" appear before the Identifier
  Workspace,
  Model,
  Group,
  Person,
  SoftwareSystem,

  RelationRight,
  RelationLeft,
  Views,
  SystemContext,
  Theme,
  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
]

const SelectLexer = new Lexer(allTokens)

export function lex(inputText: string): ILexingResult {
  const lexingResult = SelectLexer.tokenize(inputText)

  if (lexingResult.errors.length > 0) {
    throw Error('Sad Sad Model, lexing errors detected')
  }

  return lexingResult
}
