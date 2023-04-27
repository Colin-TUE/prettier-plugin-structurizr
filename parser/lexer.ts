import {
  Lexer,
  type TokenType,
  createToken,
  type ILexingResult,
} from 'chevrotain'

const Identifier = createToken({ name: 'Identifier', pattern: /[a-zA-Z]\w*/ })

const WhiteSpace = createToken({
  name: 'Whitespace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
})
const Comma = createToken({ name: 'Comma', pattern: /,/ })
const Assignment = createToken({ name: 'Assignment', pattern: /=/ })
const CurlyBraceLeft = createToken({ name: 'Curly Brace Left', pattern: /{/ })
const CurlyBraceRight = createToken({
  name: 'Curly Brace Right',
  pattern: /}/,
})
const Comment = createToken({ name: 'Comment', pattern: /\/\/.*/ })
const CommentMultiline = createToken({
  name: 'Comment',
  pattern: /\/\*.*\*\//,
})

const Integer = createToken({ name: 'Integer', pattern: /0|[1-9]\d*/ })
const String = createToken({ name: 'String', pattern: /".*"/ })

const Workspace = createToken({ name: 'Workspace', pattern: /workspace/ })
const Model = createToken({ name: 'Model', pattern: /model/ })
const Group = createToken({ name: 'Group', pattern: /group/ })
const Person = createToken({ name: 'Person', pattern: /person/ })
const SoftwareSystem = createToken({
  name: 'Software System',
  pattern: /softwareSystem/,
})

const RelationRight = createToken({ name: 'Right Relation', pattern: /->/ })
const RelationLeft = createToken({ name: 'Relation Left', pattern: /<-/ })

const Views = createToken({ name: 'Views', pattern: /views/ })
const SystemContext = createToken({
  name: 'System Context',
  pattern: /systemContext/,
})
const Theme = createToken({ name: 'Theme', pattern: /theme/ })

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

export const tokenVocabulary: Record<string, TokenType> = {}

allTokens.forEach((tokenType: TokenType) => {
  tokenVocabulary.tokenType = tokenType
})

const SelectLexer = new Lexer(allTokens)

export function lex(inputText: string): ILexingResult {
  const lexingResult = SelectLexer.tokenize(inputText)

  if (lexingResult.errors.length > 0) {
    throw Error('Sad Sad Model, lexing errors detected')
  }

  return lexingResult
}
