'use strict'

import { expect } from '@jest/globals'
import { IToken, TokenType, tokenMatcher } from 'chevrotain'
import {
  String,
  CurlyBraceLeft,
  CurlyBraceRight,
  lex,
  Identifier,
  Comma,
  Integer,
  Assignment,
  All,
  Equals,
  Property,
  URL,
  Keyword,
} from '../simplifiedLexer'
import { Examples, readDsl } from './readDsl'

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
    expect(tokenMatcher(tokens[5], Keyword)).toBe(true)
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
    expect(tokenMatcher(tokens[0], Keyword)).toBe(true)
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

    expect(tokens).toHaveLength(191)

    VerifyAmountOfTokenType(tokens, Keyword, 43)
    // VerifyAmountOfTokenType(tokens, Path, 1)
    VerifyAmountOfTokenType(tokens, Property, 1)
    VerifyAmountOfTokenType(tokens, Assignment, 9)
    VerifyAmountOfTokenType(tokens, All, 2)
    VerifyAmountOfTokenType(tokens, Equals, 1)
    VerifyAmountOfTokenType(tokens, URL, 1)
    VerifyAmountOfTokenType(tokens, Identifier, 47)
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
