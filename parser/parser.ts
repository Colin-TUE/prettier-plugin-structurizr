import {
  CurlyBraceLeft,
  CurlyBraceRight,
  Identifier,
  String,
  allTokens,
  lex,
  Assignment,
  Relation,
  WhiteSpace,
  Keyword,
  Property,
  Equals,
  Integer,
} from './simplifiedLexer'

import { CstParser } from 'chevrotain'

class StructurizrParser extends CstParser {
  constructor() {
    super(allTokens)
    this.performSelfAnalysis()
  }

  public workspace = this.RULE('workspace', () => {
    this.CONSUME(Keyword)
    this.CONSUME(String)
    this.CONSUME(CurlyBraceLeft)

    this.MANY(this.model)

    this.CONSUME(CurlyBraceRight)
  })

  public model = this.RULE('model', () => {
    this.CONSUME1(Keyword)
    this.CONSUME1(CurlyBraceLeft)

    this.OPTION3(this.externalInclude)

    this.MANY1({
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
    this.CONSUME2(Keyword)
    this.CONSUME4(Identifier)
  })

  public modelElement = this.RULE('modelElement', () => {
    this.CONSUME3(Keyword)
    this.OPTION2(this.identifierOption)
    this.OPTION(this.elementName)
    this.OPTION1({
      DEF: () => {
        this.CONSUME(CurlyBraceLeft)

        // TODO: potential more things inside
        this.MANY({
          DEF: () => {
            this.OR([
              { ALT: () => this.SUBRULE(this.elementProperty) },
              { ALT: () => this.SUBRULE(this.innerElement) },
            ])
          },
        })

        this.CONSUME(CurlyBraceRight)
      },
    })
  })

  private elementName = this.RULE('string', () => this.CONSUME9(String))
  private identifierOption = this.RULE('identifier option', () =>
    this.CONSUME9(Identifier)
  )
  private relationOption = this.RULE('relation option', () =>
    this.CONSUME9(Relation)
  )

  private elementProperty = this.RULE('element property', () => {
    this.CONSUME(Property)
    this.CONSUME1(String)
  })

  private innerElement = this.RULE('inner element', () => {
    this.MANY1({
      DEF: () => {
        this.OR([
          {
            ALT: () => {
              this.CONSUME(Identifier)
              this.CONSUME(Assignment)
              this.SUBRULE3(this.modelElement)
            },
          },
          {
            ALT: () => {
              this.SUBRULE4(this.modelElement)
            },
          },
          {
            ALT: () => {
              this.CONSUME1(Identifier)
              this.CONSUME(Relation)
              this.OPTION(this.identifierOption)
            },
          },
          {
            ALT: () => {
              this.CONSUME1(Relation)
              this.CONSUME2(Identifier)
              this.OPTION1(this.relationOption)
            },
          },
          {
            ALT: () => {
              this.CONSUME(Property)
              this.CONSUME(Equals)
              this.CONSUME3(Identifier)
            },
          },
          {
            ALT: () => {
              this.CONSUME(Integer)
            },
          },
        ])
      },
    })
  })

  private relation = this.RULE('relation', () => {
    this.CONSUME1(Identifier)
    this.CONSUME(Relation)
    this.CONSUME2(Identifier)
    this.CONSUME(String)
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
