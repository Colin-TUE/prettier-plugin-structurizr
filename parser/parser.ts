import {
  CurlyBraceLeft,
  CurlyBraceRight,
  ExternalInclude,
  Model,
  Identifier,
  String,
  Views,
  Workspace,
  allTokens,
  lex,
} from './lexer'

import { CstParser } from 'chevrotain'

class StructurizrParser extends CstParser {
  constructor() {
    super(allTokens)
    this.performSelfAnalysis()
  }

  public structurizr = this.RULE('main', () => {
    this.OPTION(this.workspace)
  })

  public workspace = this.RULE('workspace', () => {
    this.CONSUME(Workspace)
    this.CONSUME(String)
    this.CONSUME(CurlyBraceLeft)

    this.OPTION1(this.model)
    this.OPTION2(this.views)

    this.CONSUME(CurlyBraceRight)
  })

  public model = this.RULE('model', () => {
    this.CONSUME(Model)
    this.CONSUME1(CurlyBraceLeft)

    this.OPTION3(this.include)

    this.CONSUME1(CurlyBraceRight)
  })

  public include = this.RULE('external include', () => {
    this.CONSUME(ExternalInclude)
    this.CONSUME1(Identifier)
  })

  public views = this.RULE('views', () => {
    this.CONSUME(Views)
    this.CONSUME2(CurlyBraceLeft)

    this.CONSUME2(CurlyBraceRight)
  })
}

const parser = new StructurizrParser()

export function parseInput(inputText: string) {
  const lexingResult = lex(inputText)
  // "input" is a setter which will reset the parser's state.
  parser.input = lexingResult.tokens
  const cst = parser.structurizr()

  // if (parser.errors.length > 0) {
  //   throw new Error('Sad Sad Model, parsing errors detected')
  // }

  return { errors: parser.errors, cst: cst }
}
