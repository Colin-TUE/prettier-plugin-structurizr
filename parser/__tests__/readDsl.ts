'use strict'
import * as fs from 'fs'

export function readDsl(example: Examples): string {
  const enumName = Examples[example]
  const content = fs.readFileSync(
    // Note that Structurizr Lite expects the file to be called workspace with all lower case letters, hence the `toLowerCase`
    `./structurizr_examples/${enumName.toLowerCase()}.dsl`,
    'utf8'
  )
  return content
}
/**
 * Enum depicting the different examples that are present for parsing
 */
export enum Examples {
  Invalid,
  EmptyWorkspace,
  Workspace,
}
