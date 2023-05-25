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

export const Workspace = createToken({
  name: 'Workspace',
  pattern: /workspace/,
})
export const Model = createToken({ name: 'Model', pattern: /model/ })
export const ExternalInclude = createToken({
  name: 'External Include',
  pattern: /!include/,
})
// export const Path = createToken({
//   name: 'Path',
//   pattern: /(?:((?:[/]?)(?:[^/]+\/)+)([^/]+))/,
// })
export const Group = createToken({ name: 'Group', pattern: /group/ })
export const Person = createToken({ name: 'Person', pattern: /person/ })
export const SoftwareSystem = createToken({
  name: 'Software System',
  pattern: /softwareSystem/,
})
export const Description = createToken({
  name: 'Description',
  pattern: /description/,
})
export const Technology = createToken({
  name: 'Technology',
  pattern: /technology/,
})

export const Relation = createToken({
  name: 'Relation',
  pattern: /->/,
})

export const Views = createToken({ name: 'Views', pattern: /views/ })
export const Properties = createToken({
  name: 'Properties',
  pattern: /properties/,
})
export const SystemContextView = createToken({
  name: 'System Context View',
  pattern: /systemContext/,
})
export const SystemLandscapeView = createToken({
  name: 'System Landscape View',
  pattern: /systemLandscape/,
})
export const ContainerView = createToken({
  name: 'Container View',
  pattern: /container/,
})
export const Title = createToken({ name: 'Title', pattern: /title/ })
export const Include = createToken({ name: 'Include', pattern: /include/ })
export const Exclude = createToken({ name: 'Exclude', pattern: /exclude/ })
export const All = createToken({ name: 'All', pattern: /\*/ })
export const AutoLayout = createToken({
  name: 'Auto Layout',
  pattern: /autoLayout/,
})
export const LayoutTopToBottom = createToken({
  name: 'Layout - Top to Bottom',
  pattern: /tb/,
})
export const LayoutBottomToTop = createToken({
  name: 'Layout - Bottom to Top',
  pattern: /bt/,
})
export const LayoutLeftToRight = createToken({
  name: 'Layout - Left to Right',
  pattern: /lr/,
})
export const LayoutRightToLeft = createToken({
  name: 'Layout - Right to Left',
  pattern: /rl/,
})
export const Theme = createToken({ name: 'Theme', pattern: /theme/ })
export const URL = createToken({
  name: 'URL',
  pattern:
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/,
})

export const Property = createToken({ name: 'Property', pattern: /\./ })
export const RelationWord = createToken({
  name: 'Relation Word',
  pattern: /relation/,
})
export const SourceProperty = createToken({
  name: 'Source property',
  pattern: /source/,
})

export const allTokens = [
  WhiteSpace,
  Comma,
  CurlyBraceLeft,
  CurlyBraceRight,
  Equals,
  Assignment,
  Comment,
  CommentMultiline,
  Integer,
  String,

  // "keywords" appear before the Identifier
  Workspace,
  Model,
  ExternalInclude,
  Group,
  Person,
  SoftwareSystem,
  Relation,
  Description,
  Technology,

  Views,
  Properties,
  SystemContextView,
  SystemLandscapeView,
  ContainerView,
  Title,
  Include,
  Exclude,
  All,
  AutoLayout,
  LayoutTopToBottom,
  LayoutBottomToTop,
  LayoutLeftToRight,
  LayoutRightToLeft,
  Theme,
  URL,

  Property,
  RelationWord,
  SourceProperty,

  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
]

const StructurizrLexer = new Lexer(allTokens)

export function lex(inputText: string): ILexingResult {
  const lexingResult = StructurizrLexer.tokenize(inputText)

  // if (lexingResult.errors.length > 0) {
  //   throw Error('Sad Sad Model, lexing errors detected')
  // }

  return lexingResult
}
