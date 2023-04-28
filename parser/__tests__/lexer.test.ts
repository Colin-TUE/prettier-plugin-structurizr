'use strict'

import { expect } from '@jest/globals'
import * as fs from 'fs'
import { tokenMatcher } from 'chevrotain'
import {
  Workspace,
  String,
  CurlyBraceLeft,
  CurlyBraceRight,
  lex,
  Identifier,
  Comma,
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
    const inputText = readDsl(Examples.SimpleWorkspace)
    const lexingResult = lex(inputText)

    expect(lexingResult.errors).toHaveLength(0)

    const tokens = lexingResult.tokens

    expect(tokens).toHaveLength(1)
  })
})

function readDsl(example: Examples): string {
  const enumName = Examples[example]
  const content = fs.readFileSync(
    `./parser/__tests__/examples/${enumName}.dsl`,
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
  SimpleWorkspace,
}
