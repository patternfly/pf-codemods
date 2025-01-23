import { TestErrors } from "./testingTypes";

/**
 * Use inline in a test file to push a test object to an invalid test array.
 * @param code The invalid code snippet that should trigger an error.
 * @param output The code snippet that should be output upon the fixer being ran. If no fixer exists, this shoujld be the same as the code parameter.
 * @param errors An array of error objects, each consisting of the error message and the node type that should trigger the error.
 * @returns An invalid test object.
 */
export function createInvalidTest(
  code: string,
  output: string,
  errors: TestErrors
) {
  return {
    code,
    output,
    errors,
  };
}
