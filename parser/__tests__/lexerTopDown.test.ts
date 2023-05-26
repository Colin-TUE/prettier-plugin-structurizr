'use strict'

import { expect } from '@jest/globals'
import { IToken, TokenType, tokenMatcher } from 'chevrotain'
import {
  CurlyBraceLeft,
  CurlyBraceRight,
  lex,
  Identifier,
  WorkspaceKeyword,
  ModelKeyword,
  ExternalInclude,
  ModelDefinitionKeyword,
  Relation,
  DefinitionPropertyKeyword,
  AssignmentSign,
  ViewsKeyword,
  PropertiesKeyword,
  ViewDefinitionKeyword,
  IntegerValue,
  StringValue,
  ThemeKeyword,
  LayoutDirection,
  AutoLayoutKeyword,
  EqualSign,
  IncludeExcludeKeyword,
  All,
  Property,
  Url,
  ContainerKeyword,
} from '../lexerTopDown'
import { readDsl, Examples } from './readDsl'

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

    expect(lexingResult.errors).toHaveLength(1)

    expect(lexingResult.errors[0].message).toContain(
      'unexpected character: ->,<- at offset:'
    )

    const tokens = lexingResult.tokens

    expect(tokens).toHaveLength(7)

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
    expect(tokenMatcher(tokens[5], WorkspaceKeyword)).toBe(true)
    expect(tokens[6].image).toBe('muahahaha')
    expect(tokenMatcher(tokens[6], Identifier)).toBe(true)
  })

  it('Can lex an empty workspace', () => {
    const inputText = readDsl(Examples.EmptyWorkspace)
    const lexingResult = lex(inputText)

    expect(lexingResult.errors).toHaveLength(0)

    const tokens = lexingResult.tokens

    expect(tokens).toHaveLength(4)

    expect(tokens[0].image).toBe('workspace')
    expect(tokenMatcher(tokens[0], WorkspaceKeyword)).toBe(true)
    expect(tokens[1].image).toBe('"Test Workspace"')
    expect(tokenMatcher(tokens[1], StringValue)).toBe(true)
    expect(tokens[2].image).toBe('{')
    expect(tokenMatcher(tokens[2], CurlyBraceLeft)).toBe(true)
    expect(tokens[3].image).toBe('}')
    expect(tokenMatcher(tokens[3], CurlyBraceRight)).toBe(true)
  })

  it('Can lex a simple workspace', () => {
    const inputText = readDsl(Examples.Workspace)
    const lexingResult = lex(inputText)

    expect(lexingResult.errors).toHaveLength(0)

    const tokens = lexingResult.tokens

    expect(tokens).toHaveLength(190)

    VerifyAmountOfTokenType(tokens, WorkspaceKeyword, 1)
    VerifyAmountOfTokenType(tokens, ModelKeyword, 1)
    VerifyAmountOfTokenType(tokens, ExternalInclude, 1)
    // VerifyAmountOfTokenType(tokens, Path, 1)
    VerifyAmountOfTokenType(tokens, ModelDefinitionKeyword, 6)
    VerifyAmountOfTokenType(tokens, Relation, 20)
    VerifyAmountOfTokenType(tokens, AssignmentSign, 9)

    VerifyAmountOfTokenType(tokens, ViewsKeyword, 1)
    VerifyAmountOfTokenType(tokens, PropertiesKeyword, 1)
    VerifyAmountOfTokenType(tokens, ViewDefinitionKeyword, 2)
    VerifyAmountOfTokenType(tokens, DefinitionPropertyKeyword, 9)
    VerifyAmountOfTokenType(tokens, IncludeExcludeKeyword, 10)
    VerifyAmountOfTokenType(tokens, All, 2)
    VerifyAmountOfTokenType(tokens, Property, 2)
    VerifyAmountOfTokenType(tokens, EqualSign, 1)
    VerifyAmountOfTokenType(tokens, AutoLayoutKeyword, 3)
    VerifyAmountOfTokenType(tokens, LayoutDirection, 3)
    VerifyAmountOfTokenType(tokens, ThemeKeyword, 1)
    VerifyAmountOfTokenType(tokens, Url, 1)

    VerifyAmountOfTokenType(tokens, Identifier, 47)
    VerifyAmountOfTokenType(tokens, StringValue, 35)
    VerifyAmountOfTokenType(tokens, IntegerValue, 6)
    VerifyAmountOfTokenType(tokens, CurlyBraceLeft, 12)
    VerifyAmountOfTokenType(tokens, CurlyBraceRight, 12)
    VerifyAmountOfTokenType(tokens, DefinitionPropertyKeyword, 9)
    VerifyAmountOfTokenType(tokens, ContainerKeyword, 4)
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
