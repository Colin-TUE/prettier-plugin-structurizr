"use strict";

import { expect } from "@jest/globals";
import { tokenMatcher } from "chevrotain";
import { lex, tokenVocabulary } from "../lexer";

describe("Lexer", () => {
  it("Can Lex a simple input", () => {
    let inputText = 'workspace "Test Workspace" {}';
    let lexingResult = lex(inputText);

    expect(lexingResult.errors).to.be.empty;

    let tokens = lexingResult.tokens;

    expect(tokens).to.have.lengthOf(4);

    expect(tokens[0].image).to.equal("workspace");
    expect(tokens[1].image).to.equal('"Test Workspace"');
    expect(tokens[2].image).to.equal("{");
    expect(tokens[3].image).to.equal("}");

    expect(tokenMatcher(tokens[0], tokenVocabulary.Workspace)).to.be.true;
    expect(tokenMatcher(tokens[1], tokenVocabulary.String)).to.be.true;
    expect(tokenMatcher(tokens[2], tokenVocabulary.CurlyBraceLEft)).to.be.true;
    expect(tokenMatcher(tokens[3], tokenVocabulary.CurlyBraceRight)).to.be.true;
  });
});
