'use strict'

import { expect } from '@jest/globals'
import * as fs from 'fs'
import { IToken, TokenType, tokenMatcher } from 'chevrotain'
import {
  Workspace,
  String,
  CurlyBraceLeft,
  CurlyBraceRight,
  lex,
  Identifier,
  Comma,
  Model,
  ExternalInclude,
  SoftwareSystem,
  Person,
  Relation,
  Title,
  Description,
  Views,
  SystemContextView,
  Include,
  Exclude,
  Theme,
  LayoutTopToBottom,
  LayoutLeftToRight,
  LayoutBottomToTop,
  AutoLayout,
  ContainerView,
  SystemLandscapeView,
  Properties,
  Integer,
  Assignment,
  All,
  Equals,
  RelationWord,
  SourceProperty,
  Property as PropertyToken,
  LayoutRightToLeft,
  URL,
  Technology,
} from '../lexer'

describe('Lexer', () => {
  it('Can lex an empty file', () => {
    const inputText = ''
    const lexingResult = lex(inputText)

    expect(lexingResult.errors).toHaveLength(0)

    const tokens = lexingResult.tokens

    expect(tokens).toHaveLength(0)
  })

  it('Can lex an invalid input', () => {
    const inputText = readDsl(Examples.Invalid)
    const lexingResult = lex(inputText)

    expect(lexingResult.errors).toHaveLength(0)

    const tokens = lexingResult.tokens

    expect(tokens).toHaveLength(8)

    expect(tokens[0].image).toBe('This')
    expect(tokenMatcher(tokens[0], Identifier)).toBe(true)
    expect(tokens[1].image).toBe('is')
    expect(tokenMatcher(tokens[1], Identifier)).toBe(true)
    expect(tokens[2].image).toBe('not')
    expect(tokenMatcher(tokens[2], Identifier)).toBe(true)
    expect(tokens[3].image).toBe('a')
    expect(tokenMatcher(tokens[3], Identifier)).toBe(true)
    expect(tokens[4].image).toBe('valid')
    expect(tokenMatcher(tokens[4], Identifier)).toBe(true)
    expect(tokens[5].image).toBe('workspace')
    expect(tokenMatcher(tokens[5], Workspace)).toBe(true)
    expect(tokens[6].image).toBe(',')
    expect(tokenMatcher(tokens[6], Comma)).toBe(true)
    expect(tokens[7].image).toBe('muahahaha')
    expect(tokenMatcher(tokens[7], Identifier)).toBe(true)
  })

  it('Can lex an empty workspace', () => {
    const inputText = readDsl(Examples.EmptyWorkspace)
    const lexingResult = lex(inputText)

    expect(lexingResult.errors).toHaveLength(0)

    const tokens = lexingResult.tokens

    expect(tokens).toHaveLength(4)

    expect(tokens[0].image).toBe('workspace')
    expect(tokenMatcher(tokens[0], Workspace)).toBe(true)
    expect(tokens[1].image).toBe('"Test Workspace"')
    expect(tokenMatcher(tokens[1], String)).toBe(true)
    expect(tokens[2].image).toBe('{')
    expect(tokenMatcher(tokens[2], CurlyBraceLeft)).toBe(true)
    expect(tokens[3].image).toBe('}')
    expect(tokenMatcher(tokens[3], CurlyBraceRight)).toBe(true)
  })

  it('Can lex a simple workspace', () => {
    const inputText = readDsl(Examples.workspace)
    const lexingResult = lex(inputText)

    expect(lexingResult.errors).toHaveLength(0)

    const tokens = lexingResult.tokens

    expect(tokens).toHaveLength(194)

    VerifyAmountOfTokenType(tokens, Workspace, 1)
    VerifyAmountOfTokenType(tokens, Model, 1)
    VerifyAmountOfTokenType(tokens, ExternalInclude, 1)
    // VerifyAmountOfTokenType(tokens, Path, 1)
    VerifyAmountOfTokenType(tokens, Person, 5)
    VerifyAmountOfTokenType(tokens, SoftwareSystem, 1)
    VerifyAmountOfTokenType(tokens, Relation, 20)
    VerifyAmountOfTokenType(tokens, Description, 6)
    VerifyAmountOfTokenType(tokens, Technology, 0)
    VerifyAmountOfTokenType(tokens, Assignment, 9)

    VerifyAmountOfTokenType(tokens, Views, 1)
    VerifyAmountOfTokenType(tokens, Properties, 1)
    VerifyAmountOfTokenType(tokens, SystemLandscapeView, 1)
    VerifyAmountOfTokenType(tokens, SystemContextView, 1)
    VerifyAmountOfTokenType(tokens, ContainerView, 4) // Currently it has both the view and the model element
    VerifyAmountOfTokenType(tokens, Title, 3)
    VerifyAmountOfTokenType(tokens, Include, 5)
    VerifyAmountOfTokenType(tokens, All, 2)
    VerifyAmountOfTokenType(tokens, Exclude, 5)
    VerifyAmountOfTokenType(tokens, RelationWord, 1)
    VerifyAmountOfTokenType(tokens, PropertyToken, 1)
    VerifyAmountOfTokenType(tokens, SourceProperty, 1)
    VerifyAmountOfTokenType(tokens, Equals, 1)
    VerifyAmountOfTokenType(tokens, AutoLayout, 3)
    VerifyAmountOfTokenType(tokens, LayoutTopToBottom, 1)
    VerifyAmountOfTokenType(tokens, LayoutBottomToTop, 1)
    VerifyAmountOfTokenType(tokens, LayoutLeftToRight, 0)
    VerifyAmountOfTokenType(tokens, LayoutRightToLeft, 1)
    VerifyAmountOfTokenType(tokens, Theme, 1)
    VerifyAmountOfTokenType(tokens, URL, 1)

    VerifyAmountOfTokenType(tokens, Identifier, 48)
    VerifyAmountOfTokenType(tokens, String, 35)
    VerifyAmountOfTokenType(tokens, Integer, 6)
    VerifyAmountOfTokenType(tokens, Comma, 0)
    VerifyAmountOfTokenType(tokens, CurlyBraceLeft, 12)
    VerifyAmountOfTokenType(tokens, CurlyBraceRight, 12)
  })
})

function VerifyAmountOfTokenType(
  tokens: IToken[],
  tokenType: TokenType,
  expectedAmount: number
) {
  expect(tokens.filter(token => tokenMatcher(token, tokenType))).toHaveLength(
    expectedAmount
  )
}

function readDsl(example: Examples): string {
  const enumName = Examples[example]
  const content = fs.readFileSync(
    `./structurizr_examples/${enumName}.dsl`,
    'utf8'
  )
  return content
}

/**
 * Enum depicting the different examples that are present for parsing
 */
enum Examples {
  Invalid,
  EmptyWorkspace,
  workspace,
}
