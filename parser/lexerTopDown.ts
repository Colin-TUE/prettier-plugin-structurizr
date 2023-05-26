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
export const AssignmentSign = createToken({ name: 'Assignment', pattern: /=/ })
export const EqualSign = createToken({ name: 'Equals', pattern: /==/ })
export const CurlyBraceLeft = createToken({
  name: 'Curly Brace Left',
  pattern: /{/,
})
export const CurlyBraceRight = createToken({
  name: 'Curly Brace Right',
  pattern: /}/,
})

export const Comment = createToken({
  name: 'Comment',
  pattern: /\/\/.*/,
  //TODO: Temporarily not include comments, so that we can focus on the rest of the DSL
  group: Lexer.SKIPPED,
})
export const CommentMultiline = createToken({
  name: 'Comment',
  pattern: /\/\*.*\*\//,
  //TODO: Temporarily not include comments, so that we can focus on the rest of the DSL
  group: Lexer.SKIPPED,
})

export const IntegerValue = createToken({
  name: 'Integer',
  pattern: /0|[1-9]\d*/,
})
export const StringValue = createToken({ name: 'String', pattern: /".*"/ })
export const All = createToken({ name: 'All', pattern: /\*/ })
export const Url = createToken({
  name: 'URL',
  pattern:
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/,
})

export const Property = createToken({
  name: 'Property',
  pattern: /"?[a-zA-Z]+\.[a-zA-Z]+"?/,
})
export const DefinitionPropertyKeyword = createToken({
  name: 'Definition Property',
  pattern: /(description)|(title)|(technology)/,
})
export const WorkspaceKeyword = createToken({
  name: 'Workspace',
  pattern: /workspace/,
})
export const ModelKeyword = createToken({ name: 'Model', pattern: /model/ })
export const ViewsKeyword = createToken({ name: 'Views', pattern: /views/ })
export const PropertiesKeyword = createToken({
  name: 'Properties',
  pattern: /properties/,
})
export const ModelDefinitionKeyword = createToken({
  name: 'Model Definition',
  pattern: /(person)|(softwareSystem)|(deploymentEnvironment)|(component)/,
})
export const ViewDefinitionKeyword = createToken({
  name: 'View Definition',
  pattern:
    /(systemLandscape)|(systemContext)|(dynamic)|(component)|(deployment)/,
})
// Create explicit container keyword so that it cna be used both for model and view definitions
export const ContainerKeyword = createToken({
  name: 'container',
  pattern: /container/,
})
export const AutoLayoutKeyword = createToken({
  name: 'Auto Layout',
  pattern: /autoLayout/,
})
export const LayoutDirection = createToken({
  name: 'Layout Direction',
  pattern: /(tb)|(bt)|(lr)|(rl)/,
})
export const ThemeKeyword = createToken({ name: 'Theme', pattern: /theme/ })
export const Relation = createToken({ name: 'Relation', pattern: /->/ })
export const IncludeExcludeKeyword = createToken({
  name: 'Include / Exclude',
  pattern: /(include)|(exclude)/,
})
export const ExternalInclude = createToken({
  name: 'External Include',
  pattern: /!include/,
})

export const allTokens = [
  WhiteSpace,
  CurlyBraceLeft,
  CurlyBraceRight,
  EqualSign,
  AssignmentSign,
  Comment,
  CommentMultiline,
  IntegerValue,

  // "keywords" appear before the Identifier
  Property,
  // String must be after Property due to the "x.y" option
  StringValue,
  Relation,
  All,
  Url,

  WorkspaceKeyword,
  PropertiesKeyword,
  DefinitionPropertyKeyword,
  ModelKeyword,
  ModelDefinitionKeyword,
  ExternalInclude,

  ViewsKeyword,
  ViewDefinitionKeyword,
  IncludeExcludeKeyword,
  AutoLayoutKeyword,
  LayoutDirection,
  ThemeKeyword,
  ContainerKeyword,

  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
]

const StructurizrLexerTopDown = new Lexer(allTokens)

export function lex(inputText: string): ILexingResult {
  const lexingResult = StructurizrLexerTopDown.tokenize(inputText)

  return lexingResult
}
