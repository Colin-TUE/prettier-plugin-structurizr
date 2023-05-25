'use strict';
import * as fs from 'fs';

export function readDsl(example: Examples): string {
  const enumName = Examples[example];
  const content = fs.readFileSync(
    `./structurizr_examples/${enumName}.dsl`,
    'utf8'
  );
  return content;
}
/**
 * Enum depicting the different examples that are present for parsing
 */
export enum Examples {
  Invalid,
  EmptyWorkspace,
  workspace
}
