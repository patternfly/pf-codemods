/**
 * Use inline in a test file to push a test object to a valid test array.
 * @param code The valid code snippet.
 * @returns A valid test object.
 */
export function createValidTest(code: string) {
  return {
    code,
  };
}
