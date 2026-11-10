import { RuleTester } from "eslint";

export type ValidTests = Array<string | RuleTester.ValidTestCase>;
export type InvalidTests = RuleTester.InvalidTestCase[];
type TestErrors = {
  message: string;
}[];

export function createValidTest(code: string) {
  return {
    code,
  };
}
export function createInvalidTest(
  code: string,
  output: string,
  errors: TestErrors
) {
  return {
    code,
    // RuleTester (eslint v10) requires `null`, rather than a string equal
    // to `code`, to assert that a rule applies no fix
    output: output === code ? null : output,
    errors,
  };
}
