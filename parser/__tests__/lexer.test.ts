'use strict'

import { expect } from '@jest/globals'
import { tokenMatcher } from 'chevrotain'
import {
  Workspace,
  String,
  CurlyBraceLeft,
  CurlyBraceRight,
  lex,
} from '../lexer'

describe('Lexer', () => {
  it('Can Lex a simple input', () => {
    const inputText = 'workspace "Test Workspace" {}'
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
})
