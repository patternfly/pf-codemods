import { RuleTester } from "eslint";

export type ValidTests = Array<string | RuleTester.ValidTestCase>;
export type InvalidTests = RuleTester.InvalidTestCase[];
type TestErrors = {
  message: string;
  type: string;
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
    output,
    errors,
  };
}
