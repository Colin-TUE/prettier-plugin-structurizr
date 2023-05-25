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
  Assignment,
  Relation,
  WhiteSpace,
} from './lexer'

import { CstParser } from 'chevrotain'

class StructurizrParser extends CstParser {
  constructor() {
    super(allTokens)
    this.performSelfAnalysis()
  }

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

    this.OPTION3(this.externalInclude)

    this.MANY({
      DEF: () => {
        this.OR([
          {
            ALT: () => {
              this.CONSUME(Identifier)
              this.CONSUME(Assignment)
              this.SUBRULE1(this.modelElement)
            },
          },
          {
            ALT: () => {
              this.SUBRULE2(this.modelElement)
            },
          },
          { ALT: () => this.SUBRULE(this.relation) },
        ])
      },
    })

    this.CONSUME1(CurlyBraceRight)
  })

  private externalInclude = this.RULE('external include', () => {
    this.CONSUME(ExternalInclude)
    this.CONSUME4(Identifier)
  })

  private modelElement = this.RULE('model element', () => {
    this.CONSUME(WhiteSpace)
  })

  private relation = this.RULE('relation', () => {
    this.CONSUME1(Identifier)
    this.CONSUME(Relation)
    this.CONSUME2(Identifier)
    this.CONSUME(String)
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
  const cst = parser.workspace()

  // if (parser.errors.length > 0) {
  //   throw new Error('Sad Sad Model, parsing errors detected')
  // }

  return { errors: parser.errors, cst: cst }
}
