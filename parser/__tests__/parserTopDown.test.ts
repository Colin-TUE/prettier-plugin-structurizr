'use strict'

import { expect } from '@jest/globals'
import { parseInput } from '../parserTopDown'
import { Examples, readDsl } from './readDsl'

describe('Parser', () => {
  it('Can parse an empty file', () => {
    const inputText = ''
    const parseResult = parseInput(inputText)

    expect(parseResult.errors).toHaveLength(1)

    const cst = parseResult.cst

    expect(cst).toBeUndefined()
  })

  it('Cannot parse an invalid input', () => {
    const inputText = readDsl(Examples.Invalid)
    const parseResult = parseInput(inputText)

    expect(parseResult.errors).toHaveLength(1)

    const cst = parseResult.cst

    expect(cst).toBeUndefined()
  })

  it('Can parse an empty workspace', () => {
    const inputText = readDsl(Examples.EmptyWorkspace)
    const parseResult = parseInput(inputText)

    expect(parseResult.errors).toHaveLength(0)

    const cst = parseResult.cst

    // expect(cst).toEqual({ 'children': {}, name: 'workspace' })
  })

  it('Can parse a simple workspace', () => {
    const inputText = readDsl(Examples.Workspace)
    const parseResult = parseInput(inputText)

    expect(parseResult.errors).toHaveLength(0)

    const cst = parseResult.cst

    // expect(cst).toEqual({ 'children': {}, name: 'workspace' })
  })
})
