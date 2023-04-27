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

    expect(lexingResult.errors).toHaveLength(1)

    const tokens = lexingResult.tokens

    expect(tokens).toHaveLength(1)
  })

  it('Can lex an empty workspace', () => {
    const inputText = readDsl(Examples.SimpleWorkspace)
    const lexingResult = lex(inputText)

    expect(lexingResult.errors).toHaveLength(0)

    const tokens = lexingResult.tokens

    expect(tokens).toHaveLength(4)

    expect(tokens[0].image).toBe('workspace')
    expect(tokens[1].image).toBe('"Test Workspace"')
    expect(tokens[2].image).toBe('{')
    expect(tokens[3].image).toBe('}')

    expect(tokenMatcher(tokens[0], Workspace)).toBe(true)
    expect(tokenMatcher(tokens[1], String)).toBe(true)
    expect(tokenMatcher(tokens[2], CurlyBraceLeft)).toBe(true)
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
