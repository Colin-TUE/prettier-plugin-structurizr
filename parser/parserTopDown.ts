import { CstParser } from 'chevrotain'
import {
  All,
  AssignmentSign,
  AutoLayoutKeyword,
  ContainerKeyword,
  CurlyBraceLeft,
  CurlyBraceRight,
  DefinitionPropertyKeyword,
  EqualSign,
  ExternalInclude,
  Identifier,
  IncludeExcludeKeyword,
  IntegerValue,
  LayoutDirection,
  ModelDefinitionKeyword,
  ModelKeyword,
  PropertiesKeyword,
  Property,
  Relation,
  StringValue,
  ThemeKeyword,
  Url,
  ViewDefinitionKeyword,
  ViewsKeyword,
  WorkspaceKeyword,
  allTokens,
  lex,
} from './lexerTopDown'

class StructurizrParserTopDown extends CstParser {
  constructor() {
    super(allTokens)
    this.performSelfAnalysis()
  }

  public workspace = this.RULE('workspace', () => {
    this.CONSUME(WorkspaceKeyword)
    this.CONSUME(StringValue, { LABEL: 'workspace title' })
    this.CONSUME(CurlyBraceLeft)

    this.OPTION(() => {
      this.SUBRULE(this.modelSection)
      this.SUBRULE(this.viewSection)
    })

    this.CONSUME(CurlyBraceRight)
  })

  public modelSection = this.RULE('model section', () => {
    this.CONSUME(ModelKeyword)
    this.CONSUME1(CurlyBraceLeft)

    this.OPTION(this.externalInclude)

    this.MANY(() => {
      this.OR([
        {
          ALT: () => {
            this.CONSUME(Identifier)
            this.CONSUME(AssignmentSign)
            this.SUBRULE(this.modelDefinition)
          },
        },
        { ALT: () => this.SUBRULE1(this.modelDefinition) },
        { ALT: () => this.SUBRULE(this.relation) },
      ])
    })

    this.CONSUME1(CurlyBraceRight)
  })

  public externalInclude = this.RULE('external include', () => {
    this.CONSUME(ExternalInclude)
    this.CONSUME1(Identifier)
  })

  public modelDefinition = this.RULE('model definition', () => {
    this.OR8([
      { ALT: () => this.CONSUME(ModelDefinitionKeyword) },
      { ALT: () => this.CONSUME(ContainerKeyword) },
    ])
    this.CONSUME1(StringValue, { LABEL: 'model name' })

    this.OPTION(() => {
      this.CONSUME2(CurlyBraceLeft)

      this.MANY1(this.definitionProperty)

      this.MANY2(() => {
        this.OR([
          {
            ALT: () => {
              this.CONSUME2(Identifier)
              this.CONSUME(AssignmentSign)
              this.SUBRULE(this.modelDefinition)
            },
          },
          { ALT: () => this.SUBRULE1(this.modelDefinition) },
        ])
      })

      this.CONSUME2(CurlyBraceRight)
    })
  })

  public viewSection = this.RULE('view section', () => {
    this.CONSUME(ViewsKeyword)
    this.CONSUME3(CurlyBraceLeft)

    this.OPTION(this.viewProperties)
    this.MANY(() => {
      //this.OR([{ ALT: () =>
      this.SUBRULE(this.viewDefinition)
      // },
      // TODO: Determine if this needs to be here or can be combined with the previous one
      // { ALT: () => this.SUBRULE(this.viewDefinitionWithReference) },
      //])
    })

    this.OPTION1(this.theme)

    this.CONSUME3(CurlyBraceRight)
  })

  public viewProperties = this.RULE('view properties', () => {
    this.CONSUME(PropertiesKeyword)
    this.CONSUME4(CurlyBraceLeft)

    this.MANY3(() => {
      this.SUBRULE(this.property)
    })

    this.CONSUME4(CurlyBraceRight)
  })

  public viewDefinition = this.RULE('view definition', () => {
    this.OR9([
      { ALT: () => this.CONSUME(ViewDefinitionKeyword) },
      { ALT: () => this.CONSUME(ContainerKeyword) },
    ])
    this.OPTION(() => {
      this.CONSUME3(Identifier)
    })
    this.CONSUME2(StringValue, { LABEL: 'view name' })
    this.CONSUME5(CurlyBraceLeft)

    this.MANY4(this.definitionProperty)

    this.MANY5(() => this.SUBRULE(this.includeExclude))

    this.CONSUME(AutoLayoutKeyword)
    this.CONSUME(LayoutDirection)
    this.CONSUME(IntegerValue, { LABEL: 'rank separation' })
    this.CONSUME1(IntegerValue, { LABEL: 'node separation' })

    this.CONSUME5(CurlyBraceRight)
  })

  public includeExclude = this.RULE('include / exclude', () => {
    this.CONSUME(IncludeExcludeKeyword)
    this.OR([
      { ALT: () => this.CONSUME(All) },
      { ALT: () => this.SUBRULE(this.relation) },
      { ALT: () => this.SUBRULE(this.partialRelation) },
      { ALT: () => this.CONSUME4(Identifier) },
      { ALT: () => this.SUBRULE(this.filter) },
    ])
  })

  public filter = this.RULE('filter', () => {
    this.CONSUME(Property)
    this.CONSUME(EqualSign)
    this.CONSUME5(Identifier)
  })

  public theme = this.RULE('theme', () => {
    this.CONSUME(ThemeKeyword)
    this.CONSUME(Url)
  })

  public relation = this.RULE('relation', () => {
    this.CONSUME6(Identifier)
    this.CONSUME(Relation)
    this.CONSUME7(Identifier)
    this.OPTION(() => {
      this.CONSUME(StringValue)
    })
  })

  public partialRelation = this.RULE('partial relation', () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME8(Identifier)
          this.CONSUME1(Relation)
        },
      },
      {
        ALT: () => {
          this.CONSUME2(Relation)
          this.CONSUME9(Identifier)
          this.OPTION(() => {
            this.CONSUME3(Relation)
          })
        },
      },
    ])
  })

  public definitionProperty = this.RULE('definition property', () => {
    this.CONSUME(DefinitionPropertyKeyword)
    this.CONSUME3(StringValue)
  })

  public property = this.RULE('property', () => {
    this.CONSUME(Property)
    this.CONSUME4(StringValue)
  })
}

const parser = new StructurizrParserTopDown()

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
