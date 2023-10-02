import { readFile } from "fs";
import { join } from "path";
import { promisify } from "util";

import { alterProgram } from "../src/debugger/weaver";

/* Utility variables */
const exampleMap = new Map();

/* Utility functions */
const readFileAsync = promisify(readFile);

const readExample = async filename => {
  if (exampleMap.has(filename)) {
    return exampleMap.get(filename);
  }

  const example = await readFileAsync(
    join(__dirname, "../static/examples/", filename),
    {
      encoding: "utf8"
    }
  );

  exampleMap.set(filename, example);

  return example;
};

/* eslint-disable no-new-func */
describe("weaver", () => {
  test('alters "Bad.js"', async () => {
    const userInput = await readExample("Bad.js");

    await alterProgram(userInput, { debug: false });
  });

  test('alters "Basic.js"', async () => {
    const userInput = await readExample("Basic.js");

    await alterProgram(userInput, { debug: false });
  });

  test('throws error for "DuplicateDeclaration.js"', async () => {
    const userInput = await readExample("DuplicateDeclaration.js");

    await expect(alterProgram(userInput, { debug: false })).rejects.toThrow();
  });

  test('alters "ElseCondition.js"', async () => {
    const userInput = await readExample("ElseCondition.js");

    await alterProgram(userInput, { debug: false });
  });

  test('alters "ForMultiplication.js"', async () => {
    const userInput = await readExample("ForMultiplication.js");

    await alterProgram(userInput, { debug: false });
  });

  test('alters "Functions.js"', async () => {
    const userInput = await readExample("Functions.js");

    await alterProgram(userInput, { debug: false });
  });

  test('alters "Hello_World.js"', async () => {
    const userInput = await readExample("Hello_World.js");

    await alterProgram(userInput, { debug: false });
  });

  test('alters "SwitchNoCascade.js"', async () => {
    const userInput = await readExample("SwitchNoCascade.js");

    await alterProgram(userInput, { debug: false });
  });

  test('alters "WhileAddition.js"', async () => {
    const userInput = await readExample("WhileAddition.js");

    await alterProgram(userInput, { debug: false });
  });
});
