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

    expect(tokens).toHaveLength(154)

    expect(tokens.filter(token => tokenMatcher(token, Workspace))).toHaveLength(1)
    expect(tokens.filter(token => tokenMatcher(token, Model))).toHaveLength(1)
    expect(
      tokens.filter(token => tokenMatcher(token, ExternalInclude))
    ).toHaveLength(1)
    // expect(tokens.filter((token) => tokenMatcher(token, Path))).toHaveLength(1)
    expect(tokens.filter(token => tokenMatcher(token, Person))).toHaveLength(5)
    expect(
      tokens.filter(token => tokenMatcher(token, SoftwareSystem))
    ).toHaveLength(1)
    expect(tokens.filter(token => tokenMatcher(token, Relation))).toHaveLength(
      12
    )
    expect(
      tokens.filter(token => tokenMatcher(token, Assignment))
    ).toHaveLength(7)

    expect(tokens.filter(token => tokenMatcher(token, Views))).toHaveLength(1)
    expect(
      tokens.filter(token => tokenMatcher(token, Properties))
    ).toHaveLength(1)
    expect(
      tokens.filter(token => tokenMatcher(token, SystemLandscapeView))
    ).toHaveLength(1)
    expect(
      tokens.filter(token => tokenMatcher(token, SystemContextView))
    ).toHaveLength(1)
    expect(
      tokens.filter(token => tokenMatcher(token, ContainerView))
    ).toHaveLength(2) // Currently it has both the view and hte model element
    expect(tokens.filter(token => tokenMatcher(token, Include))).toHaveLength(4)
    expect(tokens.filter(token => tokenMatcher(token, All))).toHaveLength(1)
    expect(tokens.filter(token => tokenMatcher(token, Exclude))).toHaveLength(2)
    expect(
      tokens.filter(token => tokenMatcher(token, RelationWord))
    ).toHaveLength(1)
    expect(
      tokens.filter(token => tokenMatcher(token, PropertyToken))
    ).toHaveLength(1)
    expect(
      tokens.filter(token => tokenMatcher(token, SourceProperty))
    ).toHaveLength(1)
    expect(tokens.filter(token => tokenMatcher(token, Equals))).toHaveLength(1)
    expect(
      tokens.filter(token => tokenMatcher(token, AutoLayout))
    ).toHaveLength(3)
    expect(
      tokens.filter(token => tokenMatcher(token, LayoutTopToBottom))
    ).toHaveLength(1)
    expect(
      tokens.filter(token => tokenMatcher(token, LayoutLeftToRight))
    ).toHaveLength(0)
    expect(
      tokens.filter(token => tokenMatcher(token, LayoutRightToLeft))
    ).toHaveLength(1)
    expect(
      tokens.filter(token => tokenMatcher(token, LayoutBottomToTop))
    ).toHaveLength(1)
    expect(tokens.filter(token => tokenMatcher(token, Theme))).toHaveLength(1)
    expect(tokens.filter(token => tokenMatcher(token, URL))).toHaveLength(1)

    expect(
      tokens.filter(token => tokenMatcher(token, Identifier))
    ).toHaveLength(39)
    expect(tokens.filter(token => tokenMatcher(token, String))).toHaveLength(28)
    expect(tokens.filter(token => tokenMatcher(token, Integer))).toHaveLength(6)
    expect(tokens.filter(token => tokenMatcher(token, Comma))).toHaveLength(0)
    expect(
      tokens.filter(token => tokenMatcher(token, CurlyBraceLeft))
    ).toHaveLength(13)
    expect(
      tokens.filter(token => tokenMatcher(token, CurlyBraceRight))
    ).toHaveLength(13)
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
