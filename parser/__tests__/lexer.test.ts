'use strict'

import { expect } from '@jest/globals'
import { tokenMatcher } from 'chevrotain'
import { lex, tokenVocabulary } from '../lexer'

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

    expect(tokenMatcher(tokens[0], tokenVocabulary.Workspace)).toBe(true)
    expect(tokenMatcher(tokens[1], tokenVocabulary.String)).toBe(true)
    expect(tokenMatcher(tokens[2], tokenVocabulary.CurlyBraceLEft)).toBe(true)
    expect(tokenMatcher(tokens[3], tokenVocabulary.CurlyBraceRight)).toBe(true)
  })
})
